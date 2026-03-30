import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export default function Loader({ onComplete }) {
    const [text, setText] = useState("");
    const finalString = "SAGAR SHARMA";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setText(
                finalString
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return finalString[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= finalString.length) {
                clearInterval(interval);
                setTimeout(() => {
                    onComplete();
                }, 600);
            }
            iteration += 1 / 3;
        }, 40);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="initial-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "var(--color-bg)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Inter', monospace",
            }}
        >
            <h1
                style={{
                    fontSize: "clamp(2rem, 8vw, 6rem)",
                    fontWeight: 800,
                    color: "var(--color-text-primary)",
                    letterSpacing: "0.15em",
                    textAlign: "center",
                    textTransform: "uppercase"
                }}
            >
                {text}
            </h1>
        </motion.div>
    );
}
