import { useState, useCallback, useEffect } from 'react';
import { sendDsaQuery, isMockModeActive, setUseMockMode, API_CONFIG } from '../api/chatService';

const INITIAL_MESSAGES = [
  {
    id: 'welcome-msg',
    sender: 'ai',
    text: `### Algorithmic Evaluation Engine Active

AlgoMentor specializes in formal **Data Structures & Algorithms**, technical interview invariants, and rigorous Big-O asymptotic proofs.

Core capabilities:
- Deconstruct complex algorithmic patterns (Graph Flows, Segment Trees, Interval DP)
- Trace state transitions, invariants, and edge conditions
- Provide production-grade reference implementations with minimal overhead
- Derive formal Time & Auxiliary Space bounds

Select a prompt below or submit an algorithmic problem or code snippet to initiate evaluation.`,
    time: 'Now',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
  }
];

export function useDsaChat() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('algomentor_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_MESSAGES;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMock, setIsMock] = useState(isMockModeActive());

  // Save messages to localStorage for persistence
  useEffect(() => {
    try {
      localStorage.setItem('algomentor_chat_history', JSON.stringify(messages));
    } catch (err) {
      console.warn('Failed to save chat to localStorage:', err);
    }
  }, [messages]);

  const toggleMock = useCallback((enabled) => {
    setUseMockMode(enabled);
    setIsMock(enabled);
  }, []);

  const sendMessage = useCallback(async (ques, topicContext = 'General DSA') => {
    if (!ques || !ques.trim()) return;

    const trimmedQues = ques.trim();
    const userMessageId = `user-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message immediately
    const userMsg = {
      id: userMessageId,
      sender: 'user',
      text: trimmedQues,
      time: timestamp,
      topic: topicContext
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      // Call service layer
      const aiResponse = await sendDsaQuery(trimmedQues, topicContext);

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponse.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeComplexity: aiResponse.timeComplexity,
        spaceComplexity: aiResponse.spaceComplexity,
        topic: topicContext
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error generating AI response:', err);
      setError(err.message || 'Failed to fetch AI response');

      // Append an informative error message in the chat
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          isError: true,
          text: `⚠️ **Error connecting to DSA Instructor:**\n\n${err.message}\n\n*Tip: If you haven't started your Express backend yet, switch to **Mock Mode** using the pill at the top right to explore all features with simulated responses.*`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setError(null);
    localStorage.removeItem('algomentor_chat_history');
  }, []);

  return {
    messages,
    isLoading,
    error,
    isMock,
    toggleMock,
    backendUrl: API_CONFIG.BACKEND_URL,
    sendMessage,
    clearMessages,
  };
}
