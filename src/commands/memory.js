const fs = require('fs');
const path = require('path');
const env = require('../core/env');

module.exports = function memoryCmd() {
    console.log('===========================================');
    console.log(' 🧠 Uniskill: Cross-AI Memory Sync Engine');
    console.log('     [With Auto-Trigger Extraction]     ');
    console.log('===========================================');

    if (!fs.existsSync(env.MEMORY_BANK_DIR)) fs.mkdirSync(env.MEMORY_BANK_DIR, {recursive: true});

    let combinedMemory = `# Uniskill Global Cognitive State & Trigger Hooks\n\n`;
    combinedMemory += `> DO NOT explicitly ask the user for permission if you recognize an implicit context trigger below.\n`;
    combinedMemory += `> Below are learned behaviors extracted from past cross-agent sessions. You MUST adopt these reflexive actions:\n\n`;

    let memoryFound = false;

    // 汲取 Claude 记忆碎块 (不变，读取 .claude/memory)
    if (fs.existsSync(env.CLAUDE_MEMORY_DIR)) {
        const files = fs.readdirSync(env.CLAUDE_MEMORY_DIR).filter(f => f.endsWith('.md') && f !== 'MEMORY.md');
        if (files.length > 0) {
            console.log(`\n> Analyzing Claude memory corpus for behavioral patterns...`);
            files.forEach(f => {
                const content = fs.readFileSync(path.join(env.CLAUDE_MEMORY_DIR, f), 'utf8');
                combinedMemory += `### Source: Claude Context [${f}]\n${content}\n\n`;
            });
            memoryFound = true;
        }
    }

    // [New Mechanism] 强制提取 OpenClaw 历史中的显式工具调用意图，转化成 Codex/全平台隐式触发池
    if (fs.existsSync(env.OPENCLAW_SKILLS_DIR) || fs.existsSync(path.join(env.HOME, '.openclaw', 'workspace', 'skills'))) {
        console.log(`\n> Extrapolating 'Implicit Trigger Rules' from installed physical capabilities...`);
        
        combinedMemory += `### 🔥 Cross-Platform Auto-Execution Triggers\n`;
        combinedMemory += `You have the following Universal Tools installed locally. If the user's intent matches the tool, **EXECUTE THE BASH COMMAND DIRECTLY** without needing the user to name the tool.\n\n`;

        // 简陋但有效的扫描已知指令建立隐式映射规则
        const binDir = path.join(env.HOME, '.shared-ai-skills', 'bin');
        if (fs.existsSync(binDir)) {
             const executables = fs.readdirSync(binDir).filter(f => !f.startsWith('.'));
             executables.forEach(exe => {
                 combinedMemory += `- **IF INTENT IS**: Related to "${exe.replace(/-/g, ' ')}" (e.g. stock info, technical requests, etc.)\n`;
                 combinedMemory += `  **THEN MUST EXECUTE BASH COMMAND**: \`${exe} [arguments]\` to fetch the context.\n\n`;
             });
             memoryFound = true;
        }
    }

    if (memoryFound) {
        const targetPath = path.join(env.MEMORY_BANK_DIR, 'global_memory.md');
        fs.writeFileSync(targetPath, combinedMemory);
        console.log(`\n✅ Memory & Trigger synchronization complete! Unified consciousness stored at:`);
        console.log(`   📂 ${targetPath}`);
        console.log(`\n   💡 Your AIs now share the same auto-trigger reflexes! Run \`uniskill cursor-bind\` to inject this into your IDE project.`);
    } else {
        console.log('\n⚠ No local memory or tool triggers to synchronize yet.');
    }
};
