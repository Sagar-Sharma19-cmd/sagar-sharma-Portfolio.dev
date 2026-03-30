import React from "react";
import { motion } from "framer-motion";

const cards = [
  {
    icon: "☕",
    title: "Java & Spring Ecosystem",
    text: "Deep expertise in Java, Spring Boot, Spring MVC, Spring Security, Spring AI, Hibernate, and JPA — building robust, scalable enterprise services.",
  },
  {
    icon: "⚛️",
    title: "Frontend Mastery",
    text: "Crafting responsive, pixel-perfect interfaces with React, JavaScript, HTML5, and CSS3 — delivering delightful user experiences across all devices.",
  },
  {
    icon: "🐳",
    title: "DevOps & Cloud Native",
    text: "Containerizing with Docker, orchestrating with Kubernetes, building microservices architectures — modern cloud-native development from the ground up.",
  },
  {
    icon: "🧠",
    title: "AI & Innovation",
    text: "Exploring machine learning, computer vision with OpenCV, NLP, and Spring AI — integrating intelligence into every application I build.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Who I Am</div>
        <h2 className="section-title">
          Passionate. Curious. Builder.
        </h2>
        <p className="section-subtitle">
          I'm a Full Stack Java Developer who believes code is the most
          powerful creative medium of our time. From Spring Boot microservices
          to Kubernetes deployments to React frontends — I build it all.
        </p>
      </motion.div>

      <div className="about-grid">
        {/* Feature card with stats */}
        <motion.div
          className="about-card about-card-featured"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div>
            <span className="about-card-icon">💻</span>
            <h3 className="about-card-title">Building the Future, One Line at a Time</h3>
            <p className="about-card-text">
              From architecting Spring Boot microservices and RESTful APIs to
              containerizing with Docker, orchestrating on Kubernetes, and
              crafting pixel-perfect React UIs — I bring full-stack mastery
              with a Java-first approach that ensures enterprise-grade
              reliability.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">17+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Curiosity</div>
            </div>
          </div>
        </motion.div>

        {/* Smaller cards */}
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="about-card"
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="about-card-icon">{card.icon}</span>
            <h3 className="about-card-title">{card.title}</h3>
            <p className="about-card-text">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
