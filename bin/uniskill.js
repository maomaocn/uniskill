#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 共享文件夹路径设置
const SHARED_DIR = path.join(require('os').homedir(), '.shared-ai-skills');
const CLAUDE_CONFIG = path.join(require('os').homedir(), '.claude', 'settings.json');
const OPENCLAW_CONFIG = path.join(require('os').homedir(), '.openclaw', 'openclaw.json');

// 帮助函数：读取并解析 JSON，容错处理
function readJSON(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(content);
        }
    } catch (e) {
        console.error(`Error reading ${filePath}:`, e.message);
    }
    return {};
}

function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 帮助函数：自动注入 MCP 服务器到配置
function injectMCP(skillName, skillConfig) {
    console.log(`\n> Injecting MCP Server [${skillName}]...`);

    const commandParts = skillConfig.mcpStartCommand.split(' ');
    const command = commandParts[0];
    const args = commandParts.slice(1);

    const mcpConfigEntry = {
        command: command,
        args: args,
        env: skillConfig.env || {}
    };

    // 1. 注入 Claude
    let claudeSettings = readJSON(CLAUDE_CONFIG);
    if (!claudeSettings.mcpServers) claudeSettings.mcpServers = {};
    claudeSettings.mcpServers[skillName] = mcpConfigEntry;
    writeJSON(CLAUDE_CONFIG, claudeSettings);
    console.log(`  ✓ Added to Claude ( ~/.claude/settings.json )`);

    // 2. 注入 OpenClaw (查找并挂接其配置格式)
    let openclawSettings = readJSON(OPENCLAW_CONFIG);
    // 这里做个示例：如果 openclaw 配置有 mcpConfigs 字段
    if (!openclawSettings.mcpConfigs) openclawSettings.mcpConfigs = {};
    openclawSettings.mcpConfigs[skillName] = mcpConfigEntry;
    writeJSON(OPENCLAW_CONFIG, openclawSettings);
    console.log(`  ✓ Added to OpenClaw ( ~/.openclaw/openclaw.json )`);
}

// 帮助函数：注入提示词
function injectPrompts(skillName, promptContent) {
    console.log(`\n> Injecting Prompts [${skillName}]...`);
    const promptPath = path.join(SHARED_DIR, 'prompts', `${skillName}.md`);
    fs.writeFileSync(promptPath, promptContent);
    console.log(`  ✓ Saved prompt mapping to ${promptPath}`);
    console.log(`  ! Tip: Symlink this for Cursor using: \n    ln -s ${promptPath} .cursorrules`);
}

// 主函数入口
function installSkill(skillFolderPath) {
    console.log(`=== Uniskill Universal Router ===`);
    console.log(`Analyzing skill at: ${skillFolderPath}`);

    const manifestPath = path.join(skillFolderPath, 'uniskill.json');
    if (!fs.existsSync(manifestPath)) {
        console.error("❌ Invalid skill: Missing uniskill.json manifest.");
        process.exit(1);
    }

    const manifest = readJSON(manifestPath);
    const skillName = manifest.name;

    if (manifest.type.includes('mcp') && manifest.mcpStartCommand) {
        injectMCP(skillName, manifest);
    }

    if (manifest.promptFile) {
        const promptContent = fs.readFileSync(path.join(skillFolderPath, manifest.promptFile), 'utf8');
        injectPrompts(skillName, promptContent);
    }

    if (manifest.openclawPlugin) {
        console.log(`\n> Installing OpenClaw native binding [${manifest.openclawPlugin}]...`);
        try {
            execSync(`npx clawhub install ${manifest.openclawPlugin}`, { stdio: 'inherit' });
            console.log(`  ✓ OpenClaw plugin installed.`);
        } catch (e) {
            console.log(`  ⚠ OpenClaw plugin install failed or already installed.`);
        }
    }

    console.log(`\n✅ Skill "${skillName}" installed and mapped globally across all your AI assistants!`);
}

const args = process.argv.slice(2);
if (args[0] === 'install' && args[1]) {
    installSkill(args[1]);
} else {
    console.log("Usage: node uniskill.js install </path/to/skill>");
}
