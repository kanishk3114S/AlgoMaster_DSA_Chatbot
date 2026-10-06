import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
import 'dotenv/config';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const DSA_INSTRUCTOR_PROMPT = `
You are an expert Data Structures and Algorithms (DSA) instructor.

Your Rules:
1. ONLY answer questions, concepts, code, and problems related to Data Structures and Algorithms (e.g., Arrays, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming, Big-O Complexity, LeetCode/GFG problems).
2. If a user asks a question NOT related to DSA (e.g., general advice, web development, history, non-coding trivia), politely decline and remind them that you can only assist with DSA topics.
3. When explaining a concept or solving a problem, structure your response as follows:
   - Intuition & High-level approach
   - Step-by-step logic
   - Code snippet (with clean comments)
   - Time & Space Complexity analysis (Big-O)
`;

export async function chattingFn(ques) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: ques, // Pass the text prompt directly without array tracking
      config: {
        systemInstruction: DSA_INSTRUCTOR_PROMPT,
      },
    });
    return response.text
  } catch (error) {
    console.error("\n[!] Error:", error.message, "\n");
    throw error;
  }
}

async function main() {
  console.log("=== DSA Instructor (Stateless Mode) ===\n(Type 'exit' to quit)\n");

  while (true) {
    const ques = readlineSync.question("Ask a DSA Question -> ");
    if (ques.trim().toLowerCase() === "exit") break;
    if (!ques.trim()) continue;

    await chattingFn(ques);
  }
}

// await main(); exporting the chattingFn to the server will automatically call the main()

