import { FaGithub, FaLinkedin, FaFacebook, FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Social Icons */}
          <div className="flex space-x-6 text-xl">
            <FooterIcon
              href="https://github.com/BOBSRIJAN"
              icon={<FaGithub />}
              label="GitHub"
              hoverColor="hover:text-white"
            />
            <FooterIcon
              href="https://linkedin.com/in/srijan-ray-5b1967282"
              icon={<FaLinkedin />}
              label="LinkedIn"
              hoverColor="hover:text-blue-400"
            />
            <FooterIcon
              href="https://www.facebook.com/srijan.ray.33"
              icon={<FaFacebook />}
              label="Facebook"
              hoverColor="hover:text-blue-500"
            />
            <FooterIcon
              href="https://discord.com/users/srijan_ray"
              icon={<FaDiscord />}
              label="Discord"
              hoverColor="hover:text-indigo-400"
            />
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm tracking-wide text-center md:text-right">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">SRIJAN RAY</span>. Built with Passion.
          </p>

        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <span className="hover:text-blue-400 transition">Design</span>
          <span className="hover:text-blue-400 transition">Development</span>
          <span className="hover:text-blue-400 transition">Portfolio</span>
        </div>
        </div>
      </div>
    </footer>
  );
}

function FooterIcon({ href, icon, hoverColor, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`text-gray-400 transition-transform duration-300 hover:scale-110 ${hoverColor}`}
    >
      {icon}
    </a>
  );
}

export default Footer;
