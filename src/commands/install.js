const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const env = require('../core/env');
const migrateCmd = require('./migrate');

module.exports = function installCmd(skillArg) {
    console.log(`\n===========================================`);
    console.log(` ⚙️  Uniskill: Global Installation Engine `);
    console.log(`===========================================`);
    console.log(`> Targeting Request: ${skillArg}`);

    try {
        // 1. URL 解析与下载逻辑 (拦截 clawhub 生态)
        let openclawSlug = null;

        // 如果用户传入的是 URL 链接 (如: https://clawhub.ai/cnyezi/a-stock-analysis)
        if (skillArg.startsWith('http')) {
            const urlParts = new URL(skillArg).pathname.split('/').filter(Boolean);
            // 提取最后两段作为作者/包名 (如: cnyezi/a-stock-analysis)
            if (urlParts.length >= 2) {
                openclawSlug = `${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`;
            } else if (urlParts.length === 1) {
                openclawSlug = urlParts[0];
            }
        } 
        // 否则如果属于常规 npm 类或自带斜杠的作用域名字 (如 cnyezi/a-stock-analysis)
        else {
            openclawSlug = skillArg;
        }

        // 2. 执行底层原生获取行为 (针对 OpenClaw 源的技能)
        if (openclawSlug) {
            console.log(`\n[Stage 1]: Native Sandbox Execution (Pulling source)`);
            console.log(`           Fetching payload: ${openclawSlug}...`);
            
            try {
                // 静默或继承执行 npx clawhub
                execSync(`npx clawhub install ${openclawSlug}`, { 
                    stdio: ['ignore', 'ignore', 'pipe'] // 不给用户看繁琐原生日志，只捕捉错误
                });
                console.log(`  ✓ Successfully fetched payload to host filesystem.`);
            } catch (err) {
                 // 如果真装失败了，把错误原因透传出来
                 console.log(`  ⚠ Native fetch encountered an issue:`);
                 console.log(`    ${err.stderr.toString().trim().split('\n')[0]}`);
                 // 很多情况是因为依赖已经装过了或者名字拼错，我们依然尝试往下走
                 console.log(`  - Continuing architecture verification...`);
            }
        }

        // 3. 拦截、分割、并打散到 6 大 AI 助手
        console.log(`\n[Stage 2]: Cross-Architecture Compilation & Routing`);
        
        // 既然刚才通过 openclaw 强行把包下到了本地
        // 我们直接复用我们在 migrate.js 里写好的伟大拆解器！
        
        // 但为了日志好看我们要稍微静默或调整点输出，这里利用复用的代码块：
        const OPENCLAW_SKILLS_DIR = env.OPENCLAW_SKILLS_DIR;
         
        let extractionCount = 0;
        
        // 我们针对刚才那个 specific 包做强解析
        const parsedSkillName = openclawSlug.split('/').pop(); 
        const targetSkillPath = path.join(OPENCLAW_SKILLS_DIR, parsedSkillName);
        
        if (fs.existsSync(targetSkillPath)) {
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
                         mergedContent += fs.readFileSync(path.join(resolvedPath, md), 'utf8') + '\n\n';
                     }
                     fs.writeFileSync(targetSharedPath, mergedContent);
                     console.log(`  ✓ Abstracted ${mdFiles.length} fragmented logic models into single Universal Prompt.`);
                     extractionCount++;
                 } else {
                     console.log(`  - No generic markdown intents found, skipping pure code distribution.`);
                 }
            }
        }

        // 假如有 MCP JSON，应该写入 Claude（此处留作下一代能力，因为纯净的 clawhub 包现在主要是 Prompt 和 Openclaws 原生函数）
        
        if (extractionCount > 0) {
            console.log(`\n✅ High-Altitude Routing Complete!`);
            console.log(`   The skill [${parsedSkillName}] has transcended its original platform.`);
            console.log(`   It is now available in Claude, Opencode, and awaiting 'uniskill cursor-bind' for Cursor.`);
        } else {
            console.log(`\n✅ Handled.`);
        }

    } catch (e) {
        console.error(`\n❌ Routing Failure: ${e.message}`);
    }
    console.log(`===========================================`);
};
