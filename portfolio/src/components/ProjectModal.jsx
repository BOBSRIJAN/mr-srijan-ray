import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Save, X, Github, Globe } from "lucide-react";
import InputGroup from "./InputGroup";
import { ENDPOINTS } from "../services/apiEndpoints";

export default function ProjectModal({ project, onClose, onRefresh }) {
  const [formData, setFormData] = useState(
    project || {
      projectid: Math.floor(Math.random() * 10000).toString(),
      name: "",
      description: "",
      techstack: [],
      githublink: "",
      deploylink: "",
    }
  );
  const [techInput, setTechInput] = useState(project ? (project.techstack || []).join(", ") : "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (project) setFormData(project);
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      techstack: techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const isEdit = Boolean(project);

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? ENDPOINTS.UPDATE_PROJECT
      : ENDPOINTS.ADD_PROJECT;

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-slate-900 border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
          <h3 className="text-xl font-bold text-white">{project ? "Edit Project" : "New Project"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-5">
            <InputGroup label="Project ID" value={formData.projectid} onChange={(v) => setFormData({ ...formData, projectid: v })} disabled={!!project} />
            <InputGroup label="Project Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Tech Stack (Comma separated)</label>
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:outline-none text-white placeholder-slate-600" placeholder="React, Node, MongoDB..." />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Description</label>
            <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:outline-none text-white resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <InputGroup label="Github Link" icon={<Github size={14} />} value={formData.githublink} onChange={(v) => setFormData({ ...formData, githublink: v })} />
            <InputGroup label="Deploy Link" icon={<Globe size={14} />} value={formData.deploylink} onChange={(v) => setFormData({ ...formData, deploylink: v })} />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-400 hover:bg-white/5 transition-colors">Cancel</button>
            <button disabled={isLoading} type="submit" className="px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : <><Save size={16} /> Save Changes</>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}