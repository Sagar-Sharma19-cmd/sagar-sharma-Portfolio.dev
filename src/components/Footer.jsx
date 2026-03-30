import React from "react";
import Logo from "./Logo";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, InstagramIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#hero" className="footer-logo" aria-label="Home">
          <Logo size={28} />
          <span className="navbar-logo-text">Sagar</span>
        </a>
        <div className="footer-social">
          <a
            href="https://github.com/Sagar-Sharma19-cmd"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/sagar-sharma-1921-/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://leetcode.com/u/Sagar_Sharma_19/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="LeetCode"
          >
            <LeetCodeIcon />
          </a>
          <a
            href="https://www.instagram.com/sagarrrr__19"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="mailto:contact.sagarsharma19@gmail.com"
            className="footer-social-link"
            aria-label="Email"
          >
            ✉
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} Sagar Sharma. Crafted with ☕ and passion.
        </div>
        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
