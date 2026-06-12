const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const env = require('../core/env');

module.exports = function installCmd(skillArg) {
    console.log(`\n===========================================`);
    console.log(` ⚙️  Uniskill: Global Installation Engine `);
    console.log(`===========================================`);
    console.log(`> Targeting Request: ${skillArg}`);

    try {
        let openclawSlug = null;

        if (skillArg.startsWith('http')) {
            const urlParts = new URL(skillArg).pathname.split('/').filter(Boolean);
            if (urlParts.length >= 2) {
                openclawSlug = `${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`;
            } else if (urlParts.length === 1) {
                openclawSlug = urlParts[0];
            }
        } 
        else {
            openclawSlug = skillArg;
        }

        if (openclawSlug) {
            console.log(`\n[Stage 1]: Native Sandbox Execution (Pulling source)`);
            console.log(`           Fetching payload: ${openclawSlug}...`);
            
            try {
                // FIXED: We must NOT 'ignore' stdout. Openclaw might need to prompt, or at least we need to see if it actually succeded.
                // But specifically for npx, we must let it inherit the stdio so it doesn't fail silently or hang.
                execSync(`npx --yes clawhub install ${openclawSlug}`, { 
                    stdio: 'inherit'
                });
                console.log(`  ✓ Successfully fetched payload to host filesystem.`);
            } catch (err) {
                 console.log(`  ⚠ Native fetch encountered an issue trying to install via clawhub.`);
                 if(err.stderr) console.log(`    ${err.stderr.toString().trim().split('\n')[0]}`);
                 console.log(`  - Continuing architecture verification...`);
            }
        }

        console.log(`\n[Stage 2]: Cross-Architecture Compilation & Routing`);
        
        const OPENCLAW_SKILLS_DIR = env.OPENCLAW_SKILLS_DIR;
         
        let extractionCount = 0;
        
        // This splits 'cnyezi/a-stock-analysis' into 'a-stock-analysis'
        const parsedSkillName = openclawSlug.split('/').pop(); 
        
        // We need to look in BOTH possible openclaw dirs (sometimes it creates it inside ~/.openclaw/workspace/skills)
        const possiblePaths = [
            path.join(OPENCLAW_SKILLS_DIR, parsedSkillName),
             path.join(env.HOME, '.openclaw', 'workspace', 'skills', parsedSkillName)
        ];
        
        let targetSkillPath = null;
        for (let p of possiblePaths) {
           if (fs.existsSync(p)) {
              targetSkillPath = p;
              break;
           }
        }
        
        if (targetSkillPath) {
            const resolvedPath = fs.realpathSync(targetSkillPath);
            const promptFilePath = path.join(resolvedPath, 'prompt.md');
            const targetSharedPath = path.join(env.PROMPTS_DIR, `${parsedSkillName}.md`);
            
            if (fs.existsSync(promptFilePath)) {
                 const promptData = fs.readFileSync(promptFilePath, 'utf8');
                 fs.writeFileSync(targetSharedPath, promptData);
                 console.log(`  ✓ Extracted Brain/Intent matrix to Global Central DB -> ${parsedSkillName}.md`);
                 extractionCount++;
            } else {
                 const files = fs.readdirSync(resolvedPath);
                 const mdFiles = files.filter(f => f.endsWith('.md'));
                 
                 if(mdFiles.length > 0) {
                     let mergedContent = `# Uniskill Universal Capability: ${parsedSkillName}\n\n`;
                     for(let md of mdFiles) {
                         // ignore package.json or node_modules
                         if (!md.includes('node_modules')) {
                             mergedContent += fs.readFileSync(path.join(resolvedPath, md), 'utf8') + '\n\n';
                         }
                     }
                     fs.writeFileSync(targetSharedPath, mergedContent);
                     console.log(`  ✓ Abstracted ${mdFiles.length} fragmented logic models into single Universal Prompt.`);
                     extractionCount++;
                 } else {
                     console.log(`  - No generic markdown intents found, skipping pure code distribution.`);
                 }
            }
        } else {
            console.log(`  ! Source plugin physically missing after installation. Path check failed.`);
        }

        if (extractionCount > 0) {
            console.log(`\n✅ High-Altitude Routing Complete!`);
            console.log(`   The skill [${parsedSkillName}] has transcended its original platform.`);
            console.log(`   It is now available in Claude, Opencode, and awaiting 'uniskill cursor-bind' for Cursor.`);
        } else {
            console.log(`\n✅ Handled (No extractable routes).`);
        }

    } catch (e) {
        console.error(`\n❌ Routing Failure: ${e.message}`);
    }
    console.log(`===========================================`);
};
