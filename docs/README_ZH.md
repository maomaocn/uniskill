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

### 🔥 核心架构与功能迭代

- **1️⃣ Single Source of Truth (绝对唯一真相池)**：你的所有 AI 本地配置资产，将集中收敛并保存在 `~/.shared-ai-skills/` 主干库中。不再有配置丢失，出差换电脑只需同步这一个目录。
- **2️⃣ The Ultimate Translator (全端自动转译器)**：工具会自动将共用的“意图”格式化并软连接分发。自动修改各种配置，生成 `.cursorrules` 供给 Cursor，或改写 `settings.json` 挂载 MCP 控制台供给 Claude。
- **3️⃣ 跨端记忆聚合引擎 (v0.3.5 新增)**：指令 `uniskill sync-memory`。它能将所有机器人在时间线上学到的关于你的反馈（教训/习性）合并成《全球记忆池》。更恐怖的是：如果发现全局技能工具（比如某量化系统），它会自动脑补出**“隐式触发条件法则”**——**以后哪怕你不提工具名字，如果它侦测到你要查数据，它也会像系统肌肉记忆一样自主在本地静默调用原生武器完成任务！**
- **4️⃣ 深层环境劫持与可执行映射 (v0.3 突破)**：Uniskill 安装器会自动扫描外部生态包内部的 python、sh 等底层核心可执行代码，强行将其提炼为一个全新的系统环境变量级的命令，并写入宿主的 `$PATH` 中。让底座拥有真正的破坏与输出执行力。
- **5️⃣ 次世代终端绑定**：利用 `uniskill cursor-bind` 一键为您当前的项目打上最新的 `.mdc` 前沿结构化标识配置网阵！

---

## 🛠️ 快速开始

### 安装

Uniskill 是一个全局 Node CLI 工具。要求系统中已安装 Node.js 的环境。

```bash
# 全局安装 (需要 Node 环境支持)
npm install -g @robertsshu/uniskill 
```

### 基础环境初始化
第一次使用，请让路由器探针了解你的本机环境：
```bash
uniskill init
```
*此操作将创建核心文件夹，并自动尝试向您的 `.bashrc` 及 `.zshrc` 执行透明跨系统二进制 $PATH 注入挂载点。* （安装完成可能需要重启你的终端令系统读取全局工具）

### 核心操作指南
- **安装共用技能包**: `uniskill install <来源路径或URL>` (例如直接强夺 OpenClaw 原生包)
- **扫描重叠工具**: `uniskill scan` 嗅探全机资产重叠率。
- **提纯收编**: `uniskill migrate` 自动提纯、去重并强制收编那些陈旧的专有旧版工具到主线骨干网里。
- **强行卸载清除**: `uniskill uninstall <skill_name>` 进行涵盖物理层、钩子层与幽灵 JSON 缓存层的完全暴力抹除。
- **全局多端脑脑共振**: `uniskill sync-memory`。

---

## 🔮 我们的愿景
目前的个人 AI 辅助工具正处于“诸侯林立”的阶段。Uniskill 团队的目标不仅仅是做一个配置复制器，而是成为 **开发者终端上的 AI 能力统一中枢控制层（Control Plane）**。如果你对解决终极调度架构感兴趣，欢迎提 PR 或 Issue 共同建设这个护城河！
