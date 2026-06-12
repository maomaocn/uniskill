# Uniskill: Universeller AI Skill Router & Middleware

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> [Zurück zur Startseite](../README.md) | [English](README_EN.md) | [简体中文](README_ZH.md) | [日本語](README_JA.md) | [한국어](README_KO.md)

---

## 🌐 Was ist Uniskill?

Uniskill ist eine plattformübergreifende Multi-Agenten-Middleware-Architektur, die entwickelt wurde, um das Problem der Fragmentierung und der isolierten Konfigurationen in modernen KI-gestützten Entwicklungswerkzeugen (Cursor, Claude Code, OpenClaw, Codex, Hermes, Opencode usw.) zu lösen.

Im aktuellen Ökosystem arbeiten KI-Tools isoliert voneinander. Sie schreiben vielleicht eine perfekte `.cursorrules`-Datei für Cursor, aber die Claude Code CLI in Ihrem Terminal weiß nichts davon. Oder Sie installieren einen leistungsstarken MCP-Server in OpenClaw, doch andere lokale KI-Modelle können nicht darauf zugreifen.

**Uniskill macht dem ein Ende.**
> Installieren oder schreiben Sie einen Skill (Prompt / MCP-Server / natives Plugin) nur **EINMAL**, und das System übersetzt ihn sofort in universell kompatible Formate und bindet ihn transparent in den Kern **ALLER** Ihrer KI-Assistenten ein!

---

### 🔥 Kern-Designphilosophie

- **1️⃣ Single Source of Truth (Einzige Wahrheitsquelle)**: Alle Ihre lokalen KI-Konfigurationswerte werden zentral im Backbone `~/.shared-ai-skills/` gesammelt und gepflegt. Keine Konfiguration geht mehr verloren – wenn Sie das Gerät wechseln, müssen Sie nur dieses eine Verzeichnis synchronisieren.
- **2️⃣ Der Ultimative Übersetzer**: Das Tool abstrahiert automatisch geteilte "Absichten" und verteilt sie über Symlinks. Es schreibt Konfigurationen um: Es generiert dynamisch `.cursorrules` für Cursor oder ändert die `settings.json`, um MCP-Konsolen für Claude einzubinden.
- **3️⃣ Brownfield Migration (Altlasten-Integration)**: Führen Sie `uniskill scan` aus, um die KI-Werte Ihrer gesamten Maschine mit einem Klick abzubilden. Anschließend nutzt `uniskill migrate` diese Daten, um veraltete Legacy-Skill-Pakete, die in alten KI-Tools verstreut sind, automatisch zu extrahieren, zu deduplizieren und zwangsweise in den zentralen Master-Pool zu integrieren.
- **4️⃣ Kompromisslose OS-Agnostik**: Unabhängig von zugrunde liegenden Verzeichnisunterschieden gewährleistet Uniskill durch Nutzung von Symlink-Wrappern oder Path-Environment-Shadowing-Technologien auf macOS, Linux und Windows ein nahtloses Funktionieren.

---

## 🛠️ Schnellstart

### Installation

Uniskill ist als globales Node CLI-Dienstprogramm konzipiert. Eine gültige Node.js-Laufzeitumgebung auf Ihrem System ist erforderlich.

```bash
# Globale NPM-Installation (Bald in der öffentlichen Registry verfügbar)
# npm install -g uniskill 

# Für Quellcode-Tests
git clone git@github.com:maomaocn/uniskill.git
cd uniskill
npm install
npm link
```

### Basisumgebung Initialisieren
Führen Sie bei der ersten Einrichtung eine Profilerstellung Ihrer lokalen Umgebung durch:
```bash
uniskill init
```
*Dieser Vorgang erstellt die Kernordner und richtet die transparenten Abfang-Mount-Punkte ein.*

### Betriebsübersicht
- Die Überschneidung vorhandener KI-Werte auf Ihrer Maschine einsehen: `uniskill scan`
- Legacy-Tool-Skill-Pakete in den globalen Mount-Pool migrieren: `uniskill migrate`
- Universell geteilte Fähigkeiten-Pakete installieren: `uniskill install <Pfad-oder-URL>`

---

## 🔮 Unsere Vision
Die derzeitigen persönlichen KI-Entwicklertools sind in einer fragmentierten Ära gefangen. Das Ziel des Uniskill-Teams geht weit über den Aufbau eines bloßen Konfigurationskopierers hinaus; wir zielen darauf ab, die **Einheitliche KI-Steuerungsebene (Control Plane) für das Entwickler-Terminal** zu etablieren. Wenn Sie die Lösung dieser ultimativen Orchestrierungsarchitektur begeistert, begrüßen wir Ihre PRs oder Issues, um diesen Grabenbruch gemeinsam aufzubauen!
