import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_DISTRICTS } from '../src/data/seedData';
import { BANGLADESH_UPAZILAS } from '../src/data/upazilaData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');

if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// 1. DIVISIONS MAPPING
const DIVISIONS = [
  { id: 1, name: 'Dhaka', name_bn: 'ঢাকা', code: 'DHK', lat: 23.8103, lng: 90.4125 },
  { id: 2, name: 'Chattogram', name_bn: 'চট্টগ্রাম', code: 'CTG', lat: 22.3569, lng: 91.7832 },
  { id: 3, name: 'Sylhet', name_bn: 'সিলেট', code: 'SYL', lat: 24.8949, lng: 91.8687 },
  { id: 4, name: 'Rajshahi', name_bn: 'রাজশাহী', code: 'RAJ', lat: 24.3745, lng: 88.6042 },
  { id: 5, name: 'Khulna', name_bn: 'খুলনা', code: 'KHU', lat: 22.8456, lng: 89.5403 },
  { id: 6, name: 'Barishal', name_bn: 'বরিশাল', code: 'BAR', lat: 22.7010, lng: 90.3535 },
  { id: 7, name: 'Rangpur', name_bn: 'রংপুর', code: 'RAN', lat: 25.7439, lng: 89.2752 },
  { id: 8, name: 'Mymensingh', name_bn: 'ময়মনসিংহ', code: 'MYM', lat: 24.7471, lng: 90.4203 }
];

const divisionIdMap = new Map(DIVISIONS.map(d => [d.name, d.id]));

function escapeSql(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// ========================================================================
// GENERATE MIGRATION 04: SEED LOCATION HIERARCHY
// ========================================================================
let locSql = `-- ========================================================================
-- YEANA — Bangladesh Tour & Travel Platform
-- Migration: 20261007000004_seed_location_hierarchy.sql
-- Description: Complete 8 Divisions, 64 Districts, and 495+ Upazilas of Bangladesh
-- ========================================================================

-- 1. SEED 8 DIVISIONS
INSERT INTO public.divisions (id, name, name_bn, code, lat, lng) VALUES
`;

locSql += DIVISIONS.map(d => 
  `  (${d.id}, ${escapeSql(d.name)}, ${escapeSql(d.name_bn)}, ${escapeSql(d.code)}, ${d.lat}, ${d.lng})`
).join(',\n');

locSql += `
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  code = EXCLUDED.code,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng;

SELECT setval('public.divisions_id_seq', (SELECT MAX(id) FROM public.divisions));

-- 2. SEED 64 DISTRICTS
INSERT INTO public.districts (id, division_id, slug, name, name_bn, description, image_url, lat, lng, popular_season) VALUES
`;

const districtInserts = INITIAL_DISTRICTS.map((d, index) => {
  const divId = divisionIdMap.get(d.division) || 1;
  const distId = index + 1;
  return `  (${distId}, ${divId}, ${escapeSql(d.id)}, ${escapeSql(d.name)}, ${escapeSql(d.name_bn)}, ${escapeSql(d.description)}, ${escapeSql(d.image_url)}, ${d.lat || 'NULL'}, ${d.lng || 'NULL'}, ${escapeSql(d.popular_season || null)})`;
});

locSql += districtInserts.join(',\n');
locSql += `
ON CONFLICT (id) DO UPDATE SET
  division_id = EXCLUDED.division_id,
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  popular_season = EXCLUDED.popular_season;

SELECT setval('public.districts_id_seq', (SELECT MAX(id) FROM public.districts));

-- 3. SEED ALL ~495 UPAZILAS
INSERT INTO public.upazilas (id, district_id, slug, name, name_bn, lat, lng, popular_tag, has_railway, has_launch_ghat, transit_hub_type) VALUES
`;

// Build district slug to district ID mapping
const districtSlugToId = new Map(INITIAL_DISTRICTS.map((d, index) => [d.id, index + 1]));

const upazilaInserts = BANGLADESH_UPAZILAS.map((u, index) => {
  const upId = index + 1;
  const distId = districtSlugToId.get(u.districtId) || 1;
  const hasRail = u.hasRailway ? 'true' : 'false';
  const hasLaunch = u.hasLaunchGhat ? 'true' : 'false';
  return `  (${upId}, ${distId}, ${escapeSql(u.id)}, ${escapeSql(u.name)}, ${escapeSql(u.name_bn)}, ${u.lat || 'NULL'}, ${u.lng || 'NULL'}, ${escapeSql(u.popular_tag || null)}, ${hasRail}, ${hasLaunch}, ${escapeSql(u.transitHubType || null)})`;
});

locSql += upazilaInserts.join(',\n');
locSql += `
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  popular_tag = EXCLUDED.popular_tag,
  has_railway = EXCLUDED.has_railway,
  has_launch_ghat = EXCLUDED.has_launch_ghat,
  transit_hub_type = EXCLUDED.transit_hub_type;

SELECT setval('public.upazilas_id_seq', (SELECT MAX(id) FROM public.upazilas));
`;

fs.writeFileSync(path.join(migrationsDir, '20261007000004_seed_location_hierarchy.sql'), locSql, 'utf-8');
console.log('Generated 20261007000004_seed_location_hierarchy.sql');
