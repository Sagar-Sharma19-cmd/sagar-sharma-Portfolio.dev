import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Terminal from "./components/Terminal";
import TypingChallenge from "./components/TypingChallenge";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  /* Always start from the top */
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ pointerEvents: loading ? "none" : "auto" }}
      >
        <AnimatedBackground />
        <CustomCursor />
        <Navbar />
        <Hero />
        <div style={{ position: "relative", zIndex: 1 }}>
          <hr className="section-divider" />
          <About />
          <hr className="section-divider" />
          <Education />
          <hr className="section-divider" />
          <Skills />
          <hr className="section-divider" />
          <Projects />
          <hr className="section-divider" />
          <Terminal />
          <hr className="section-divider" />
          <TypingChallenge />
          <hr className="section-divider" />
          <Contact />
          <hr className="section-divider" />
          <Footer />
        </div>
      </motion.div>
    </div>
  );
}

export default App;