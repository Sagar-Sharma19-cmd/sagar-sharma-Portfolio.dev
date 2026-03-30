import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitHubIcon,
  LinkedInIcon,
  LeetCodeIcon,
  InstagramIcon,
  EmailIcon,
  PhoneIcon,
} from "./Icons";
import { supabase } from "../supabaseClient";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }
        ]);

      if (error) throw error;

      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error("Error sending message:", error.message);
      alert("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Get In Touch</div>
        <h2 className="section-title">Let's Build Something Amazing</h2>
        <p className="section-subtitle">
          Have an exciting project in mind or want to collaborate? I'd love to
          hear from you. Let's create something extraordinary together.
        </p>
      </motion.div>

      <motion.div
        className="contact-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Left — Contact info cards */}
        <div className="contact-info">
          <a
            href="mailto:contact.sagarsharma19@gmail.com"
            className="contact-card"
          >
            <div className="contact-card-icon">
              <EmailIcon style={{ width: 20, height: 20, fill: "#2997ff" }} />
            </div>
            <div>
              <div className="contact-card-label">Email</div>
              <div className="contact-card-value">
                contact.sagarsharma19@gmail.com
              </div>
            </div>
          </a>

          <a href="tel:+918275926376" className="contact-card">
            <div className="contact-card-icon">
              <PhoneIcon style={{ width: 20, height: 20, fill: "#34d399" }} />
            </div>
            <div>
              <div className="contact-card-label">Phone</div>
              <div className="contact-card-value">+91 82759 26376</div>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/sagar-sharma-1921-/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-card-icon">
              <LinkedInIcon
                style={{ width: 20, height: 20, fill: "#0a66c2" }}
              />
            </div>
            <div>
              <div className="contact-card-label">LinkedIn</div>
              <div className="contact-card-value">sagar-sharma-1921-</div>
            </div>
          </a>

          <a
            href="https://github.com/Sagar-Sharma19-cmd"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-card-icon">
              <GitHubIcon
                style={{ width: 20, height: 20, fill: "#f5f5f7" }}
              />
            </div>
            <div>
              <div className="contact-card-label">GitHub</div>
              <div className="contact-card-value">Sagar-Sharma19-cmd</div>
            </div>
          </a>

          <a
            href="https://leetcode.com/u/Sagar_Sharma_19/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-card-icon">
              <LeetCodeIcon
                style={{ width: 20, height: 20, fill: "#ffa116" }}
              />
            </div>
            <div>
              <div className="contact-card-label">LeetCode</div>
              <div className="contact-card-value">Sagar_Sharma_19</div>
            </div>
          </a>

          <a
            href="https://www.instagram.com/sagarrrr__19"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-card-icon">
              <InstagramIcon
                style={{ width: 20, height: 20, fill: "#e4405f" }}
              />
            </div>
            <div>
              <div className="contact-card-label">Instagram</div>
              <div className="contact-card-value">@sagarrrr__19</div>
            </div>
          </a>
        </div>

        {/* Right — Form */}
        <form className="contact-form" onSubmit={submit}>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">
              Your Name
            </label>
            <input
              id="contact-name"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Sagar Sharma"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              className="form-input"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact.sagarsharma19@gmail.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              className="form-textarea"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your project..."
              required
            />
          </div>
          <button
            className="form-submit"
            type="submit"
            id="contact-submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
            <span>→</span>
          </button>

          <AnimatePresence>
            {sent && (
              <motion.div
                className="toast"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                ✅ Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </section>
  );
}
