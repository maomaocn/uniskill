const fs = require('fs');
const path = require('path');
const env = require('../core/env');

module.exports = function cursorCmd(targetDir) {
    const dir = targetDir || process.cwd();
    console.log('\n===========================================');
    console.log(' 🎯 Uniskill: Cursor Next-Gen Capabilities Integration');
    console.log('===========================================');

    // 最新的 Cursor 底层架构不爱用单文件 .cursorrules，而是转向了 .cursor/rules/*.mdc
    const cursorRulesDir = path.join(dir, '.cursor', 'rules');
    if (!fs.existsSync(cursorRulesDir)) {
        fs.mkdirSync(cursorRulesDir, { recursive: true });
        console.log(`> Created next-gen MDC (Markdown-Cursor) structure at ${cursorRulesDir}`);
    } else {
        console.log(`> Target MDC structure found at ${cursorRulesDir}`);
    }

    let rulesInjected = 0;

    // 注入我们之前统管的所有 Prompts 技能
    if (fs.existsSync(env.PROMPTS_DIR)) {
        const prompts = fs.readdirSync(env.PROMPTS_DIR).filter(f => f.endsWith('.md'));
        prompts.forEach(p => {
            const content = fs.readFileSync(path.join(env.PROMPTS_DIR, p), 'utf8');
            const name = p.replace('.md', '');
            
            // Cursor .mdc Frontmatter 强校验结构
            const mdcContent = `---
description: Auto-injected Uniskill capability for ${name}
globs: *
---

${content}`;
            fs.writeFileSync(path.join(cursorRulesDir, `uniskill-${name}.mdc`), mdcContent);
            rulesInjected++;
        });
        if (prompts.length > 0) console.log(`  ✓ Injected ${prompts.length} global skill concepts as native Cursor rules.`);
    }

    // 注入我们刚刚提炼的全平台共用记忆 (Global Memory Banks)
    const globalMemoryFile = path.join(env.MEMORY_BANK_DIR, 'global_memory.md');
    if (fs.existsSync(globalMemoryFile)) {
        const memoryContent = fs.readFileSync(globalMemoryFile, 'utf8');
        const mdcContent = `---
description: Cross-AI Shared Global Memory (Personalities, Feedbacks, Contexts)
globs: *
---

${memoryContent}`;
        fs.writeFileSync(path.join(cursorRulesDir, `uniskill-global-memory.mdc`), mdcContent);
        rulesInjected++;
        console.log(`  ✓ Synced Cross-AI Global Consciousness into Cursor brain.`);
    }

    if (rulesInjected > 0) {
        console.log(`\n✅ Project bounded successfully. Cursor is now fully armed with Uniskill globals!`);
    } else {
        console.log(`\n⚠ Failed to bind. Make sure your ~/.shared-ai-skills pool is not empty.`);
    }
};
