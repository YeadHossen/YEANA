export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'online',
    platform: 'YEANA Bangladesh Travel & Tourism API',
    ai_engine: 'YEANA AI v2.0 (ChatGPT/Claude/Gemini grade)',
    timestamp: new Date().toISOString()
  });
}
