import React, { useEffect, useState } from "react";

export default function AnimatedBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                backgroundColor: "var(--color-bg)",
                overflow: "hidden",
            }}
        >
            {/* The Grid Pattern Engine */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                    maskImage: `radial-gradient(circle at center, black 20%, transparent 90%)`,
                    WebkitMaskImage: `radial-gradient(circle at center, black 10%, transparent 100%)`,
                    opacity: 0.8,
                }}
            />

            {/* Interactive Mouse Glow over the Grid */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
            linear-gradient(to right, var(--color-border-hover) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border-hover) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                    maskImage: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
                }}
            />

            {/* Soft Vignette Overlay to blend the edges with the pure background */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow: "inset 0 0 100px 50px var(--color-bg)",
                }}
            />
        </div>
    );
}
