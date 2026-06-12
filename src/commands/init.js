const fs = require('fs');
const path = require('path');
const os = require('os');
const env = require('../core/env');

module.exports = function initCmd() {
  console.log('\n🌟 Initializing Uniskill Universal Environment...');
  
  const dirs = [env.UNISKILL_DIR, env.PROMPTS_DIR, env.MCP_DIR, env.BINDINGS_DIR, env.MEMORY_BANK_DIR, path.join(env.HOME, '.shared-ai-skills', 'bin')];
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

  // [New Capability]: Inject ~/.shared-ai-skills/bin into global PATH dynamically
  console.log(`\n[Stage 2] Subsystem PATH Integration...`);
  
  const binDir = path.join(env.HOME, '.shared-ai-skills', 'bin');
  const bashrcPath = path.join(env.HOME, '.bashrc');
  const zshrcPath = path.join(env.HOME, '.zshrc');
  const bashProfilePath = path.join(env.HOME, '.bash_profile');
  
  const pathExportString = `\n# Uniskill Global Binaries (Cross-AI Execution Layer)\nexport PATH="${binDir}:$PATH"\n`;
  let injected = false;
  
  const injectPath = (profilePath) => {
      if (fs.existsSync(profilePath)) {
          const content = fs.readFileSync(profilePath, 'utf8');
          if (!content.includes(binDir)) {
              fs.appendFileSync(profilePath, pathExportString);
              console.log(`  ✓ Injected Global PATH into: ${path.basename(profilePath)}`);
              injected = true;
          } else {
              console.log(`  - PATH already present in: ${path.basename(profilePath)}`);
              injected = true;
          }
      }
  };

  if (os.platform() !== 'win32') {
      injectPath(bashrcPath);
      injectPath(zshrcPath);
      injectPath(bashProfilePath);
  }

  if (!injected && os.platform() !== 'win32') {
      console.log(`  ⚠ Auto-injection failed. Please manually add this to your shell profile:`);
      console.log(`    export PATH="${binDir}:$PATH"`);
  }

  if (created > 0 || injected) {
    console.log(`\n✅ Uniskill core systems initialized successfully!`);
    if (injected) {
         console.log(`   ATTENTION: You MUST run \`source ~/.bashrc\` (or restart your terminal) required for the new PATH to take effect!`);
    }
  } else {
    console.log(`\n✅ Uniskill is already properly initialized.`);
  }
};
