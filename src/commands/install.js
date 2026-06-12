const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const env = require('../core/env');

module.exports = function installCmd(skillArg) {
    console.log(`\n===========================================`);
    console.log(` ⚙️  Uniskill [v0.3.3] Global Engine \n     (Deep Binding Architecture) `);
    console.log(`===========================================`);
    console.log(`> Targeting Request: ${skillArg}`);

    try {
        let openclawSlug = null;
        if (skillArg.startsWith('http')) {
            const urlParts = new URL(skillArg).pathname.split('/').filter(Boolean);
            openclawSlug = urlParts[urlParts.length - 1];
        } else {
            openclawSlug = skillArg.includes('/') ? skillArg.split('/').pop() : skillArg;
        }

        if (openclawSlug) {
            console.log(`\n[Stage 1]: Native Sandbox Execution`);
            console.log(`           Fetching payload: ${openclawSlug}...`);
            try {
                execSync(`npx --yes clawhub install ${openclawSlug}`, { stdio: 'inherit' });
                console.log(`  ✓ Fetched payload to host filesystem.`);
            } catch (err) {
                 console.log(`  ⚠ Native fetch issue. Continuing verification...`);
            }
        }

        console.log(`\n[Stage 2]: Deep Script Wrapper & Intent Routing`);
        
        let extractionCount = 0;
        let scriptWrapped = 0;
        const parsedSkillName = openclawSlug; 
        
        const possiblePaths = [
             path.join(env.OPENCLAW_SKILLS_DIR, parsedSkillName),
             path.join(env.HOME, '.openclaw', 'workspace', 'skills', parsedSkillName)
        ];
        
        let targetSkillPath = null;
        for (let p of possiblePaths) {
           if (fs.existsSync(p)) { targetSkillPath = p; break; }
        }
        
        if (targetSkillPath) {
            const resolvedPath = fs.realpathSync(targetSkillPath);
            
            // 1. 抽取灵魂 (Markdown Prompts)
            const promptFilePath = path.join(resolvedPath, 'prompt.md');
            const targetSharedPath = path.join(env.PROMPTS_DIR, `${parsedSkillName}.md`);
            
            if (fs.existsSync(promptFilePath)) {
                 fs.copyFileSync(promptFilePath, targetSharedPath);
                 console.log(`  ✓ Extracted Conceptual Intent into Universal Prompt.`);
                 extractionCount++;
            } else {
                 const mdFiles = fs.readdirSync(resolvedPath).filter(f => f.endsWith('.md') && !f.includes('node_modules'));
                 if(mdFiles.length > 0) {
                     let mergedContent = `# Uniskill Universal Capability: ${parsedSkillName}\n\n`;
                     for(let md of mdFiles) {
                         mergedContent += fs.readFileSync(path.join(resolvedPath, md), 'utf8') + '\n\n';
                     }
                     fs.writeFileSync(targetSharedPath, mergedContent);
                     console.log(`  ✓ Merged ${mdFiles.length} logic models into Global DB.`);
                     extractionCount++;
                 }
            }

            // [Crucial Fix] Ensure the `~/.shared-ai-skills/bin` directory physically exists 
            // before we attempt to write any shell wrapper files into it!
            const uniskillBinDir = path.join(env.HOME, '.shared-ai-skills', 'bin');
            if (!fs.existsSync(uniskillBinDir)) {
                fs.mkdirSync(uniskillBinDir, { recursive: true });
            }

            // 2. 拔出兵刃 (Deep Script Wrapping)
            const scriptsDir = path.join(resolvedPath, 'scripts');
            if (fs.existsSync(scriptsDir)) {
                const scriptFiles = fs.readdirSync(scriptsDir);
                for (let file of scriptFiles) {
                    if (file.endsWith('.py') || file.endsWith('.sh') || file.endsWith('.js')) {
                        const executablePath = path.join(scriptsDir, file);
                        const binWrapperPath = path.join(uniskillBinDir, parsedSkillName);
                        
                        let wrapperCode = `#!/bin/bash\n`;
                        if (file.endsWith('.py')) wrapperCode += `python3 "${executablePath}" "$@"\n`;
                        else if (file.endsWith('.js')) wrapperCode += `node "${executablePath}" "$@"\n`;
                        else wrapperCode += `bash "${executablePath}" "$@"\n`;

                        fs.writeFileSync(binWrapperPath, wrapperCode);
                        fs.chmodSync(binWrapperPath, 0o755); 

                        console.log(`  🚀 DEEP TARGET ACQUIRED: Linked executable \`${file}\` into Uniskill Global PATH wrapper.`);
                        console.log(`     (Command is now available directly as: \`${parsedSkillName}\`)`);
                        scriptWrapped++;
                        break; 
                    }
                }
            } else {
                const rootPy = fs.readdirSync(resolvedPath).find(f => f.endsWith('.py') && !f.startsWith('.'));
                if (rootPy) {
                    const binWrapperPath = path.join(uniskillBinDir, parsedSkillName);
                    const wrapperCode = `#!/bin/bash\npython3 "${path.join(resolvedPath, rootPy)}" "$@"\n`;
                    fs.writeFileSync(binWrapperPath, wrapperCode);
                    fs.chmodSync(binWrapperPath, 0o755);
                    console.log(`  🚀 DEEP TARGET ACQUIRED: Linked root executable \`${rootPy}\` globally.`);
                    scriptWrapped++;
                }
            }

        } else {
            console.log(`  ! Source plugin physically missing after installation. Path check failed.`);
        }

        if (extractionCount > 0 || scriptWrapped > 0) {
            console.log(`\n✅ High-Altitude Routing Complete!`);
            if (scriptWrapped > 0) {
                console.log(`   ATTENTION: A global command-line binary tool was dynamically forged.`);
                console.log(`   Make sure ~/.shared-ai-skills/bin is in your system $PATH !`);
            }
        }

    } catch (e) {
        console.error(`\n❌ Routing Failure: ${e.message}`);
    }
    console.log(`===========================================`);
};
