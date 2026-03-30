import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const education = [
    {
        degree: "Master of Computer Applications (MCA)",
        institution: "PES University, Bangalore",
        period: "2024 — Present",
        status: "Currently Pursuing",
        icon: "🎓",
        highlights: [
            "Advanced Software Engineering & System Design",
            "Cloud Computing & Distributed Systems",
            "Machine Learning & AI Applications",
        ],
    },
    {
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "D.Y. Patil University, Pune",
        period: "2021 — 2024",
        status: "Completed",
        icon: "📜",
        highlights: [
            "Core Java & Object-Oriented Programming",
            "Web Development & Database Management",
            "Data Structures & Algorithms",
        ],
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

export default function Education() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="education" className="section" ref={ref}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="section-label">Education</div>
                <h2 className="section-title">Academic Journey</h2>
                <p className="section-subtitle">
                    Building a strong foundation in computer science — from BCA to MCA,
                    constantly leveling up.
                </p>
            </motion.div>

            <div className="education-timeline">
                {/* Vertical line */}
                <div className="timeline-line" />

                {education.map((edu, i) => (
                    <motion.div
                        key={edu.degree}
                        className="education-card"
                        custom={i}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={fadeUp}
                    >
                        {/* Timeline dot */}
                        <div className={`timeline-dot ${i === 0 ? "active" : ""}`}>
                            <span className="timeline-dot-inner" />
                        </div>

                        <div className="education-card-content">
                            <div className="education-header">
                                <span className="education-icon">{edu.icon}</span>
                                <div>
                                    <span className={`education-status ${i === 0 ? "current" : "done"}`}>
                                        {edu.status}
                                    </span>
                                    <span className="education-period">{edu.period}</span>
                                </div>
                            </div>

                            <h3 className="education-degree">{edu.degree}</h3>
                            <p className="education-institution">{edu.institution}</p>

                            <ul className="education-highlights">
                                {edu.highlights.map((h) => (
                                    <li key={h}>{h}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
