<div align="center">

# 🏛️ AlgoMentor (AlgoMaster)
### *The Executive Algorithmic Instructor & Asymptotic Complexity Engine*

[![React](https://img.shields.io/badge/React-19.x-09090B?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-09090B?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v22-09090B?style=for-the-badge&logo=node.js&logoColor=5FA04E)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-09090B?style=for-the-badge&logo=express&logoColor=FFFFFF)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.5_Flash-09090B?style=for-the-badge&logo=google&logoColor=EA4335)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-09090B?style=for-the-badge)](LICENSE)

<br/>

**AlgoMentor** is an ultra-premium, full-stack AI instructor designed for software engineers mastering Data Structures & Algorithms, interview problem patterns, and rigorous Big-O asymptotic proofs.

Built with an **industrial minimalist & royal luxury aesthetic**, avoiding generic AI gamer tropes in favor of razor-thin hairline borders, editorial typography, and high-contrast palettes.

[Features](#-key-features) • [Architecture](#-architecture) • [Getting Started](#-quick-start) • [API Contract](#-api-specification) • [Theme Design](#-design-system)

</div>

---

## ✨ Key Features

- **🏛️ Dual Royal Theme Palette**:
  - **Royal Obsidian (Dark)**: Deep Onyx (`#08080A`) canvas with obsidian charcoal surfaces (`#121215`), hairline borders (`border-white/10`), and platinum silver typography.
  - **Executive Alabaster (Light)**: Warm chalk white (`#FAFAFA`) with pure ivory cards and midnight ink typography.
- **💬 Editorial AI Chatbot**:
  - Contextual topic filtering (*Dynamic Programming, Graphs, Trees, Arrays*).
  - High-contrast code blocks with syntax styling, line numbers, and 1-click clipboard copy.
  - Asymptotic Complexity Callout Badges ($O(N)$ Time / $O(1)$ Space).
  - Quick-prompt suggestion chips for instant algorithmic inquiries.
- **📊 Algorithmic Mastery Dashboard**:
  - Typography-first metric cards (*Mastery Index, Consecutive Days Streak, Problems Solved, AI Deep Consultations*).
  - Topic Curricula breakdown with monochrome hairline progress meters.
  - Featured **Daily Challenge Card** (*e.g., LeetCode #42 Trapping Rain Water*) with instant 1-click **"Solve with AI"** integration.
- **📐 Asymptotic Complexity Matrix**:
  - Interactive reference table comparing Average Time, Worst-case Time, and Auxiliary Space bounds across core algorithms and data structures.
  - Direct *"Proof"* button triggering AI mathematical derivations.
- **🔌 Seamless Pipeline Switcher**:
  - In-browser toggle between **Mock Mode** (instant offline testing) and **Live Express Service**.
  - Built-in connection tester to ping your backend in real-time.

---

## 🏛️ Architecture

```
                    ┌────────────────────────────────────────┐
                    │      React 19 + Tailwind CSS v4        │
                    │       (Port 3000 • Vite Engine)        │
                    └───────────────────┬────────────────────┘
                                        │
                         HTTP POST /api/chat  { query }
                                        │
                                        ▼
                    ┌────────────────────────────────────────┐
                    │          Express 5.x Backend           │
                    │       (Port 5000 • CORS Enabled)       │
                    └───────────────────┬────────────────────┘
                                        │
                              chattingFn(query)
                                        │
                                        ▼
                    ┌────────────────────────────────────────┐
                    │      Google Gemini 3.5 Flash SDK       │
                    │     (@google/genai • DSA System)       │
                    └───────────────────┬────────────────────┘
                                        │
                             Structured Markdown
                          + Time/Space Big-O Bounds
                                        │
                                        ▼
                    ┌────────────────────────────────────────┐
                    │      Executive Client Rendering        │
                    │   (CodeBlock • BigOCallout • UI)       │
                    └────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/kanishk3114S/AlgoMaster_DSA_Chatbot.git
cd AlgoMaster_DSA_Chatbot
```

---

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your Gemini API Key inside `.env`:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
```

> **Note:** `.env` is safeguarded in `.gitignore` and will never be pushed to your repository.

---

### 3. Backend Setup

Install backend dependencies and launch the server:

```bash
# Install root dependencies
npm install

# Start the Express server
npm start
# or start with auto-restart on edit:
npm run dev
```

Server output:
```bash
🚀 AlgoMentor Backend running at http://localhost:5000
```

---

### 4. Frontend Setup

Open a second terminal, install frontend dependencies, and launch Vite:

```bash
cd frontend
npm install
npm run dev
```

Navigate to **`http://localhost:3000`** in your browser.

---

## 🔌 API Specification

### `POST /api/chat`

Processes an algorithmic problem statement or code snippet and returns a structured pedagogical decomposition.

#### Request Headers
```http
Content-Type: application/json
```

#### Request Body
```json
{
  "query": "Explain Floyd's Cycle-Finding Algorithm with proof and code",
  "topic": "Linked Lists"
}
```

#### Response (`200 OK`)
```json
{
  "reply": "### 1. Intuition & High-Level Approach\nFloyd's algorithm uses two pointers (slow and fast) moving at different velocities...\n\n### 2. Invariant & Proof\n...\n\n### 3. Implementation\n```javascript\nfunction detectCycle(head) { ... }\n```\n\n### Complexity Analysis\n- Time Complexity: O(N)\n- Space Complexity: O(1)"
}
```

---

## 🎨 Design System

| Attribute | Dark Mode ("Royal Obsidian") | Light Mode ("Executive Alabaster") |
| :--- | :--- | :--- |
| **Primary Background** | `#08080A` (`bg-zinc-950`) | `#FAFAFA` (`bg-stone-50`) |
| **Card / Surface** | `#121215` (`bg-zinc-900/40`) | `#FFFFFF` (Pure Crisp Ivory) |
| **Borders** | Razor-thin Hairlines (`border-white/10`) | Delicate Zinc (`border-zinc-200`) |
| **Headings & Body** | `#FAFAFA` / `#A1A1AA` | `#09090B` / `#71717A` |
| **Accents** | Platinum Silver / Subtle Champagne Gold | Polished Onyx / Deep Charcoal |
| **Code Surfaces** | `#0A0A0C` (Dark in both modes) | `#0A0A0C` (Dark in both modes) |

---

## 📂 Project Structure

```
AlgoMaster_DSA_Chatbot/
├── .env                  # Private secrets (ignored by Git)
├── .env.example          # Public environment template
├── .gitignore            # Secret & build artifact shields
├── dsa.js                # Gemini SDK client & DSA system prompt
├── dsa.routes.js         # Express route handlers (/api/chat)
├── server.js             # Express server entry point & CORS configuration
├── package.json          # Backend dependencies & scripts
│
└── frontend/             # React application (Vite + Tailwind v4)
    ├── index.html        # App entry & JetBrains Mono font imports
    ├── vite.config.js    # Vite configuration (port 3000)
    └── src/
        ├── api/          # chatService.js (API bridge & mock engine)
        ├── components/   # Header, Sidebar, Dashboard, ChatInterface, CodeBlock, etc.
        ├── context/      # ThemeContext.jsx (Dark/Light mode persistence)
        ├── data/         # dsaData.js (Curricula, stats, question of the day)
        ├── hooks/        # useDsaChat.js (Chat state & connection hook)
        ├── App.jsx       # Root layout & view controller
        └── index.css     # Tailwind v4 configuration
```

---

## 🛡️ Security & Quality Standards

- **Zero Hardcoded Secrets**: All AI credentials dynamically parsed through `dotenv`.
- **CORS Restricted**: Controlled communication strictly permitted between client and server ports.
- **Strict Invariant Guardrails**: System instructions enforce DSA-only query handling.
- **Fail-Safe Fallback**: Instant toggle to local simulator if offline or testing without cloud credentials.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
<sub>Crafted with precision for technical interview excellence.</sub>
</div>
