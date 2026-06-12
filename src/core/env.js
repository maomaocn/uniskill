const path = require('path');
const os = require('os');

const HOME = os.homedir();
const UNISKILL_DIR = path.join(HOME, '.shared-ai-skills');

module.exports = {
  HOME,
  UNISKILL_DIR,
  PROMPTS_DIR: path.join(UNISKILL_DIR, 'prompts'),
  MCP_DIR: path.join(UNISKILL_DIR, 'mcp-servers'),
  BINDINGS_DIR: path.join(UNISKILL_DIR, 'native-bindings'),
  
  CLAUDE_CONFIG: path.join(HOME, '.claude', 'settings.json'),
  OPENCLAW_CONFIG: path.join(HOME, '.openclaw', 'openclaw.json'),
  OPENCLAW_SKILLS_DIR: path.join(HOME, '.openclaw', 'skills'),
  
  // Cross-system cursor config resolution logic could be expanded here
  CURSOR_MAC_CONFIG: path.join(HOME, 'Library', 'Application Support', 'Cursor', 'User', 'settings.json')
};
