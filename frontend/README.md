# AlgoMentor - DSA AI Instructor (React Frontend)

A modern, high-contrast SaaS dashboard and interactive AI chat interface built for mastering **Data Structures & Algorithms**.

---

## ⚡ Quick Start

```bash
# 1. Navigate into frontend directory
cd frontend

# 2. Start the Vite development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🔌 Connecting Your Express / Node.js Backend

As a full-stack developer, connecting your backend to this frontend is straightforward and requires only **3 simple steps**:

### 1. Enable CORS in your Express Server
In your backend project, install `cors`:
```bash
npm install cors
```

### 2. Create the `/api/chat` Route
In your server file (or wrap your `dsa.js`), listen for `POST /api/chat` receiving `{ ques }`:

```javascript
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();

// Allow requests from React frontend (port 3000)
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const DSA_INSTRUCTOR_PROMPT = `
You are an expert Data Structures and Algorithms (DSA) instructor.
1. ONLY answer questions, concepts, code, and problems related to DSA.
2. Structure your response: Intuition, Step-by-step logic, Code snippet, Time & Space Complexity (Big-O).
`;

// Route called by frontend/src/api/chatService.js
app.post('/api/chat', async (req, res) => {
  try {
    const { ques } = req.body; // <-- 'ques' sent by React frontend
    if (!ques) return res.status(400).json({ error: 'Question required' });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: ques,
      config: { systemInstruction: DSA_INSTRUCTOR_PROMPT }
    });

    // Return 'reply' back to React
    res.json({ reply: response.text });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
```

### 3. Switch Frontend to Live Backend Mode
In `frontend/src/api/chatService.js`:
- Set `useMock: false`, or
- Click the **"Mock Mode"** badge at the top right of the application header to switch live directly in the browser!

---

## 📂 Architecture Overview

```
frontend/
├── src/
│   ├── api/
│   │   └── chatService.js       # Bridge layer: handles POST /api/chat & mock simulation
│   ├── hooks/
│   │   └── useDsaChat.js        # React hook: manages messages, loading, errors, mock toggle
│   ├── context/
│   │   └── ThemeContext.jsx     # Dark/Light mode provider with localStorage persistence
│   ├── data/
│   │   └── dsaData.js           # DSA topics, mastery stats, LeetCode Problem of the Day
│   ├── components/
│   │   ├── Header.jsx           # App logo, glowing badge, search bar, active indicator, theme toggle
│   │   ├── Sidebar.jsx          # Collapsible nav, topic bookmarks, recent chat history
│   │   ├── Dashboard.jsx        # Mastery cards, streak counter, Question of the Day
│   │   ├── ChatInterface.jsx    # Topic context selector, message list, quick prompts, input
│   │   ├── ChatMessage.jsx      # Distinct User vs AI message styling, code & complexity cards
│   │   ├── CodeBlock.jsx        # Formatted syntax block with 1-click "Copy Code"
│   │   ├── BigOCallout.jsx      # Time & Space complexity callout badges
│   │   ├── CodeSnippetModal.jsx # Code attachment modal (Debug, Optimize, Trace)
│   │   └── BackendGuideModal.jsx# Interactive modal with server code & live ping tester
│   ├── App.jsx                  # Main application container
│   ├── index.css                # Tailwind CSS v4 directives & custom scrollbars
│   └── main.jsx                 # Entry point
```
