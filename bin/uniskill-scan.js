#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CLAUDE_CONFIG = path.join(process.env.HOME, '.claude', 'settings.json');
const OPENCLAW_SKILLS_DIR = path.join(process.env.HOME, '.openclaw', 'skills');
const CURSOR_CONFIG = path.join(process.env.HOME, 'Library', 'Application Support', 'Cursor', 'User', 'settings.json');

const report = {
    claude: { format: 'settings.json (MCP)', found: [] },
    openclaw: { format: '~/.openclaw/skills (Plugin/Symlink)', found: [] },
    cursor: { format: 'User Settings', found: [] },
    overlapping: []
};

// 1. Scan Claude MCP Servers
try {
    if (fs.existsSync(CLAUDE_CONFIG)) {
        const claudeData = JSON.parse(fs.readFileSync(CLAUDE_CONFIG, 'utf8'));
        if (claudeData.mcpServers) {
            report.claude.found = Object.keys(claudeData.mcpServers);
        }
    }
} catch(e) {}

// 2. Scan OpenClaw Skills
try {
    if (fs.existsSync(OPENCLAW_SKILLS_DIR)) {
        const contents = fs.readdirSync(OPENCLAW_SKILLS_DIR);
        for (let item of contents) {
            if (!item.startsWith('.')) {
                report.openclaw.found.push(item);
            }
        }
    }
} catch(e) {}

// 3. Dummy check for Cursor
try {
    if (fs.existsSync(CURSOR_CONFIG)) {
         report.cursor.found.push('cursor-global-rules'); // Placeholder based on general setup
    }
} catch(e) {}

// Logic: Check overlaps between Claude & OpenClaw
const allSkillsMap = {};

function addToMap(src, arr) {
    arr.forEach(item => {
        if (!allSkillsMap[item]) allSkillsMap[item] = [];
        allSkillsMap[item].push(src);
    });
}
addToMap('Claude', report.claude.found);
addToMap('OpenClaw', report.openclaw.found);
addToMap('Cursor', report.cursor.found);

for (let [skillName, sources] of Object.entries(allSkillsMap)) {
    if (sources.length > 1) {
        report.overlapping.push({ skill: skillName, locations: sources });
    }
}

// Print Report
console.log('===========================================');
console.log(' 🔍 Uniskill: Scanning Local AI Assets...');
console.log('===========================================');

console.log(`\n[Claude Code] 发现引擎: ${report.claude.found.length > 0 ? report.claude.found.join(', ') : '无/使用内置'}`);
console.log(`[OpenClaw]    发现插件: ${report.openclaw.found.length > 0 ? report.openclaw.found.join(', ') : '无'}`);

if (report.overlapping.length > 0) {
    console.log('\n⚠️ 发现重叠资产:');
    report.overlapping.forEach(overlap => {
        console.log(` - "${overlap.skill}" 在 ${overlap.locations.join(' 与 ')} 中重复出现。`);
    });
    console.log(`   建议: 执行 \`uniskill migrate\` 将其剥离至核心库 ~/.shared-ai-skills/ 共享。`);
} else {
    console.log('\n✅ 恭喜！当前各工具间无明显重叠冲突的代码。你可以安全地开始基于 Uniskill 进行共享管理！');
}
console.log('\n===========================================');

