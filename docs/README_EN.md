# Uniskill: Universal AI Skill Router & Middleware

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> [Back to Home](../README.md) | [简体中文](README_ZH.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | [Deutsch](README_DE.md)

---

## 🌐 What is Uniskill?

Uniskill is a cross-platform, multi-agent middleware architecture designed to solve the fragmentation problem in modern AI-assisted development tools (Cursor, Claude Code, OpenClaw, Codex, Hermes, Opencode, etc.). 

**Uniskill puts an end to this configuration limbo.**
> Install or write a skill (prompt / MCP server / native python script) just **ONCE**, and the system will instantaneously translate it into universally compatible formats and transparently hot-mount it into the core of **ALL** your AI assistants under your command!

---

### 🔥 What's New & Core Philosophies

- **1️⃣ Single Source of Truth**: All configuration assets converged centrally in `~/.shared-ai-skills/`.
- **2️⃣ The Deep Executable Wrapper (v0.3)**: Uniskill dives into foreign packages, extracts standalone `.py` or `.js` executables, and automatically binds them to your OS environment's global `$PATH` as ghost commands, equipping all AI clients with true execution impact.
- **3️⃣ Cross-Agent Memory Sync Engine (v0.3.5)**: Uniskill not only syncs feedback and habits across AIs, it extracts **Implicit Trigger Rules** based on installed skills. Eventually, if you just lazily say "check the stock market", your AI's *Unified Muscle Memory* will implicitly spin up your local analyzer command in the background natively without you naming the tool.
- **4️⃣ Complete Purge Matrix**: A highly aggressive universal `uniskill uninstall` logic ensuring pure cleanups from Ghost JSON configs and Deep symlinks. 
- **5️⃣ Next-Gen Mounter**: Support via `uniskill cursor-bind` to quickly mesh the latest `.mdc` file formats for advanced Cursor implementations.

---

## 🛠️ Quick Start

```bash
# Global NPM Installation
npm install -g @robertsshu/uniskill 
```

### Initial Configuration
```bash
uniskill init
```
*Creates the foundation matrix. Restart your terminal so the cross-OS path injection succeeds!*

### Main Commands
- Map overlapping legacies across your machine: `uniskill scan`
- Forcefully mobilize legacy tool packages: `uniskill migrate`
- Install universally shared capability packages: `uniskill install <path-or-URL>`
- Sync memories + Autonomy rules: `uniskill sync-memory`
- Complete removal tracking: `uniskill uninstall <name>`

Let's build the **Unified AI Control Plane for the Developer's Terminal** together!
