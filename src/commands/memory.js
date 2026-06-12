const fs = require('fs');
const path = require('path');
const env = require('../core/env');

module.exports = function memoryCmd() {
    console.log('===========================================');
    console.log(' 🧠 Uniskill: Cross-AI Memory Sync Engine');
    console.log('===========================================');

    if (!fs.existsSync(env.MEMORY_BANK_DIR)) fs.mkdirSync(env.MEMORY_BANK_DIR, {recursive: true});

    let combinedMemory = "# Uniskill Global Memory Bank (Consciousness Merge)\n\n" +
                         "The following facts, habits, and rules have been extracted from cross-platform AI memories.\n" +
                         "You MUST adhere to these learned rules globally.\n\n";
    let memoryFound = false;

    // 汲取 Claude 记忆碎块
    if (fs.existsSync(env.CLAUDE_MEMORY_DIR)) {
        const files = fs.readdirSync(env.CLAUDE_MEMORY_DIR).filter(f => f.endsWith('.md') && f !== 'MEMORY.md');
        if (files.length > 0) {
            console.log(`\n> Siphoning Claude memory corpus (${files.length} fragments)...`);
            files.forEach(f => {
                const content = fs.readFileSync(path.join(env.CLAUDE_MEMORY_DIR, f), 'utf8');
                combinedMemory += `### Source Fragment: Claude [${f}]\n${content}\n\n---\n`;
            });
            memoryFound = true;
            console.log('  ✓ Abstracted Claude personality and operational memories.');
        }
    }

    // 汲取 OpenClaw 记忆碎块
    if (fs.existsSync(env.OPENCLAW_MEMORY_DIR)) {
        const files = fs.readdirSync(env.OPENCLAW_MEMORY_DIR).filter(f => f.endsWith('.md'));
        if (files.length > 0) {
            console.log(`\n> Siphoning OpenClaw memory corpus (${files.length} fragments)...`);
            files.forEach(f => {
                const content = fs.readFileSync(path.join(env.OPENCLAW_MEMORY_DIR, f), 'utf8');
                combinedMemory += `### Source Fragment: OpenClaw [${f}]\n${content}\n\n---\n`;
            });
            memoryFound = true;
            console.log('  ✓ Abstracted OpenClaw feedback memories.');
        }
    }

    if (memoryFound) {
        const targetPath = path.join(env.MEMORY_BANK_DIR, 'global_memory.md');
        fs.writeFileSync(targetPath, combinedMemory);
        console.log(`\n✅ Memory synchronization complete! Unified consciousness stored at:`);
        console.log(`   📂 ${targetPath}`);
        console.log(`\n   💡 Your AIs now share the same brain! Run \`uniskill cursor\` to inject this mind into your next project.`);
    } else {
        console.log('\n⚠ No local memory fragments found to synchronize yet. Try asking your AI to "remember" something first.');
    }
};
