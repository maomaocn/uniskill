# Uniskill: Universal AI Skill Router & Middleware

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> [Back to Home](../README.md) | [简体中文](README_ZH.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | [Deutsch](README_DE.md)

---

## 🌐 What is Uniskill?

Uniskill is a cross-platform, multi-agent middleware architecture designed to solve the fragmentation problem and configuration silos in modern AI-assisted development tools (Cursor, Claude Code, OpenClaw, Codex, Hermes, Opencode, etc.).

In the current ecosystem, AI tools operate in isolation. You might write a perfect `.cursorrules` file for Cursor, but the Claude Code CLI in your terminal remains oblivious to it. Or you might install a powerful MCP server in OpenClaw, yet other local Language Models can't access it.

**Uniskill puts an end to this.**
> Install or write a skill (prompt / MCP server / native plugin) just **ONCE**, and the system will instantaneously translate it into universally compatible formats and transparently hot-mount it into the core of **ALL** your AI assistants under your command!

---

### 🔥 Core Design Philosophies

- **1️⃣ Single Source of Truth**: All your local AI configuration assets will be converged and maintained centrally in the `~/.shared-ai-skills/` backbone. Never lose a configuration again—syncing this single directory handles it all when you switch devices.
- **2️⃣ The Ultimate Translator**: The tool automatically abstracts shared "intents" and distributes them via symlinks. It rewrites configs: dynamically generating `.cursorrules` for Cursor, or modifying `settings.json` to mount MCP consoles for Claude.
- **3️⃣ Brownfield Migration**: Run `uniskill scan` to map out your entire machine's AI assets with one click. Follow it up with `uniskill migrate` to automatically extract, deduplicate, and forcefully assimilate outdated legacy skill packages scattered across older AI tools into the centralized master pool.
- **4️⃣ OS Agnosticism Without Compromise**: Regardless of underlying directory differences, Uniskill ensures robust and silent overlaps utilizing Symlink wrappers or Path environment shadowing technologies on macOS, Linux, and Windows.

---

## 🛠️ Quick Start

### Installation

Uniskill is engineered as a global Node CLI utility. A valid Node.js runtime environment on your system is required.

```bash
# Global NPM Installation (Soon available to public Registry)
# npm install -g @robertsshu/uniskill 

# For source-code testing
git clone git@github.com:maomaocn/uniskill.git
cd uniskill
npm install
npm link
```

### Base Environment Initialization
For first-time setup, instruct the router probes to profile your local machine's environment:
```bash
uniskill init
```
*This maneuver creates the core repository folders and establishes the transparent interception mounts.*

### Operational Overview
- Map the overlap of existing AI assets across your machine: `uniskill scan`
- Forcefully mobilize legacy tool skill-packs into the global mount pool: `uniskill migrate`
- Install universally shared capability packages: `uniskill install <path-or-URL>`

---

## 🔮 Our Vision
Current personal AI developer tools are trapped in a "warring states" era of fragmentation. The Uniskill team’s goal transcends building a mere configuration replicator; we aim to establish the **Unified AI Control Plane for the Developer's Terminal**. If resolving the ultimate orchestration architecture excites you, we welcome your PRs or Issues to collaboratively construct this moat together!
