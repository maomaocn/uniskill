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

        console.log(`\n[Stage 1]: Internal Ecosystem Disconnect`);
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

        console.log(`\n[Stage 2]: Brutal Native Sandbox Purge`);
        let nativePurged = false;
        
        // Sometimes the package is registered inside OpenClaw's own config JSON.
        // If it's loaded as a plugin or skill, we have to tell openclaw CLI to forcefully disable it first before we rip out the directory.
        try {
            execSync(`npx --yes openclaw plugins disable ${openclawSlug}`, { stdio: 'ignore' });
            console.log(`  ✓ Forced OpenClaw to unregister plugin/skill logic.`);
        } catch(e) {}

        // Manual eradication of physical openclaw footprint
        // The pathing is often the trickster. Let's make sure we find all variants.
        const possiblePaths = [
             path.join(env.OPENCLAW_SKILLS_DIR, openclawSlug),
             path.join(env.HOME, '.openclaw', 'workspace', 'skills', openclawSlug),
             path.join(env.HOME, '.openclaw', 'plugins', openclawSlug)
        ];
        
        for (let p of possiblePaths) {
            if (fs.existsSync(p)) {
                fs.rmSync(p, { recursive: true, force: true });
                console.log(`  ✓ Force-deleted remaining physical root at: ${p}`);
                nativePurged = true;
            }
        }

        if (!nativePurged) {
            console.log(`  - No native sandbox footprint directories found to delete.`);
        }

        // Finally, run clawhub's uninstall to clear its own internal state tracking
        try {
            execSync(`npx --yes clawhub uninstall ${openclawSlug}`, { stdio: 'ignore' });
            console.log(`  ✓ Triggered native module state clear.`);
        } catch(e) {
            console.log(`  - Native uninstaller skip: likely already cleared.`);
        }

        // Extremely aggressive sweeps: Fix config keys that keep openclaw ghosting.
        try {
            console.log(`  ✓ Attempting post-clean doctor fix...`);
            execSync(`npx --yes openclaw doctor --fix`, { stdio: 'ignore' });
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
