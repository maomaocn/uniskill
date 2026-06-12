const fs = require('fs');
const env = require('../core/env');

module.exports = function initCmd() {
  console.log('\n🌟 Initializing Uniskill Universal Environment...');
  
  const dirs = [env.UNISKILL_DIR, env.PROMPTS_DIR, env.MCP_DIR, env.BINDINGS_DIR, env.MEMORY_BANK_DIR];
  let created = 0;

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      created++;
      console.log(`  ✓ Created: ${dir}`);
    } else {
      console.log(`  - Exists: ${dir}`);
    }
  });

  if (created > 0) {
    console.log(`\n✅ Uniskill core systems (including Memory Bank) initialized successfully!`);
  } else {
    console.log(`\n✅ Uniskill is already properly initialized.`);
  }
};
