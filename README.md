# Cinco — medical insurance claims co-pilot for triage, meetings, and appeals

<p align="center">
  <img src="./public/assets/cinco-banner.gif" alt="Cinco Banner" />
</p>

**Cinco** is a local-first desktop app that helps provider billing teams and patient advocates capture meetings, organize patient/claim data, and rapidly draft auditable, evidence-backed appeal materials — all while keeping data on-device.

Think of it as Glass-style translucent AI for denials: always available during conversations, but consent-first and human-in-the-loop. Built on top of Pickle Glass (translucent desktop UI) and optimized for a hackathon MVP where everything runs locally.

---

## What, Why, Who (short)

- **What:** A desktop app with 3 core features:
    1. **Patient Registry** — local store of patient profiles, claims, docs, transcripts.
    2. **Meeting Assistant** — translucent always-on transcript & consent-first retrieval during calls/meetings.
    3. **Claims Copilot** — RAG-enabled drafts (appeals, emails, peer-to-peer scripts) with source provenance and human approval.
- **Why:** Claims denials are costly & time-consuming. A local co-pilot speeds triage, improves appeal quality, and preserves an auditable trail without exposing PHI in the cloud (for the demo).
- **Who (MVP users):** small clinic billing teams, patient advocates, solo billing specialists, or hackathon judges.

---

## Quick Start (Local Build)

### Prerequisites

- Node.js **20.x.x** (recommended: nvm install 20)
- Python 3.10+ (for local STT/ML glue)
- Git
- Optional for local models:
    - [Ollama] or local LLM runtime (if you plan to run a quantized LLM locally)
    - Local STT (Whisper/whisper.cpp) binaries (we ship integration; model download is separate)
- macOS / Windows supported (Windows is beta — follow platform prompts in setup)

Check Node:

```bash
node --version
# => v20.x.x
```
````

### Install & setup

```bash
# clone the repo
git clone <your-repo-url> cinco
cd cinco

# top-level setup (installs node modules & python libs, downloads dev models stubs)
npm run setup
```

`npm run setup` will:

- install frontend packages
- install backend python venv & python deps (for local STT + helpers)
- create an encrypted local DB scaffold (no data)
- drop example synthetic dataset into `./sample_data/` (optional)

### Run (development)

```bash
# Start the desktop app in dev mode
npm run dev
# or to start only the renderer (useful when iterating on UI)
npm run dev:renderer
```

### Build (production)

```bash
# macOS
npm run build:mac

# Windows
npm run build:win
```

---

## Where to put API keys & model choices

Cinco runs locally by default. You can optionally use cloud LLM/STT providers (for experimentation) — configure them in `./config/.env.local`:

```
# .env.local (example)
OPENAI_API_KEY=
OLLAMA_HOST=localhost:11434
USE_LOCAL_STT=true
```

**Recommendation for hackathon:** run with local LLM + local STT. If you must test cloud LLMs, do so only with synthetic data.

---

## Main features (quick overview)

### Patient Registry

- Create patient profiles, add claims, attach documents (PDF, images), and view a timeline of events.
- Document OCR (Tesseract) creates searchable text.
- Local encrypted storage (SQLCipher) — everything stays on-device.

### Meeting Assistant

- Transcribes mic & optional system audio in real-time.
- Translucent, always-on widget (like Glass) with live transcript and key-moment highlights.
- Contextual suggestion bubble: assistant detects questions and offers retrieval options (consent required before any patient data is used).
- Audit log records every `'fetch'` or `'share'` action.

### Claims Copilot

- One-click “Generate Appeal” from a claim.
- RAG-based generation using local policy snippets + claim docs.
- Output: summary, appeal letter draft with source IDs, checklist of attachments, confidence score.
- Human-in-the-loop approval → export PDF + submission package.

---

## Data & Security

- **Local-only by default:** DB + blobs stored encrypted (SQLCipher + AES-256). Keys stored in OS keychain.
- **Audit log:** append-only log of generated drafts, approvals, and consent events.
- **Consent-first:** assistant will never auto-insert patient data without explicit user consent.
- **Demo constraint:** **Never** run the demo with real PHI unless you have BAAs and a hardened deployment. Use the provided synthetic samples.

---

## Keyboard Shortcuts

- `Ctrl/Cmd + \` — toggle main window
- `Ctrl/Cmd + Enter` — ask assistant using all previous screen/audio context
- `Ctrl/Cmd + Arrow` — move overlay position
- `Ctrl/Cmd + R` — start/stop recording session

---

## Demo scenarios (suggested)

1. **Coding fix** — drag EOB PDF → Cinco extracts denial code → generate appeal to correct missing modifier → export package.
2. **Medical necessity** — start Meeting Assistant, play synthetic payer call audio, accept assistant suggestion to fetch past imaging notes, approve snippet to share, generate peer-to-peer script and draft appeal.

---

## Contributing & Roadmap

Contributions welcome! See `CONTRIBUTING.md` for details. Planned next steps:

- Add payer portal adapters (stubbed in hackathon).
- Integrate stronger on-device LLMs & model selection UI.
- Pilot with a small clinic using hardened security & BAAs.

---

## A note on PHI & production

This repo is **for development and demo only**. Before using real PHI in production:

- Put BAAs in place with any third-party vendor used for STT/LLM/telephony.
- Implement enterprise-grade key management and endpoint security.
- Maintain a human-in-the-loop gating and audit process.

---

## License & Credits

Cinco is a fork of Pickle Glass and incorporates their translucent UI approach. See `LICENSE` for details and upstream credits.

Built with ❤️ for the hackathon. Want the project spec and developer roadmap? Check `PROJECT.md`.
