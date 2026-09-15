import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatCards from './components/StatCards';
import RiskSection from './components/RiskChart';
import { ProjectModal, ChatbotUI } from './components/OverlayComponents';
import { fetchProjects, sendChatQuery } from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [selectedState, setSelectedState] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatLog, setChatLog] = useState([
    { sender: 'ai', text: 'Hello! Ask me about project expenditure anomalies.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Fetch logic
  useEffect(() => {
    fetchProjects({ state: selectedState }).then((data) => setProjects(data));
  }, [selectedState]);

  // Metrics
  const totalWorks = projects.length;
  const totalSpent = (projects.reduce((acc, curr) => acc + (curr.spent || 0), 0) / 100000).toFixed(1);
  const anomalyCount = projects.filter((p) => p.riskLevel === 'HIGH').length;

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatLog((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    const botReply = await sendChatQuery(userText);
    setChatLog((prev) => [...prev, { sender: 'ai', text: botReply }]);
  };

  const filterSlot = (
    <select
      value={selectedState}
      onChange={(e) => setSelectedState(e.target.value)}
      className="bg-slate-900 border border-slate-700 text-white text-xs rounded p-1.5 outline-none"
    >
      <option value="All">All States</option>
      <option value="Delhi">Delhi</option>
      <option value="Maharashtra">Maharashtra</option>
      <option value="Karnataka">Karnataka</option>
    </select>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 space-y-4">
      <Navbar filterSlot={filterSlot} />
      <StatCards totalWorks={totalWorks} totalSpent={totalSpent} anomalyCount={anomalyCount} />
      <RiskSection topProjects={projects} onInspectProject={(p) => setActiveProject(p)} />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <ChatbotUI 
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        chatLog={chatLog}
        messageInput={chatInput}
        onInputChange={setChatInput}
        onSendMessage={handleChatSend}
      />
    </div>
  );
}