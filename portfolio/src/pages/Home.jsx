
import { FaGithub, FaLinkedin, FaFacebook, FaDiscord, FaDownload } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center font-sans">
      <section className="relative z-10 w-full max-w-7xl px-6 py-12 pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl py-20 md:py-32 px-8 md:px-16 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <motion.span variants={itemVariants} className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
                Available for Work
              </motion.span>
              <motion.h1 variants={itemVariants} className="text-3xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-500">
                  <Typewriter
                    words={["Hi, I’m Srijan Ray", "Full-Stack Developer", "Designing Systems"]}
                    loop={Infinity}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
                I’m a Passionate Developer Creating <span className="text-white font-medium"> Innovative Solutions </span> With Love ❤️
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
                <Link to="/projects" className="px-8 py-4 bg-blue-600/80 text-white rounded-xl font-bold hover:bg-blue-700 hover:-translate-y-2 transition-all shadow-lg shadow-blue-600/25 active:scale-95">
                  View My Work
                </Link>
                <a
                  href="/MYCV.pdf"
                  download="Srijan_Ray_Resume.pdf"
                  className="px-8 py-4 bg-pink-600/80 text-white rounded-xl font-bold hover:bg-pink-700 hover:-translate-y-2 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                  Download CV <FaDownload />
                </a>

              </motion.div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
              <SocialIcon href="https://github.com/BOBSRIJAN" icon={<FaGithub />} color="hover:text-white" />
              <SocialIcon href="https://www.linkedin.com/in/srijan-ray-5b1967282/" icon={<FaLinkedin />} color="hover:text-blue-400" />
              <SocialIcon href="https://www.facebook.com/srijan.ray.33" icon={<FaFacebook />} color="hover:text-blue-400" />
              <SocialIcon href="https://discord.com/users/srijan_ray" icon={<FaDiscord />} color="hover:text-indigo-400" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: [0, -15, 0]
              }}
              transition={{
                opacity: { duration: 1 },
                scale: { duration: 1 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-gray-900 rounded-2xl p-2 border border-white/10">
                <img src="/img_srijan.jpg" alt="Srijan Ray" className="w-58 md:w-94 h-auto rounded-xl object-cover transition-all duration-500" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function SocialIcon({ href, icon, color }) {
  return (
    <motion.a whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }} href={href} target="_blank" rel="noreferrer" className={`text-2xl text-gray-500 transition-all duration-300 ${color}`}>
      {icon}
    </motion.a>
  );
}

export default Home;