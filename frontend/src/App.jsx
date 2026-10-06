import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import CheatsheetView from './components/CheatsheetView';
import BackendGuideModal from './components/BackendGuideModal';
import { useDsaChat } from './hooks/useDsaChat';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'chat' | 'topics' | 'cheatsheet'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [searchTerm, setSearchTerm] = useState('');
  const [isBackendGuideOpen, setIsBackendGuideOpen] = useState(false);
  const [prefilledPrompt, setPrefilledPrompt] = useState('');

  const {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    isMock,
    toggleMock
  } = useDsaChat();

  // Handler for quick actions from Dashboard or Cheatsheet to jump straight to chat
  const handleStartChatWithPrompt = (promptText, topic = null) => {
    if (topic) {
      setSelectedTopic(topic);
    }
    setPrefilledPrompt(promptText);
    setActiveTab('chat');
  };

  const handleSelectRecentChat = (recentSession) => {
    if (recentSession.topic) {
      setSelectedTopic(recentSession.topic);
    }
    setPrefilledPrompt(recentSession.title + ': ' + recentSession.preview);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#08080A] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white dark:selection:bg-white/20 dark:selection:text-white">
      {/* Top Navigation Bar */}
      <Header
        onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        onOpenBackendGuide={() => setIsBackendGuideOpen(true)}
        isMock={isMock}
        onToggleMock={toggleMock}
        onSelectTopic={() => {
          setSelectedTopic('All Topics');
          setActiveTab('dashboard');
        }}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          onSelectRecentChat={handleSelectRecentChat}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' || activeTab === 'topics' ? (
            <Dashboard
              onStartChatWithPrompt={handleStartChatWithPrompt}
              onSelectTopic={(topicName) => {
                setSelectedTopic(topicName);
                setActiveTab('chat');
              }}
              searchTerm={searchTerm}
            />
          ) : activeTab === 'chat' ? (
            <ChatInterface
              messages={messages}
              isLoading={isLoading}
              onSendMessage={sendMessage}
              onClearChat={clearMessages}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              prefilledPrompt={prefilledPrompt}
              onClearPrefilledPrompt={() => setPrefilledPrompt('')}
            />
          ) : activeTab === 'cheatsheet' ? (
            <CheatsheetView
              onAskAi={(prompt) => handleStartChatWithPrompt(prompt, 'Sorting & Searching')}
            />
          ) : null}
        </main>
      </div>

      {/* Backend Integration Guide Modal */}
      <BackendGuideModal
        isOpen={isBackendGuideOpen}
        onClose={() => setIsBackendGuideOpen(false)}
        isMock={isMock}
        onToggleMock={toggleMock}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
