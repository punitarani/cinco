# Cinco — Project Specification & Developer Blueprint

This document is the developer-facing spec for **Cinco** (local-first desktop denials co-pilot). It covers functionality, data model, high-level architecture, data flows, core prompts, UI flows, and a 24-hour build plan.

> Built on top of: https://github.com/pickle-com/glass — use Glass for the translucent overlay / always-on UI components.

---

# Goals & Scope (MVP)

**Primary goal:** deliver a working desktop app (Electron + React) that demonstrates:

1. Local Patient Registry with encrypted storage and document ingestion (OCR).
2. A translucent Meeting Assistant that transcribes audio and offers consent-first retrieval of patient data.
3. Claims Copilot that generates RAG-enabled appeal drafts with explicit provenance and an approval workflow.

Keep scope narrow: no real PHI, no live payer submissions, minimal integrations (local).

---

# High-level architecture

```

\[Mic/System Audio]            \[User Files: PDFs, Images]
\|                                 |
STT (local)                      OCR (tesseract)
\|                                 |
Transcript stream  <----->  Local Vector Store (FAISS)
\|                           ^
v                           |
Conversation Analyzer  ---->  Retrieval (RAG)
\|                           |
v                           |
Prompt Engine (local LLM) ------- Outputs (drafts, scripts)
\|                           |
v                           v
Frontend (Electron + React)  <->  Encrypted DB (SQLCipher)
|
v
Export / PDF / ZIP

```

Components:

- **Renderer (Electron + React):** UI, translucent assistant overlay, claim/registry screens.
- **Main process (Electron):** orchestrates audio capture, local model processes, file IO, encryption.
- **Local Python worker (optional):** hosts STT & OCR helpers (or spawn native binaries).
- **Local LLM runtime:** Ollama / llama.cpp / other quantized runtime. If not available, stub with a deterministic template engine.
- **VectorStore:** FAISS or in-memory ANN with embeddings from LLM or local encoder.
- **Encrypted local DB:** SQLite + SQLCipher for metadata and metadata-indexed content. BLOBs in an encrypted folder.

---

# Data model (simplified schema)

- `Patient`: id, display_name, dob, tags
- `Document`: id, patient_id, claim_id, path, type, ocr_text, created_at
- `Claim`: id, patient_id, payer, dos, cpt_codes, icd_codes, amount, denial_code, status
- `Transcript`: id, patient_id (nullable), session_id, raw_text, highlights
- `AppealDraft`: id, claim_id, generated_text, source_refs (array), confidence, approved_by
- `PayerSnippet`: id, payer_id, text, tags
- `AuditLog`: id, timestamp, user_id, action_type, metadata

Notes:

- OCR text is searchable but stored encrypted.
- `source_refs` is a list of tuples: (snippet_id | document_id, passage_text, vector_score)

---

# Data flow (detailed)

1. **Document ingestion**
    - User drags a PDF into the claim record.
    - App runs OCR (tesseract) locally -> stores `Document` and `ocr_text`.
    - Basic field extraction (regex): payer, claim id, dos — populate `Claim` or suggest mapping.

2. **Meeting capture**
    - User opens Meeting Assistant -> starts STT (local Whisper).
    - Live transcript streamed to the Conversation Analyzer: NER & intent classifier (local LLM prompt) identifies payer questions or requests.
    - On trigger (e.g., "what were the dates of service?"), assistant surfaces a consent button labeled “Fetch patient data”.
    - If user clicks consent: Retrieval module searches vector DB (policy snippets + docs) and constructs a suggested reply (not auto-sent).
    - All actions written to `AuditLog` with timestamps and user IDs.

3. **RAG-based draft generation**
    - On “Generate Appeal”: system collects:
        - Claim metadata
        - Relevant documents and transcript passages (from timestamp ranges)
        - Payer snippets that match (top-K from vector store)
    - Compose prompt for LLM with explicit instructions:
        - Produce a short summary, drafted appeal, list attachments, confidence, and `source_refs`.
    - LLM returns text + marker tokens indicating which snippet IDs support which paragraph (enforced in prompt).
    - Save `AppealDraft` and show UI for review.

4. **Approval & Export**
    - Reviewer edits draft if needed, clicks Approve.
    - System generates PDF and ZIP containing: approved letter, referenced docs, OCR extracts, and `AuditLog` export.
    - (In production, this package would be used to submit to payer portals — stubbed here.)

---

# UX / UI detailed flows

### A. Patient Registry (UI)

- Left column: patient list & quick filters.
- Middle: timeline + claims list for selected patient.
- Right: selected document viewer or claim details.
- Actions: `New Claim`, `Attach Document`, `Generate Appeal`, `Start Meeting`.

### B. Meeting Assistant (overlay)

- Minimal transparent bubble with:
    - Red/green recording status
    - Live one-line transcript + expand to full panel
    - Suggestion bubble (single-line) when assistant detects a question or action item
- When a suggestion is actionable (requires PHI access), show a consent modal:
    - Shows exactly what will be shared (snippet preview)
    - One-click Approve / Deny
    - If approved, assistant copies snippet to clipboard & inserts into transcript buffer (only on user prompt)
- After session, session card saved in `Transcripts` with highlights & key moments.

### C. Claims Copilot

- From Claim: click `Generate Appeal` → stepper modal:
    1. Confirm claim + payer
    2. Select appeal reason template (medical necessity, coding, missing modifier)
    3. Generate (progress: retrieves docs + snippets)
    4. Review & Edit (shows source refs)
    5. Approve & Export

---

# Prompting & RAG rules (must-haves)

- **RAG enforcement:** every factual statement about payer policy must reference a `snippet_id`. If model cannot find supporting snippet, it must output `INSUFFICIENT_SOURCE` and stop.
- **Human-in-loop:** never auto-send; user must approve every outgoing artifact.

Starter prompts (trim/paste into prompt templates):

**Classification / Triage prompt (short):**

```

System: You are a claims triage assistant. Given a transcript excerpt and claim metadata, classify denial reason into one of: \[medical\_necessity, coding\_error, missing\_info, duplicate, bundled\_service, other]. Provide a short rationale (1-2 lines).
User: {transcript\_excerpt}
Claim: {claim\_json}
Return JSON: { "classification": "...", "rationale": "..." }

```

**Appeal drafting prompt (with RAG):**

```

System: You are a conservative appeals assistant. Use only the provided sources. For any claim about payer policy, include a "source\_refs" entry mapping paragraph->source\_id. If no source supports a claim, write "INSUFFICIENT\_SOURCE".

User: Claim: {claim\_json}
Sources: \[{id:1, text: "..."}, {id:2, text: "..."}]
Task: produce

1. 2-line reviewer summary
2. 350-500 word appeal letter (professional tone)
3. checklist of attachments
4. confidence\_score (0-100)
5. source\_refs: \[{"paragraph\_index"\:X, "source\_id"\:Y, "quote":"..."}]

```

---

# Local ML & vector store implementation notes

- **Embeddings:** if local encoder available, generate embeddings; else use a small sentence-transformers local model. Store vectors in FAISS.
- **Top-K retrieval:** default K=5; re-rank by token overlap & timestamp proximity for transcripts.
- **LLM runtime:** aim for Ollama or llama.cpp if you have a quantized model available. If none available, fallback to a deterministic template engine for the hackathon demo.

---

# Storage & encryption details

- **DB:** SQLite + SQLCipher — metadata & indexes.
- **Blobs:** encrypted file store (AES-256-GCM). Files referenced by DB.
- **Keys:** derive from user passphrase on first run (PBKDF2) and store in OS keychain for convenience.
- **AuditLog:** append-only JSONL file in encrypted store.

---

# Audit & provenance

For every generated artifact, store:

- Input bundle (claim metadata, snippet IDs, transcript passages)
- LLM prompt used
- LLM response
- User edits & final approved text
- Approver id + timestamp
  This enables reproducibility and post-hoc review.
