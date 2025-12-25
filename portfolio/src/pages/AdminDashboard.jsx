
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, MessageSquare, LogOut, Plus, ArrowLeft, LayoutGrid, Trash2, Mail, User, Calendar } from "lucide-react";
import ProjectRow from "../components/ProjectRow";
import ProjectModal from "../components/ProjectModal";
import { ENDPOINTS } from "../services/apiEndpoints";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [currentView, setCurrentView] = useState("home");
  
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { user, logout } = useAuth();

  useEffect(() => {
    let mounted = true;

    fetch(ENDPOINTS.GET_PROJECTS, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setProjects(Array.isArray(data) ? data : data.projects || []);
      })
      .catch((err) => console.error("Error loading projects:", err));

    fetch(ENDPOINTS.GET_CONTACT_MESSAGE, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setMessages(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error loading messages:", err));

    return () => (mounted = false);
  }, [refreshTrigger]);

  const handleDeleteProject = async (project) => {
    try {
      await fetch(ENDPOINTS.DELETE_PROJECT, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(project),
      });
      setRefreshTrigger((p) => p + 1);
    } catch {
      alert("Failed to delete project");
    }
  };

  const handleDeleteMessage = async (msg) => {
    try {
      const res = await fetch(ENDPOINTS.DELETE_CONTACT_MESSAGE, {
        method: "DELETE", 
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(msg),
      });

      if (res.ok) {
        setRefreshTrigger((p) => p + 1);
      } else {
        alert("Server returned an error deleting the message.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete message");
    }
  };

  const HomeView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10"
    >
      <DashboardCard
        title="Manage Projects"
        subtitle="Add, edit, or remove portfolio projrcts"
        icon={<Briefcase size={32} />}
        color="bg-blue-600"
        onClick={() => setCurrentView("projects")}
        count={projects.length}
      />
      <DashboardCard
        title="Inbox"
        subtitle="Read and delete the contact messages"
        icon={<MessageSquare size={32} />}
        color="bg-purple-600"
        onClick={() => setCurrentView("messages")}
        count={messages.length} 
      />
    </motion.div>
  );

  const ProjectsView = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="max-w-5xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Project List</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-800 text-white rounded-xl font-bold text-sm"
        >
          <Plus size={18} /> Add New
        </motion.button>
      </div>

      <div className="space-y-4 pb-20">
        {projects.map((proj, idx) => (
          <ProjectRow
            key={proj.projectid || idx}
            data={proj}
            onEdit={() => {
              setEditingProject(proj);
              setIsModalOpen(true);
            }}
            onDelete={() => handleDeleteProject(proj)}
          />
        ))}

        {projects.length === 0 && (
          <div className="text-center p-10 bg-white/5 rounded-2xl border border-white/5 text-slate-500">
            No projects found.
          </div>
        )}
      </div>
    </motion.div>
  );

  const MessagesView = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="max-w-5xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Inbox</h2>
        <span className="text-slate-400 text-sm font-medium bg-white/5 px-3 py-1 rounded-full border border-white/10">
          {messages.length} Messages
        </span>
      </div>

      <div className="space-y-4 pb-20">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <motion.div
              key={msg.userid || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative p-6 bg-slate-900/50 hover:bg-slate-800/50 backdrop-blur-md border border-white/5 rounded-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-purple-500/30 transition-colors pointer-events-none" />
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex items-center gap-4 min-w-50">
                  <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">{msg.fullname}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <Mail size={12} />
                      <span className="truncate max-w-37.5">{msg.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-black/20 p-4 rounded-xl border border-white/5 md:mx-4 w-full">
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteMessage(msg)}
                  className="p-3 text-slate-500 hover:text-red-400 bg-white/5 rounded-xl border border-white/5 transition-colors self-end md:self-center"
                  title="Delete Message"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-32 bg-white/5 rounded-3xl border border-white/5 text-slate-500">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-bold text-slate-300">Inbox Empty</h3>
            <p className="text-sm">No new messages received.</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-34 text-slate-200">
      <header className="fixed top-24 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.div
          layout
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto flex items-center gap-4 px-4 py-2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-black/50">
          <AnimatePresence mode="popLayout">
            {currentView !== "home" && (
              <motion.button
                key="back-button"
                initial={{ scale: 0, opacity: 0, width: 0 }}
                animate={{ scale: 1, opacity: 1, width: "auto" }}
                exit={{ scale: 0, opacity: 0, width: 0 }}
                onClick={() => setCurrentView("home")}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/5 mr-1">
                <ArrowLeft size={18} />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 px-2">
            <div className="p-1.5 bg-blue-500/20 rounded-lg">
              <LayoutGrid size={16} className="text-blue-500" />
            </div>
            <div className="flex flex-col min-w-20">
              <h1 className="text-xs font-black tracking-tight text-white leading-none">
                ADMIN
              </h1>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentView}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[9px] text-blue-400 font-bold uppercase tracking-widest mt-0.5">
                  {currentView === "home" ? "Dashboard" : currentView}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="h-6 w-px bg-white/10 mx-1" />
          <div className="flex items-center gap-2 pr-2">
            <span className="text-[11px] font-semibold text-slate-400 max-w-15 truncate hidden sm:block">
              {user?.split(" ")[0] || "Admin"}
            </span>
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
              title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </motion.div>
      </header>

      <main className="p-6 md:p-10">
        <AnimatePresence mode="wait">
          {currentView === "home" && <HomeView />}
          {currentView === "projects" && <ProjectsView />}
          {currentView === "messages" && <MessagesView />}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal
            project={editingProject}
            onClose={() => {
              setIsModalOpen(false);
              setEditingProject(null);
            }}
            onRefresh={() => setRefreshTrigger((p) => p + 1)}/>
        )}
      </AnimatePresence>
    </div>
  );
}

function DashboardCard({ title, subtitle, icon, color, onClick, count }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-4xl bg-slate-900/40 p-1 transition-all duration-500">
      <div className={`absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br ${color.replace('bg-', 'from-')}/50 via-transparent to-transparent`} />
      <div className="relative h-full w-full rounded-[1.9rem] bg-slate-950/90 p-8 backdrop-blur-xl border border-white/5 shadow-2xl">
        <div className={`absolute -top-20 -right-20 h-64 w-64 rounded-full ${color} opacity-[0.03] blur-[80px] group-hover:opacity-[0.08] transition-opacity duration-500`} />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-10">
            <div className={`relative p-4 rounded-2xl overflow-hidden`}>
              <div className={`absolute inset-0 ${color} opacity-20`} />
              <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(icon, { size: 28, strokeWidth: 1.5 })}
              </div>
            </div>

            <div className="text-right">
              <span className="block text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">Status</span>
              <div className={`text-2xl font-mono font-bold ${count > 0 ? 'text-blue-400' : 'text-slate-600'}`}>
                {count > 0 ? (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {count.toString().padStart(2, "0")}
                  </motion.span>
                ) : "OFF"}
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
              {title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-50 opacity-70 group-hover:opacity-100 transition-opacity">
              {subtitle}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-1 w-4 rounded-full ${color} opacity-20 group-hover:opacity-60 transition-opacity`} style={{ transitionDelay: `${i * 100}ms` }} />
              ))}
            </div>
            <div className="text-[10px] font-bold text-slate-600 group-hover:text-blue-500/50 uppercase tracking-widest transition-colors">
              Access System
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}