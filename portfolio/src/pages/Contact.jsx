
import { Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

function Contact() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center pt-32 pb-16 font-sans overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]" />
                <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 12, repeat: Infinity }} className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]" />
            </div>
            <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10 w-full max-w-6xl px-6">
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                        LET'S <span className="text-blue-500">CONNECT</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        Have a project in mind or just want to say hi? My inbox is always open.
                        I'm currently looking for new opportunities.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
                        <ContactCard icon={<Mail className="text-blue-400" />} title="Email Me" value="srijanray11@gmail.com" subtext="Direct response within 24h" />
                        <ContactCard icon={<MessageSquare className="text-indigo-400" />} title="Social Media" subtext="Active on LinkedIn & Instagram" action={
                            <div className="flex gap-3 mt-3">
                                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://linkedin.com/in/srijan-ray-5b1967282" target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    LinkedIn
                                </motion.a>
                                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://instagram.com/s_r_i_j_a_n.r_a_y" target="_blank" rel="noreferrer" className="px-4 py-2 bg-pink-600/20 border border-pink-500/30 rounded-xl text-pink-400 text-xs font-bold hover:bg-pink-600 hover:text-white transition-all duration-300">
                                    Instagram
                                </motion.a>
                            </div>} />
                        <ContactCard icon={<MapPin className="text-purple-400" />} title="Location" value="kolkata, West Bengal, India" subtext="Available for remote work"/>
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />
                        <form className="relative z-10 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Full Name</label>
                                    <input type="text" placeholder="Srijan Ray" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"/>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Email Address</label>
                                    <input type="email" placeholder="srijan@example.com" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Your Message</label>
                                <textarea rows="5" placeholder="I'd love to talk about..." className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 resize-none"></textarea>
                            </div>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-sm rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-xl shadow-blue-600/20">
                                Send Message <Send size={18} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}

function ContactCard({ icon, title, value, subtext, action }) {
    return (
        <motion.div
            whileHover={{ x: 10 }}
            className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-4xl group hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-xl">
            <div className="p-4 bg-slate-900 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-300">
                {icon}
            </div>
            <div className="flex-1">
                <h4 className="text-blue-500 text-[10px] uppercase tracking-[0.2em] font-black mb-1">{title}</h4>
                {value && <p className="text-white font-bold text-lg tracking-tight">{value}</p>}
                {action && action}
                <p className="text-gray-500 text-xs mt-1 font-medium italic">{subtext}</p>
            </div>
        </motion.div>
    );
}

export default Contact;