import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const GRID = 20;
const CELL = 18;
const SPEED = 120;

const DIR = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    w: { x: 0, y: -1 },
    s: { x: 0, y: 1 },
    a: { x: -1, y: 0 },
    d: { x: 1, y: 0 },
};

function randomFood(snake) {
    let pos;
    do {
        pos = {
            x: Math.floor(Math.random() * GRID),
            y: Math.floor(Math.random() * GRID),
        };
    } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
    return pos;
}

export default function SnakeGame() {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [dir, setDir] = useState({ x: 1, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [started, setStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem("snake-hi") || "0", 10);
    });
    const dirRef = useRef(dir);
    const canvasRef = useRef(null);

    dirRef.current = dir;

    const reset = useCallback(() => {
        const s = [{ x: 10, y: 10 }];
        setSnake(s);
        setFood(randomFood(s));
        setDir({ x: 1, y: 0 });
        dirRef.current = { x: 1, y: 0 };
        setGameOver(false);
        setScore(0);
        setStarted(true);
    }, []);

    /* Key handler */
    useEffect(() => {
        const handleKey = (e) => {
            if (DIR[e.key]) {
                e.preventDefault();
                const nd = DIR[e.key];
                /* Prevent 180° turn */
                if (nd.x !== -dirRef.current.x || nd.y !== -dirRef.current.y) {
                    setDir(nd);
                }
            }
            if (e.key === " " && (gameOver || !started)) {
                e.preventDefault();
                reset();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [gameOver, started, reset]);

    /* Game loop */
    useEffect(() => {
        if (!started || gameOver) return;

        const interval = setInterval(() => {
            setSnake((prev) => {
                const head = {
                    x: prev[0].x + dirRef.current.x,
                    y: prev[0].y + dirRef.current.y,
                };

                /* Wall collision */
                if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
                    setGameOver(true);
                    return prev;
                }

                /* Self collision */
                if (prev.some((s) => s.x === head.x && s.y === head.y)) {
                    setGameOver(true);
                    return prev;
                }

                const newSnake = [head, ...prev];

                /* Eat food */
                if (head.x === food.x && head.y === food.y) {
                    setScore((s) => {
                        const ns = s + 10;
                        if (ns > highScore) {
                            setHighScore(ns);
                            localStorage.setItem("snake-hi", String(ns));
                        }
                        return ns;
                    });
                    setFood(randomFood(newSnake));
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, SPEED);

        return () => clearInterval(interval);
    }, [started, gameOver, food, highScore]);

    /* Draw */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const size = GRID * CELL;
        canvas.width = size;
        canvas.height = size;

        const isDark = document.documentElement.getAttribute("data-theme") !== "light";

        /* Background */
        ctx.fillStyle = isDark ? "rgba(5, 5, 16, 0.9)" : "rgba(248, 246, 240, 0.9)";
        ctx.fillRect(0, 0, size, size);

        /* Grid */
        ctx.strokeStyle = isDark ? "rgba(0, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)";
        for (let i = 0; i <= GRID; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL, 0);
            ctx.lineTo(i * CELL, size);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * CELL);
            ctx.lineTo(size, i * CELL);
            ctx.stroke();
        }

        /* Food */
        ctx.fillStyle = isDark ? "#a855f7" : "#d4a017";
        ctx.shadowColor = isDark ? "rgba(168, 85, 247, 0.6)" : "rgba(212, 160, 23, 0.4)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(
            food.x * CELL + CELL / 2,
            food.y * CELL + CELL / 2,
            CELL / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;

        /* Snake */
        snake.forEach((seg, i) => {
            const isHead = i === 0;
            const alpha = 1 - i * 0.03;
            if (isDark) {
                ctx.fillStyle = isHead
                    ? `rgba(0, 229, 255, ${alpha})`
                    : `rgba(0, 200, 230, ${alpha * 0.7})`;
                if (isHead) {
                    ctx.shadowColor = "rgba(0, 229, 255, 0.5)";
                    ctx.shadowBlur = 6;
                }
            } else {
                ctx.fillStyle = isHead
                    ? `rgba(166, 124, 0, ${alpha})`
                    : `rgba(180, 140, 20, ${alpha * 0.7})`;
                if (isHead) {
                    ctx.shadowColor = "rgba(166, 124, 0, 0.4)";
                    ctx.shadowBlur = 6;
                }
            }
            const r = isHead ? 4 : 3;
            const x = seg.x * CELL + 1;
            const y = seg.y * CELL + 1;
            const w = CELL - 2;
            ctx.beginPath();
            ctx.roundRect(x, y, w, w, r);
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        /* Game over overlay */
        if (gameOver) {
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(0, 0, size, size);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 20px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", size / 2, size / 2 - 15);
            ctx.font = "14px Inter, sans-serif";
            ctx.fillStyle = isDark ? "#00e5ff" : "#a67c00";
            ctx.fillText(`Score: ${score}`, size / 2, size / 2 + 10);
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.font = "12px Inter, sans-serif";
            ctx.fillText("Press SPACE to restart", size / 2, size / 2 + 35);
        }

        /* Start screen */
        if (!started) {
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, size, size);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 18px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("🐍 SNAKE", size / 2, size / 2 - 20);
            ctx.font = "12px Inter, sans-serif";
            ctx.fillStyle = isDark ? "#00e5ff" : "#a67c00";
            ctx.fillText("Press SPACE to start", size / 2, size / 2 + 8);
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.fillText("WASD or Arrow keys to move", size / 2, size / 2 + 28);
        }
    }, [snake, food, gameOver, started, score]);

    return (
        <section id="game" className="section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="section-label">Just For Fun</div>
                <h2 className="section-title">Play Snake 🐍</h2>
                <p className="section-subtitle">
                    Take a break! Use <code>WASD</code> or <code>Arrow keys</code> to play.
                    Beat the high score!
                </p>
            </motion.div>

            <motion.div
                className="snake-game-wrapper"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {/* Score bar */}
                <div className="snake-scorebar">
                    <div className="snake-score">
                        <span className="snake-score-label">SCORE</span>
                        <span className="snake-score-value">{score}</span>
                    </div>
                    <div className="snake-score">
                        <span className="snake-score-label">HIGH SCORE</span>
                        <span className="snake-score-value hi">{highScore}</span>
                    </div>
                    <button className="snake-restart" onClick={reset}>
                        ↻ Restart
                    </button>
                </div>

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="snake-canvas"
                    tabIndex={0}
                />

                {/* Mobile controls */}
                <div className="snake-mobile-controls">
                    <button onClick={() => setDir(DIR.ArrowUp)}>▲</button>
                    <div className="snake-mobile-row">
                        <button onClick={() => setDir(DIR.ArrowLeft)}>◀</button>
                        <button onClick={() => setDir(DIR.ArrowDown)}>▼</button>
                        <button onClick={() => setDir(DIR.ArrowRight)}>▶</button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
