import React from 'react';

export default function StatCards({ totalWorks, totalSpent, anomalyCount }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl text-white space-y-1 border border-slate-700">
      <p className="font-bold text-indigo-400">Project Telemetry Metrics</p>
      <p className="text-sm">Total Works: {totalWorks} | Expenditure: ₹{totalSpent}L | Flagged Anomalies: {anomalyCount}</p>
    </div>
  );
} 