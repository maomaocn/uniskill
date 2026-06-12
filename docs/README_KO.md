# Uniskill: 범용 AI 스킬 라우터 및 미들웨어

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> [홈으로 돌아가기](../README.md) | [English](README_EN.md) | [简体中文](README_ZH.md) | [日本語](README_JA.md) | [Deutsch](README_DE.md)

---

## 🌐 Uniskill이란?

Uniskill은 현대 AI 지원 개발 도구(Cursor, Claude Code, OpenClaw, Codex, Hermes, Opencode 등)의 생태계 파편화 및 설정 고립 문제를 해결하기 위해 설계된 크로스 플랫폼, 멀티 에이전트 미들웨어 아키텍처입니다.

현재의 환경에서 AI 도구들은 서로 독립적으로 작동합니다. Cursor를 위해 완벽한 `.cursorrules` 파일을 작성하더라도, 터미널의 Claude Code는 이를 전혀 인식하지 못합니다. 혹은 OpenClaw에 강력한 MCP 서버를 설치해도, 다른 로컬 AI 모델은 이를 공유할 수 없습니다.

**Uniskill은 이 모든 것을 끝냅니다.**
> 스킬(프롬프트 / MCP 서버 / 네이티브 플러그인)을 단 **한 번만** 설치하거나 작성하세요. 시스템이 즉각적으로 모든 호환 형식으로 변환하고, 귀하가 사용하는 **모든** AI 어시스턴트의 코어에 투명하게 핫 마운트(hot-mount)합니다!

---

### 🔥 핵심 설계 철학

- **1️⃣ 단일 진실 공급원 (Single Source of Truth)**: 모든 로컬 AI 설정 자산은 `~/.shared-ai-skills/` 백본에 중앙 집중화되어 유지됩니다. 더 이상 설정이 유실되지 않으며, 기기를 변경할 때 이 디렉터리 하나만 동기화하면 됩니다.
- **2️⃣ 궁극의 번역기 (The Ultimate Translator)**: 도구는 공유된 "의도"를 자동으로 포맷팅하여 심볼릭 링크를 통해 배포합니다. Cursor를 위한 `.cursorrules`를 동적으로 생성하거나, Claude를 위해 MCP 콘솔을 마운트하도록 `settings.json`을 재작성합니다.
- **3️⃣ 레거시 자산 통합 (Brownfield Migration)**: `uniskill scan`을 실행하여 원클릭으로 시스템 전체의 AI 자산을 매핑합니다. 이어서 `uniskill migrate`를 실행하면, 구형 AI 도구에 흩어져 있는 레거시 스킬 패키지를 고유의 중앙 풀로 자동 추출, 중복 제거 및 강제 통합합니다.
- **4️⃣ 완벽한 OS 호환성**: 기본 디렉터리 구조의 차이를 걱정할 필요가 없습니다. macOS, Linux, Windows 환경 모두에서 Symlink 래퍼 또는 Path 환경 변수 섀도잉 기술을 사용하여 오버랩을 견고하게 처리합니다.

---

## 🛠️ 빠른 시작

### 설치

Uniskill은 글로벌 Node CLI 유틸리티로 설계되었습니다. 시스템에 Node.js 런타임 환경이 설치되어 있어야 합니다.

```bash
# 글로벌 NPM 설치 (곧 공개 Registry에 등록 예정)
# npm install -g @maomaocn/uniskill 

# 소스코드 테스트용 설치
git clone git@github.com:maomaocn/uniskill.git
cd uniskill
npm install
npm link
```

### 기본 환경 초기화
처음 사용하는 경우, 라우터가 로컬 환경을 프로파일링하도록 지시하세요:
```bash
uniskill init
```
*이 작업은 핵심 폴더를 생성하고 투명한 인터셉션 마운트 포인트를 설정합니다.*

### 사용 방법 요약
- 컴퓨터의 기존 AI 자산 겹침 스캔: `uniskill scan`
- 구형 도구의 스킬을 공통 마운트 풀로 강제 마이그레이션: `uniskill migrate`
- 범용 스킬 패키지 설치: `uniskill install <경로 또는 URL>`

---

## 🔮 우리의 비전
현재의 개인 AI 개발 도구는 파편화된 "춘추전국시대"에 갇혀 있습니다. Uniskill 팀의 목표는 단순한 설정 복사기를 만드는 것을 넘어섰습니다. 우리는 **개발자 터미널을 위한 통합 AI 컨트롤 플레인(Control Plane)** 을 구축하고자 합니다. 이 궁극적인 오케스트레이션 아키텍처를 해결하는 데 관심이 있다면, PR이나 Issue를 통해 이 생태계를 함께 구축해 나가는 것을 환영합니다!
