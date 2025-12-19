import { motion } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";
import projects from "../services/projects";

const Projects = () => {
    // Parent container variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="projects" className="relative min-h-screen py-24 px-6 overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                        MY <span className="text-blue-500">PROJECTS</span>
                    </h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-colors duration-500"
                        >
                            {/* Project Image/Thumbnail Area */}
                            <div className="relative h-52 overflow-hidden">
                                <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <img 
                                    src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"} 
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                                {/* Overlay Links */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-slate-900/60 backdrop-blur-sm">
                                    <a href={project.github} className="p-3 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                                        <Github size={20} />
                                    </a>
                                    <a href={project.link} className="p-3 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <Layers size={14} className="text-blue-500" />
                                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Web Application</span>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Tech Stack Badges */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech?.map((t) => (
                                        <span key={t} className="text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 font-medium">
                                            {t}
                                        </span>
                                    )) || ["React", "Tailwind"].map(t => (
                                        <span key={t} className="text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <motion.a
                                    whileHover={{ x: 5 }}
                                    href={project.link}
                                    className="inline-flex items-center gap-2 text-white font-bold text-sm group/link"
                                >
                                    View Project 
                                    <ExternalLink size={16} className="text-blue-500 group-hover/link:translate-x-1 transition-transform" />
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;