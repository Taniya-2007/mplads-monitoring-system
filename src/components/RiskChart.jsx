import React from 'react';

export default function RiskSection({ topProjects = [], onInspectProject }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl text-white border border-slate-700 space-y-2">
      <p className="font-bold text-indigo-400">Top Risky Projects</p>
      {topProjects.map((proj) => (
        <div key={proj.id} className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded">
          <span>{proj.title} ({proj.riskLevel})</span>
          <button 
            onClick={() => onInspectProject(proj)} 
            className="bg-indigo-600 px-2 py-1 rounded text-white"
          >
            Inspect
          </button>
        </div>
      ))}
    </div>
  );
} 