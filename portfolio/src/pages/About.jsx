
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Code2, Cpu, Database, Rocket, Download, Terminal } from "lucide-react";

function About() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - rect.left / rect.width - 0.5);
    y.set(e.clientY / rect.height - rect.top / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative min-h-screen text-white pt-24 pb-20 font-sans selection:bg-blue-700/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>
      <section className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-5 pt-10 lg:sticky lg:top-32 h-fit space-y-10">
          <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative group w-fit mx-auto lg:mx-0">
            <div className="absolute -inset-4 bg-linear-to-tr from-blue-600/30 via-purple-500/30 to-cyan-400/30 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div style={{ transform: "translateZ(50px)" }} className="relative bg-slate-900/90 backdrop-blur-xl rounded-4xl p-3 border border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent z-10 pointer-events-none" />
              <motion.img src="/img_srijan2.jpg" alt="Srijan Ray" className="w-full max-w-96 lg:max-w-180 h-auto rounded-2xl transition-all duration-700" style={{ transform: "translateZ(30px)" }} />
              <div style={{ transform: "translateZ(70px)" }} className="absolute bottom-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-white text-[10px] font-bold tracking-widest uppercase">SRIJAN RAY</span>
              </div>
            </div>
          </motion.div>
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl lg:text-2xl font-black tracking-tighter">
              ABOUT <span className="text-blue-500">ME</span>
            </h2>
            <p className="text-gray-100 text-lg leading-relaxed max-w-md font-light lg:text-justify mx-auto lg:mx-0">
              I am a BCA student with a strong understanding of programming, software development,
              and database management. I love solving real-world problems using technology and creating efficient,
              scalable solutions. Currently, I’m seeking an entry-level role or internship to apply my knowledge,
              contribute to innovative projects, and continue growing as a passionate IT professional.
            </p>

<div className="flex flex-wrap justify-center lg:justify-start gap-3 max-w-2xl mx-auto lg:mx-0">
  {[
    'Python', 'Django', 'FastAPI', 'Java', 'C', 'JavaScript', // Fixed typo here
    'React', 'TailwindCss', 'HTML', 'CSS', 'MongoDB', 'MySQL', 
    'Kafka', 'Data Structures', 'DBMS', 'Git', 'GitHub', 'Docker', 'Postman'
  ].map((tech, index) => (
    <motion.div
      key={tech}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      {/* The "Glow" background */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>

      {/* The Badge */}
      <div className="relative px-6 py-3 bg-slate-900 rounded-lg leading-none flex items-center">
        <span className="text-slate-200 group-hover:text-white transition duration-200 font-semibold">
          {tech}
        </span>
      </div>
    </motion.div>
  ))}
</div>

            <div className="pt-4">
              <a href="/MYCV.pdf" download="Srijan_Ray_Resume.pdf" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-300 text-black rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg">
                Download CV <Download size={18} />
              </a>
            </div>
          </div>
        </motion.div>
        <div className="lg:col-span-7 space-y-12 pt-18">
          <div className="pl-6 border-l border-white/10 space-y-12">
            <JourneyCard icon={<Code2 />} title="My Journey Began in Class 11 as a Computer Applications Student" year="2021" desc="I learned the fundamentals of computers, how they function, and explored several computer applications." />
            <JourneyCard icon={<Rocket />} title="Starting with HTML & CSS to Build a Website UI" year="2022" desc="I learned HTML for structuring web pages and CSS for styling layouts and visuals, building simple and responsive websites while following semantic and clean coding practices." />
            <JourneyCard icon={<Database />} title="Journey Start's as a Engineering Student at IEM" year="2023" desc="Began my learning journey with C programming, Digital Electronics, and Computer Architecture, building a strong foundation in core engineering concepts." />
            <JourneyCard icon={<Terminal />} title="Expanding Knowledge in Core Computer Science Subjects" year="2024" desc="Started learning Python and Java, along with fundamental concepts of Data Structures, DBMS, and Operating Systems, strengthening problem-solving and programming skills." />
            <JourneyCard icon={<Cpu />} title="Transition into Full-Stack Development" year="2025" desc="Built end-to-end web applications using Python (Django, FastAPI) for scalable backends, React and modern frontend technologies for dynamic user interfaces, and deployed projects on multiple hosting platforms." />
          </div>
        </div>
      </section>
    </div>
  );
}

function JourneyCard({ icon, title, year, desc }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-12 group">
      <div className="-left-1.25 absolute top-2 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)] z-10" />
      <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 hover:border-blue-500/30 transition-all duration-500">
        <div className="flex items-center gap-3 mb-4 text-blue-500">
          {icon}
          <span className="text-blue-500/60 text-xs font-bold tracking-widest uppercase">{year}</span>
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-200 font-light leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default About;