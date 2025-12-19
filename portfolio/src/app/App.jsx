
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/common/Loading";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from '../pages/Projects';
import Contact from "../pages/Contact";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-[#030712] overflow-hidden flex items-center justify-center font-sans">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
