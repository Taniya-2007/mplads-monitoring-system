import React from 'react';

export default function Navbar({ filterSlot }) {
  return (
    <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center text-white">
      <h1 className="font-bold text-lg">MPLADS Fraud Monitor</h1>
      <div>{filterSlot}</div>
    </div>
  );
}
