const fs = require('fs');
const env = require('../core/env');

module.exports = function initCmd() {
  console.log('\n🌟 Initializing Uniskill Universal Environment...');
  
  const dirs = [env.UNISKILL_DIR, env.PROMPTS_DIR, env.MCP_DIR, env.BINDINGS_DIR];
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
    console.log(`\n✅ Uniskill core systems initialized successfully!`);
    console.log(`Try running \`uniskill scan\` to check your existing AI assets.`);
  } else {
    console.log(`\n✅ Uniskill is already properly initialized.`);
  }
};
