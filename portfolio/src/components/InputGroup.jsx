import React from "react";
export default function InputGroup({ label, value, onChange, type = "text", disabled = false, icon }) {
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2">
                {icon && <span className="text-slate-500">{icon}</span>}
                <label className="text-xs font-bold uppercase text-slate-500">{label}</label>
            </div>
            <input
                type={type}
                required
                disabled={disabled}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:outline-none text-white ${disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            />
        </div>
    );
}