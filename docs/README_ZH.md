# Uniskill: 通用 AI 技能路由器与中间件

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> [返回首页 (English)](../README.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | [Deutsch](README_DE.md)

---

## 🌐 什么是 Uniskill？

Uniskill 是一款跨平台、多智能体的中间件架构，旨在解决现代 AI 辅助开发工具（Cursor, Claude Code, OpenClaw, Codex, Hermes, Opencode 等）中的生态孤岛与配置碎片化问题。

在目前的环境中，各个 AI 工具各自为战。你可能在 Cursor 里写了一套完美的 `.cursorrules`，但换到终端里的 Claude Code 时它又成了“白痴”；或者你在 OpenClaw 里装了一个极其好用的 MCP 服务，而其它本地大模型却无法共用。

**Uniskill 终结了这一切。**
> 只需安装或编写一次技能（提示词 / MCP服务器 / 原生插件），系统即可在底层瞬间将它们转换为全兼容格式，并透明地热挂载到您名下的 **所有** AI 助手脑中！

---

### 🔥 核心设计理念

- **1️⃣ Single Source of Truth (绝对唯一真相池)**：你的所有 AI 本地配置资产，将集中收敛并保存在 `~/.shared-ai-skills/` 主干库中。不再有配置丢失，出差换电脑只需同步这一个目录。
- **2️⃣ The Ultimate Translator (全端自动转译器)**：工具会自动将共用的“意图”格式化并软连接分发。自动修改各种配置，生成 `.cursorrules` 供给 Cursor，或改写 `settings.json` 挂载 MCP 控制台供给 Claude。
- **3️⃣ Brownfield Migration (老兵收编引擎)**：一键执行 `uniskill scan` 嗅探全机资产，再用 `uniskill migrate` 自动提纯、去重并强制收编那些散落在各个老版本 AI 工具体内的陈旧技能包。
- **4️⃣ 跨操作系统兼容**：无惧底层目录差异。在 macOS、Linux 或 Windows 环境中灵活使用 Symlink 符号包裹和 Path 环境变量影子技术实现静默覆盖。

---

## 🛠️ 快速开始

### 安装

Uniskill 是一个全局 Node CLI 工具。要求系统中已安装 Node.js 的环境。

```bash
# 全局安装 (稍后发布至 NPM Registry)
# npm install -g uniskill 

# 当前源码测试安装
git clone git@github.com:maomaocn/uniskill.git
cd uniskill
npm install
npm link
```

### 基础环境初始化
第一次使用，请让路由器探针了解你的本机环境：
```bash
uniskill init
```
*此操作将创建核心文件夹，并建立透明拦截挂载点。*

### 使用方法全景
- 扫描全机已有的 AI 资产重叠度：`uniskill scan`
- 强制收编现有工具技能包至统管挂载池：`uniskill migrate`
- 安装通用技能包：`uniskill install <来源路径或URL>`

---

## 🔮 我们的愿景
目前的个人 AI 辅助工具正处于“诸侯林立”的阶段。Uniskill 团队的目标不仅仅是做一个配置复制器，而是成为 **开发者终端上的 AI 能力统一中枢控制层（Control Plane）**。如果你对解决终极调度架构感兴趣，欢迎提 PR 或 Issue 共同建设这个护城河！
