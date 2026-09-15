import React from 'react';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-4 rounded-xl text-white max-w-sm w-full space-y-2 border border-slate-700">
        <h3 className="font-bold">{project.title}</h3>
        <p className="text-xs text-rose-400">Anomaly Reason: {project.anomalyReason}</p>
        <button onClick={onClose} className="bg-slate-700 px-3 py-1 rounded text-xs text-white">Close</button>
      </div>
    </div>
  );
};

export const ChatbotUI = ({ isOpen, onToggle, chatLog, messageInput, onInputChange, onSendMessage }) => {
  return (
    <div className="fixed bottom-4 right-4 text-white">
      {!isOpen ? (
        <button onClick={onToggle} className="bg-indigo-600 px-4 py-2 rounded-full text-xs font-bold shadow-lg">
          💬 Open Copilot
        </button>
      ) : (
        /* The width has been enlarged to w-[420px] and height to h-[550px] here */
        <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl w-[420px] h-[550px] flex flex-col justify-between text-sm shadow-2xl">
          <div className="flex justify-between font-bold border-b border-slate-700 pb-2">
            <span className="text-base">AI Copilot</span>
            <button onClick={onToggle} className="text-slate-400 hover:text-white text-base">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto my-3 space-y-2 pr-1">
            {chatLog.map((m, i) => (
              <div key={i} className={m.sender === 'user' ? 'text-right text-indigo-300' : 'text-left text-slate-300'}>
                <span className={`inline-block p-2 rounded-lg text-xs ${m.sender === 'user' ? 'bg-indigo-600/30' : 'bg-slate-900'}`}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2 border-t border-slate-700">
            <input 
              value={messageInput} 
              onChange={(e) => onInputChange(e.target.value)} 
              className="bg-slate-900 p-2 flex-1 text-white text-xs rounded border border-slate-700 outline-none" 
              placeholder="Ask query..."
            />
            <button onClick={onSendMessage} className="bg-indigo-600 px-3 py-2 rounded text-white text-xs font-medium hover:bg-indigo-500">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};