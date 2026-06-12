# Uniskill: Universal AI Skill Router & Middleware

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> [Back to Home](../README.md) | [简体中文](README_ZH.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | [Deutsch](README_DE.md)

---

## 🌐 What is Uniskill?

Uniskill is a cross-platform, multi-agent middleware architecture designed to solve the fragmentation problem in modern AI-assisted development tools (Cursor, Claude Code, OpenClaw, Codex, Hermes, Opencode, etc.). 

**Uniskill puts an end to this configuration limbo.**
> Install or write a skill (prompt / MCP / script) **ONCE**, and transparently hot-mount it into the core of **ALL** your AI assistants instantaneously.

---

## 🛠️ Deep Dive: Core Commands & Usage

### 1. Install & Init
```bash
npm install -g @robertsshu/uniskill 
uniskill init
```
*(Restart terminal after init to apply the global executable `$PATH` bridge)*

### 2. Installing Skills (`install`)
Route any package instantly to all platforms:
```bash
uniskill install https://clawhub.ai/cnyezi/a-stock-analysis
```

### 3. Absolute Purge (`uninstall`)
AI tools often leave ghost metadata and cache. Provide a brutal, clean sweep of both the source footprint and global wrappers:
```bash
uniskill uninstall a-stock-analysis
```

### 4. Consciousness Merge & Auto-Trigger (`sync-memory`)
Uniskill's killer feature. Run this to align the brains of all local AI tools:
```bash
uniskill sync-memory
```
1. It aggregates behavioral feedback across varying AI agents.
2. It generates **Implicit Auto-Triggers** based on installed skills. Your AI will learn to run local bash tools reflexively in the background without you specifically naming them.

### 5. Next-Gen Editor Binding (`cursor-bind`)
For modern tools like Cursor utilizing directory-based rules (`.mdc`):
```bash
cd your/project/directory
uniskill cursor-bind
```
This forces the Uniskill global memory pool and compiled instructions straight into `.cursor/rules/`, arming the IDE with unified intent matrices instantly.

### 6. Legacy Assets Control (`scan` & `migrate`)
```bash
uniskill scan   # Discover overlapping AI assets in your system
uniskill migrate # Convert legacy/isolated skills into the shared core pool
```

---

Build the **Unified AI Control Plane** with us!
