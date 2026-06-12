# Uniskill: 通用 AI 技能路由器与中间件

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> [返回首页 (English)](../README.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | [Deutsch](README_DE.md)

---

## 🌐 什么是 Uniskill？

Uniskill 是一款跨平台、多智能体的中间件架构，旨在解决现代 AI 辅助开发工具（Cursor, Claude Code, OpenClaw, Codex, Hermes, Opencode 等）中的生态孤岛与配置碎片化问题。

**Uniskill 终结了这一切。**
> 只需安装或编写一次技能（提示词 / MCP服务器 / 原生插件），系统即可在底层瞬间将它们转换为全兼容格式，并透明地热挂载到您名下的 **所有** AI 助手脑中！

---

## 🛠️ 快速开始与核心命令详解

### 1. 安装与初始化

要求系统中已安装 Node.js 环境。

```bash
# 全局安装
npm install -g @robertsshu/uniskill 

# 初始化核心环境
uniskill init
```
*注：初始化完成后，请**根据提示重启终端**，以便系统能识别 Uniskill 生成的跨平台 `$PATH` 变量。*

### 2. 安装与挂载技能 (`install`)
当你从社区获取到一个技能时，通过 Uniskill 安装，它将自动派发到所有的 AI 工具。
```bash
uniskill install https://clawhub.ai/cnyezi/a-stock-analysis
```

### 3. 彻底卸载技能 (`uninstall`)
如果不使用该命令，各家 AI 往往会有非常顽固的残留配置和缓存。Uniskill 提供彻底的**物理层+配置层双重抹除**：
```bash
uniskill uninstall a-stock-analysis
```
*执行后，该技能相关的原生代码、全局终端命令、以及通用提示词将被系统全网格杀，干净如初。*

### 4. 跨端记忆聚合与自主触发 (`sync-memory`)
这是 Uniskill 的王牌功能之一。当你在不同的 AI 工具中工作后，执行：
```bash
uniskill sync-memory
```
它能做到两件事：
1. **聚合习惯**：抽出所有 AI 的反思记忆，形成统一的《全球记忆池》。
2. **隐式触发**：扫描所有已安装的命令行工具，生成自动化触发规范。**以后哪怕你不提工具名字，只要意图匹配，AI 也能自主调用本地命令执行任务！**

### 5. 绑定到极客现代编辑器 (`cursor-bind`)
对于使用 Cursor 最新前沿版本（采用 `.mdc` 目录架构）的开发者，当你开启一个新的工程，或希望全局技能生效时：
```bash
cd 你的代码项目根目录
uniskill cursor-bind
```
*执行后，全球记忆池与所有的共用提示词会瞬间转换并注入到当前项目的 `.cursor/rules/` 体系中，让 Cursor 满血复活！*

### 6. 清理与整理老资产 (`scan` & `migrate`)
```bash
# 扫描现有机器上的各个工具重叠插件
uniskill scan

# 自动提纯、去重并收编旧版工具到骨干网
uniskill migrate
```

---

## 🔮 我们的愿景
目前的个人 AI 辅助工具正处于“诸侯林立”的阶段。Uniskill 团队的目标不仅仅是做一个配置复制器，而是成为 **开发者终端上的 AI 能力统一中枢控制层（Control Plane）**。加入我们，共同建设这一终极编排护城河！
