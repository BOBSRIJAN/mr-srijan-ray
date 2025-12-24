import React from "react";
import { ExternalLink, Edit3, Trash2 } from "lucide-react";

export default function ProjectRow({ data, onEdit, onDelete }) {
    return (
        <div className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.07] hover:border-blue-500/30 transition-all">
            <div className="grow">
                <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{data.name}</h4>
                    {data.deploylink && (
                        <a href={data.deploylink} target="_blank" rel="noreferrer" className="text-blue-500/50 hover:text-blue-400">
                            <ExternalLink size={14} />
                        </a>
                    )}
                </div>
                <p className="text-sm text-slate-400 line-clamp-1 mb-3">{data.description}</p>
                <div className="flex flex-wrap gap-2">
                    {(data.techstack || []).map((t, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 bg-black/20 rounded-md border border-white/5 text-slate-400 font-medium tracking-wide">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 md:pl-6 md:border-l border-white/5 self-end md:self-center">
                <button onClick={onEdit} className="p-2.5 bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-xl transition-all">
                    <Edit3 size={18} />
                </button>
                <button onClick={onDelete} className="p-2.5 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl transition-all">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}