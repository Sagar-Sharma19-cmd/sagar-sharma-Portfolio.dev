import React, { useEffect, useRef } from "react";

/**
 * Theme-aware diamond cursor
 * DARK: Cyan/purple neon diamond
 * LIGHT: Golden warm diamond
 */
export default function CustomCursor() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let mouseX = -100, mouseY = -100;
        let isHovering = false;
        let angle = 0;
        let raf;

        const trail = [];
        const MAX_TRAIL = 14;
        let frame = 0;

        const onResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const onMouse = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onOver = (e) => {
            const tag = e.target.tagName;
            if (
                tag === "A" || tag === "BUTTON" ||
                tag === "INPUT" || tag === "TEXTAREA" ||
                e.target.closest("a") || e.target.closest("button")
            ) {
                isHovering = true;
            }
        };
        const onOut = () => { isHovering = false; };

        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", onMouse);
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);

        function isDark() {
            return document.documentElement.getAttribute("data-theme") !== "light";
        }

        function getColors() {
            if (isDark()) {
                return {
                    main: "rgba(0, 255, 255, 0.85)",
                    mainHover: "rgba(0, 255, 255, 0.95)",
                    trail: "0, 255, 255",
                    glow: "rgba(0, 255, 255, 0.5)",
                    glowHover: "rgba(168, 85, 247, 0.6)",
                };
            }
            return {
                main: "rgba(200, 160, 30, 0.85)",
                mainHover: "rgba(200, 160, 30, 0.95)",
                trail: "200, 160, 30",
                glow: "rgba(200, 160, 30, 0.4)",
                glowHover: "rgba(200, 160, 30, 0.6)",
            };
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            frame++;
            const c = getColors();

            if (frame % 2 === 0) {
                trail.push({ x: mouseX, y: mouseY, life: 1 });
                if (trail.length > MAX_TRAIL) trail.shift();
            }

            /* Trail */
            for (let i = 0; i < trail.length; i++) {
                const p = trail[i];
                p.life -= 0.08;
                if (p.life <= 0) continue;
                const alpha = p.life * 0.3;
                const size = (isHovering ? 4 : 2.5) * p.life;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(Math.PI / 4);
                ctx.fillStyle = `rgba(${c.trail}, ${alpha})`;
                ctx.fillRect(-size / 2, -size / 2, size, size);
                ctx.restore();
            }

            angle += isHovering ? 0.06 : 0.025;

            const mainSize = isHovering ? 11 : 6;
            ctx.save();
            ctx.translate(mouseX, mouseY);
            ctx.rotate(angle);

            ctx.shadowColor = isHovering ? c.glowHover : c.glow;
            ctx.shadowBlur = isHovering ? 18 : 8;

            ctx.beginPath();
            ctx.moveTo(0, -mainSize);
            ctx.lineTo(mainSize, 0);
            ctx.lineTo(0, mainSize);
            ctx.lineTo(-mainSize, 0);
            ctx.closePath();

            ctx.fillStyle = isHovering ? c.mainHover : c.main;
            ctx.fill();

            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.shadowBlur = 0;

            ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
            ctx.beginPath();
            ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            raf = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouse);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0, left: 0,
                width: "100%", height: "100%",
                zIndex: 99999,
                pointerEvents: "none",
            }}
        />
    );
}
