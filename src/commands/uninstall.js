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
        let nativePurged = false;

        console.log(`\n[Stage 1]: Native Sandbox Purge`);
        
        // 1. First attempt: Ask clawhub natively to uninstall
        try {
            execSync(`npx --yes clawhub uninstall ${openclawSlug}`, { stdio: 'ignore' });
            console.log(`  ✓ Native uninstall routine completed.`);
            nativePurged = true;
        } catch(e) {
            // It might fail because clawhub strictly looks at certain paths. We will force a harsh manual purge below.
        }

        // 2. Second attempt: Manual eradication of physical openclaw workspace footprint
        const possiblePaths = [
             path.join(env.OPENCLAW_SKILLS_DIR, openclawSlug),
             path.join(env.HOME, '.openclaw', 'workspace', 'skills', openclawSlug)
        ];
        
        for (let p of possiblePaths) {
            if (fs.existsSync(p)) {
                // Node 14+ method for recursive rm -rf
                fs.rmSync(p, { recursive: true, force: true });
                console.log(`  ✓ Force-deleted remaining physical root at: ${p}`);
                nativePurged = true;
            }
        }

        if (!nativePurged) {
            console.log(`  - No native sandbox footprint found to delete.`);
        }

        // 3. 拔除各种挂载的器官
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

        // 4. Force repair openclaw.json config if needed (since it sometimes caches stuff)
        // This stops the warning / cached list issues.
        try {
            execSync(`npx --yes openclaw doctor --fix`, { stdio: 'ignore' });
            console.log(`  ✓ Repaired and flushed host config cache.`);
        } catch(e) {}

        if (cleaned > 0 || nativePurged) {
            console.log(`\n✅ Global Purge Complete. Eradicated everywhere.`);
        } else {
             console.log(`\n✅ Assumed clean. No traces found in Universal pool.`);
        }

    } catch (e) {
        console.error(`\n❌ Uninstall Failure: ${e.message}`);
    }
    console.log(`===========================================`);
};
