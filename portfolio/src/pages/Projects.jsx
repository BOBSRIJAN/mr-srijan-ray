
import { motion } from "framer-motion";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projects";

const ProjectCard = ({ project, variants }) => {
  const [showMore, setShowMore] = useState(false);
  
  const description = project.description || "";
  const MAX_LENGTH = 400;
  const isLong = description.length > MAX_LENGTH;
  const shortText = description.slice(0, MAX_LENGTH);

  return (
    <motion.div
      variants={variants}
      className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl shadow-black/50 flex flex-col"
    >
      <div className="relative h-52 overflow-hidden bg-slate-900 shrink-0">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/70 backdrop-blur-sm">
          <a
            href={project.githublink}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href={project.deploylink}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="p-8 flex flex-col grow">
        <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>

        <div className="text-gray-200 text-sm mb-6 text-justify grow">
           <p className="inline">
            {showMore || !isLong ? description : `${shortText}...`}
          </p>
          
          {isLong && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="ml-2 text-blue-400 hover:text-blue-300 font-medium text-xs underline decoration-blue-500/30 hover:decoration-blue-500 transition-all cursor-pointer"
            >
              {showMore ? "See Less" : "See More"}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="text-[9px] px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-full text-blue-300 uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.githublink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest mt-auto hover:text-blue-400 transition-colors"
        >
          View Project <ExternalLink size={18} />
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-gray-300 tracking-tighter pt-10 mb-4 uppercase">
            Projects <span className="text-blue-800">Undertaken</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500 italic">No projects found.</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <ProjectCard 
                key={project.projectid} 
                project={project} 
                variants={cardVariants} 
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;