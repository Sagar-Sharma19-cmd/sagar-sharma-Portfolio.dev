import React from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

function Projects() {
  return (
    <section id="projects" className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Selected Work</div>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A selection of projects that showcase my passion for building
          meaningful digital experiences with modern technology.
        </p>
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
          >
            <span className="project-number">
              Project {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="project-title">{project.title}</h3>

            <p className="project-desc">{project.description}</p>

            <div className="project-tech">
              {project.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            <a href={project.link || "#"} className="project-link">
              View Project{" "}
              <span className="project-link-arrow">→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;