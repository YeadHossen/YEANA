#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data', 'yeana.db');

if (!fs.existsSync(dbPath)) {
  console.error(`Database not found at: ${dbPath}`);
  process.exit(1);
}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

const server = new Server(
  {
    name: 'yeana-database-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define MCP Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_tables',
        description: 'List all database tables in the YEANA Bangladesh travel platform SQLite database.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'describe_table',
        description: 'Get schema and column info for a specific table in the YEANA database.',
        inputSchema: {
          type: 'object',
          properties: {
            table_name: {
              type: 'string',
              description: 'Name of the table (e.g. places, districts, hotels, restaurants, trips, reviews)',
            },
          },
          required: ['table_name'],
        },
      },
      {
        name: 'query_database',
        description: 'Run a read-only SQL query (SELECT) on the YEANA SQLite database.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The SQL SELECT statement to execute',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'execute_sql',
        description: 'Run an INSERT, UPDATE, or DELETE SQL statement on the YEANA SQLite database.',
        inputSchema: {
          type: 'object',
          properties: {
            sql: {
              type: 'string',
              description: 'The SQL modification query to execute',
            },
          },
          required: ['sql'],
        },
      },
      {
        name: 'get_destinations',
        description: 'Query tourist attractions across Bangladesh filtered by division, district, or category.',
        inputSchema: {
          type: 'object',
          properties: {
            district_id: { type: 'string', description: 'District ID (e.g. sylhet, coxs-bazar, rangamati, dhaka)' },
            category: { type: 'string', description: 'Category (Nature, Hill, Beach, Heritage, Forest, Waterfall)' },
            limit: { type: 'number', description: 'Maximum number of places to return (default 10)' }
          },
        },
      },
      {
        name: 'get_travel_stats',
        description: 'Get total counts of districts, places, hotels, restaurants, transports, trips, and reviews in the database.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      }
    ],
  };
});

// Handle MCP Tool Invocations
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'list_tables') {
      const tables = db
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
        .all();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(tables.map((t) => t.name), null, 2),
          },
        ],
      };
    }

    if (name === 'describe_table') {
      const { table_name } = args;
      const columns = db.prepare(`PRAGMA table_info(${table_name})`).all();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(columns, null, 2),
          },
        ],
      };
    }

    if (name === 'query_database') {
      const { query } = args;
      const trimmed = query.trim().toLowerCase();
      if (!trimmed.startsWith('select') && !trimmed.startsWith('pragma') && !trimmed.startsWith('explain')) {
        return {
          content: [
            {
              type: 'text',
              text: 'Error: query_database is read-only. For mutations, use execute_sql tool.',
            },
          ],
          isError: true,
        };
      }
      const results = db.prepare(query).all();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    if (name === 'execute_sql') {
      const { sql } = args;
      const info = db.prepare(sql).run();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                changes: info.changes,
                lastInsertRowid: String(info.lastInsertRowid),
                success: true,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    if (name === 'get_destinations') {
      const { district_id, category, limit = 10 } = args || {};
      let sql = 'SELECT * FROM places WHERE 1=1';
      const params = [];
      if (district_id) {
        sql += ' AND district_id = ?';
        params.push(district_id);
      }
      if (category) {
        sql += ' AND category = ?';
        params.push(category);
      }
      sql += ' ORDER BY rating DESC LIMIT ?';
      params.push(limit);

      const places = db.prepare(sql).all(...params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(places, null, 2),
          },
        ],
      };
    }

    if (name === 'get_travel_stats') {
      const stats = {
        districts: db.prepare('SELECT COUNT(*) as c FROM districts').get().c,
        places: db.prepare('SELECT COUNT(*) as c FROM places').get().c,
        hotels: db.prepare('SELECT COUNT(*) as c FROM hotels').get().c,
        restaurants: db.prepare('SELECT COUNT(*) as c FROM restaurants').get().c,
        transports: db.prepare('SELECT COUNT(*) as c FROM transport_routes').get().c,
        trips: db.prepare('SELECT COUNT(*) as c FROM trips').get().c,
        reviews: db.prepare('SELECT COUNT(*) as c FROM reviews').get().c,
      };
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(stats, null, 2),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error executing ${name}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('YEANA Database MCP Server connected over stdio');
}

main().catch((err) => {
  console.error('Fatal MCP Server Error:', err);
  process.exit(1);
});
