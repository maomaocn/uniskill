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

        // Clawhub does NOT accept username/skill-name formats (e.g. cnyezi/a-stock-analysis).
        // It strictly only accepts the skill-name natively via the CLI.
        if (skillArg.startsWith('http')) {
            const urlParts = new URL(skillArg).pathname.split('/').filter(Boolean);
            // The very LAST part of the URL is the correct slug for clawhub
            openclawSlug = urlParts[urlParts.length - 1];
        } 
        else {
            // Even if someone types cnyezi/a-stock-analysis manually in uniskill, strip the author prefix
            openclawSlug = skillArg.includes('/') ? skillArg.split('/').pop() : skillArg;
        }

        if (openclawSlug) {
            console.log(`\n[Stage 1]: Native Sandbox Execution (Pulling source)`);
            console.log(`           Fetching payload: ${openclawSlug}...`);
            
            try {
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
        const parsedSkillName = openclawSlug; 
        
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
