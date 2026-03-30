import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, InstagramIcon } from "./Icons";

function Hero() {
    const { scrollY } = useScroll();

    /* Name parallax */
    const nameY = useTransform(scrollY, [0, 500], [0, -80]);
    const nameScale = useTransform(scrollY, [0, 500], [1, 0.9]);
    const nameOpacity = useTransform(scrollY, [100, 400], [1, 0]);

    /* Progressive fade */
    const contentOpacity = useTransform(scrollY, [50, 250], [1, 0]);

    return (
        <section className="hero-cinematic" id="hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="hero-sticky-content">
                {/* Name */}
                <motion.h1
                    className="hero-name-large"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ y: nameY, scale: nameScale, opacity: nameOpacity }}
                >
                    SAGAR
                    <br />
                    <span className="hero-name-accent">SHARMA</span>
                </motion.h1>

                <motion.div style={{ opacity: contentOpacity }}>
                    {/* Subtitle */}
                    <motion.h2
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        style={{ marginTop: '1rem' }}
                    >
                        Full Stack Java Developer & AI Explorer
                        <span className="typing-cursor" />
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        I craft beautiful, performant applications with Java, Spring Boot,
                        React & modern cloud-native technologies — from microservices and
                        Docker/Kubernetes to AI-powered solutions.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        className="hero-cta-group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        <a href="#projects" className="btn-primary">
                            View My Work <span>→</span>
                        </a>
                        <a href="#contact" className="btn-secondary">
                            Get In Touch <span>↗</span>
                        </a>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        className="hero-socials"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                    >
                        <a href="https://github.com/Sagar-Sharma19-cmd" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub"><GitHubIcon /></a>
                        <a href="https://www.linkedin.com/in/sagar-sharma-1921-/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn"><LinkedInIcon /></a>
                        <a href="https://leetcode.com/u/Sagar_Sharma_19/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LeetCode"><LeetCodeIcon /></a>
                        <a href="https://www.instagram.com/sagarrrr__19" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="Instagram"><InstagramIcon /></a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="hero-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                Scroll to explore
                <div className="scroll-mouse">
                    <div className="scroll-mouse-dot" />
                </div>
            </motion.div>
        </section>
    );
}

export default Hero;