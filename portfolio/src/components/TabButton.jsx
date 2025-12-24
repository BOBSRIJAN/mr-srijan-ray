import React from "react";
export default function TabButton({ active, onClick, icon, label }) {
    return (<button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}> {icon} {label} </button>);
}