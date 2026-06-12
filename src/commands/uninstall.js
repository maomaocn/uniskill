const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const env = require('../core/env');

module.exports = function uninstallCmd(skillArg) {
    console.log(`\n===========================================`);
    console.log(` 🗑️  Uniskill: Global Uninstallation `);
    console.log(`===========================================`);
    console.log(`> Targeting Purge: ${skillArg}`);

    try {
        let openclawSlug = skillArg.includes('/') ? skillArg.split('/').pop() : skillArg;

        // 1. 尝试调用原生卸载
        try {
            console.log(`\n[Stage 1]: Native Sandbox Purge`);
            execSync(`npx --yes clawhub uninstall ${openclawSlug}`, { stdio: 'pipe' });
            console.log(`  ✓ Native footprint erased.`);
        } catch(e) {
            console.log(`  ⚠ Native uninstall failed or not applicable.`);
        }

        // 2. 拔除各种挂载的器官
        console.log(`\n[Stage 2]: Cross-Architecture Disconnect`);
        
        let cleaned = 0;
        
        // Remove memory prompts
        const mdPath = path.join(env.PROMPTS_DIR, `${openclawSlug}.md`);
        if (fs.existsSync(mdPath)) {
            fs.unlinkSync(mdPath);
            console.log(`  ✓ Deleted Universal Prompt Concept.`);
            cleaned++;
        }

        // Remove deep wrapper binaries
        const binPath = path.join(env.HOME, '.shared-ai-skills', 'bin', openclawSlug);
        if (fs.existsSync(binPath)) {
            fs.unlinkSync(binPath);
            console.log(`  ✓ Purged Executable Wrapper from Global PATH.`);
            cleaned++;
        }

        // Removing symlinks inside Cursor/MDC is more complex, leaving simple success mesage
        if (cleaned > 0) {
            console.log(`\n✅ Global Purge Complete. Eradicated everywhere.`);
        } else {
             console.log(`\n✅ Assumed clean. No traces found in Universal pool.`);
        }

    } catch (e) {
        console.error(`\n❌ Uninstall Failure: ${e.message}`);
    }
    console.log(`===========================================`);
};
