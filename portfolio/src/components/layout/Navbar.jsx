import { useState } from 'react';
import { Home, User, FolderKanban, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <div className="w-full max-w-4xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl shadow-slate-900/20 px-8 py-4 backdrop-blur-sm border border-slate-700/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-r from-blue-500/70 to-purple-600/20 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <span className="text-white font-bold text-lg">SR</span>
                        </div>
                        <div className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            SRIJAN RAY
                        </div>
                    </div>

                    <ul className="hidden md:flex items-center gap-2">
                        <li>
                            <button className="px-5 py-2 text-slate-300 font-medium rounded-xl hover:bg-slate-700/50 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                                <Link to="/">Home</Link>
                            </button>
                        </li>
                        <li>
                            <button className="px-5 py-2 text-slate-300 font-medium rounded-xl hover:bg-slate-700/50 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                                <Link to="/about">About</Link>
                            </button>
                        </li>
                        <li>
                            <button className="px-5 py-2 text-slate-300 font-medium rounded-xl hover:bg-slate-700/50 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                                <Link to="/projects">Project's</Link>
                            </button>
                        </li>
                        <li>
                            <button className="px-5 py-2 text-slate-300 font-medium rounded-xl hover:bg-slate-700/50 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                                <Link to="/contact">Contact</Link>
                            </button>
                        </li>
                    </ul>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-slate-300 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden mt-6 grid grid-cols-2 gap-3 px-2">
                        <MobileNavLink to="/" icon={<Home size={22} />} label="Home" delay="0" />
                        <MobileNavLink to="/about" icon={<User size={22} />} label="About" delay="100" />
                        <MobileNavLink to="/projects" icon={<FolderKanban size={22} />} label="Projects" delay="200" />
                        <MobileNavLink to="/contact" icon={<Mail size={22} />} label="Contact" delay="300" />
                    </div>
                )}
            </div>
        </nav>
    );
}

function MobileNavLink({ to, icon, label }) {
    return (
        <Link
            to={to}
            className="flex flex-col items-center justify-center gap-3 p-5 
                 bg-white/5 border border-white/10 backdrop-blur-md 
                 rounded-2xl text-slate-300 hover:text-white 
                 hover:bg-blue-600/20 hover:border-blue-500/50 
                 transition-all duration-300 active:scale-95 group"
        >
            <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                {icon}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
        </Link>
    );
}

export default Navbar;