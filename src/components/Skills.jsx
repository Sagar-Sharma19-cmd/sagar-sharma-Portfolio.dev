import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    category: "Backend & Java",
    color: "#f97316",
    skills: [
      { name: "Java", icon: "☕", level: 90, label: "Advanced" },
      { name: "Spring Boot", icon: "🍃", level: 85, label: "Advanced" },
      { name: "Spring Security", icon: "🔒", level: 75, label: "Intermediate" },
      { name: "Spring AI", icon: "🤖", level: 65, label: "Growing" },
      { name: "Hibernate / JPA", icon: "📦", level: 78, label: "Advanced" },
      { name: "Microservices", icon: "🔗", level: 72, label: "Intermediate" },
    ],
  },
  {
    category: "Frontend",
    color: "#2997ff",
    skills: [
      { name: "React", icon: "⚛️", level: 85, label: "Advanced" },
      { name: "JavaScript", icon: "⚡", level: 88, label: "Advanced" },
      { name: "HTML5 / CSS3", icon: "🎨", level: 90, label: "Advanced" },
      { name: "Node.js", icon: "🟢", level: 75, label: "Intermediate" },
    ],
  },
  {
    category: "DevOps & Cloud",
    color: "#a855f7",
    skills: [
      { name: "Docker", icon: "🐳", level: 70, label: "Intermediate" },
      { name: "Kubernetes", icon: "☸️", level: 60, label: "Learning" },
      { name: "Git / GitHub", icon: "🔀", level: 85, label: "Advanced" },
    ],
  },
  {
    category: "Database & AI",
    color: "#34d399",
    skills: [
      { name: "MySQL", icon: "🗄️", level: 80, label: "Advanced" },
      { name: "MongoDB", icon: "🌿", level: 70, label: "Intermediate" },
      { name: "Python", icon: "🐍", level: 80, label: "Advanced" },
      { name: "Machine Learning", icon: "🧠", level: 65, label: "Growing" },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

function SkillCard({ skill, index, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", x + "%");
    e.currentTarget.style.setProperty("--mouse-y", y + "%");
  };

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      onMouseMove={handleMouse}
    >
      <span className="skill-icon">{skill.icon}</span>
      <div className="skill-name">{skill.name}</div>
      <div className="skill-level">{skill.label}</div>
      <div className="skill-bar-outer">
        <motion.div
          className="skill-bar-inner"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: skill.level + "%" } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.3 + index * 0.06,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </motion.div>
  );
}

function Skills() {
  let globalIndex = 0;

  return (
    <section id="skills" className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Expertise</div>
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle">
          My Full Stack Java toolkit — from Spring Boot microservices to React
          frontends, DevOps, and AI/ML exploration.
        </p>
      </motion.div>

      {skillCategories.map((cat) => (
        <div key={cat.category} className="skill-category">
          <motion.div
            className="skill-category-header"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="skill-category-dot"
              style={{ background: cat.color }}
            />
            <span className="skill-category-name">{cat.category}</span>
          </motion.div>
          <div className="skills-grid">
            {cat.skills.map((skill) => {
              const idx = globalIndex++;
              return (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  index={idx}
                  color={cat.color}
                />
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Skills;