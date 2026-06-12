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
  MEMORY_BANK_DIR: path.join(UNISKILL_DIR, 'memory_bank'), // 新增：全局同传记忆池
  
  CLAUDE_CONFIG: path.join(HOME, '.claude', 'settings.json'),
  CLAUDE_MEMORY_DIR: path.join(HOME, '.claude', 'memory'),     // Claude的记忆大本营
  
  OPENCLAW_CONFIG: path.join(HOME, '.openclaw', 'openclaw.json'),
  OPENCLAW_SKILLS_DIR: path.join(HOME, '.openclaw', 'skills'),
  OPENCLAW_MEMORY_DIR: path.join(HOME, '.openclaw', 'memory')  // OpenClaw的记忆雷达区
};
