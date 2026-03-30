import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const CODE_SNIPPETS = [
    {
        lang: "Java",
        icon: "☕",
        code: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
    },
    {
        lang: "JavaScript",
        icon: "⚡",
        code: `const greet = (name) => {\n  return \`Hello, \${name}!\`;\n};\nconsole.log(greet("Sagar"));`,
    },
    {
        lang: "Python",
        icon: "🐍",
        code: `def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a`,
    },
    {
        lang: "SQL",
        icon: "🗄️",
        code: `SELECT u.name, COUNT(o.id)\nFROM users u\nJOIN orders o ON u.id = o.user_id\nGROUP BY u.name\nHAVING COUNT(o.id) > 5;`,
    },
    {
        lang: "Spring Boot",
        icon: "🍃",
        code: `@RestController\npublic class ApiController {\n  @GetMapping("/api/hello")\n  public String hello() {\n    return "Hello from Spring!";\n  }\n}`,
    },
    {
        lang: "React",
        icon: "⚛️",
        code: `function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Clicked {count} times\n    </button>\n  );\n}`,
    },
    {
        lang: "Docker",
        icon: "🐳",
        code: `FROM openjdk:17-slim\nWORKDIR /app\nCOPY target/*.jar app.jar\nEXPOSE 8080\nENTRYPOINT ["java", "-jar", "app.jar"]`,
    },
];

function getWPM(chars, ms) {
    if (ms <= 0) return 0;
    const words = chars / 5;
    const mins = ms / 60000;
    return Math.round(words / mins);
}

function getAccuracy(typed, target) {
    if (typed.length === 0) return 100;
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === target[i]) correct++;
    }
    return Math.round((correct / typed.length) * 100);
}

function getRank(wpm) {
    if (wpm >= 80) return { label: "🔥 Blazing Fast!", color: "#ff4444" };
    if (wpm >= 60) return { label: "⚡ Speed Demon", color: "#00e5ff" };
    if (wpm >= 40) return { label: "💪 Solid Coder", color: "#a855f7" };
    if (wpm >= 25) return { label: "👍 Getting There", color: "#34d399" };
    return { label: "🐢 Warming Up", color: "#facc15" };
}

export default function TypingChallenge() {
    const [snippetIdx, setSnippetIdx] = useState(0);
    const [typed, setTyped] = useState("");
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [bestWPM, setBestWPM] = useState(() =>
        parseInt(localStorage.getItem("typing-best") || "0", 10)
    );
    const inputRef = useRef(null);
    const timerRef = useRef(null);

    const snippet = CODE_SNIPPETS[snippetIdx];
    const target = snippet.code;

    const wpm = started ? getWPM(typed.length, elapsed) : 0;
    const accuracy = getAccuracy(typed, target);
    const progress = Math.min((typed.length / target.length) * 100, 100);

    /* Timer */
    useEffect(() => {
        if (started && !finished) {
            timerRef.current = setInterval(() => {
                setElapsed(Date.now() - startTime);
            }, 100);
        }
        return () => clearInterval(timerRef.current);
    }, [started, finished, startTime]);

    /* Check completion */
    useEffect(() => {
        if (typed.length >= target.length && started) {
            setFinished(true);
            clearInterval(timerRef.current);
            const finalWPM = getWPM(typed.length, Date.now() - startTime);
            if (finalWPM > bestWPM) {
                setBestWPM(finalWPM);
                localStorage.setItem("typing-best", String(finalWPM));
            }
        }
    }, [typed, target, started, startTime, bestWPM]);

    const handleInput = useCallback(
        (e) => {
            const val = e.target.value;

            if (!started && val.length > 0) {
                setStarted(true);
                setStartTime(Date.now());
            }

            /* Only allow typing up to the target length */
            if (val.length <= target.length) {
                setTyped(val);
            }
        },
        [started, target]
    );

    function nextSnippet() {
        const next = (snippetIdx + 1) % CODE_SNIPPETS.length;
        setSnippetIdx(next);
        setTyped("");
        setStarted(false);
        setFinished(false);
        setElapsed(0);
        clearInterval(timerRef.current);
        setTimeout(() => inputRef.current?.focus(), 50);
    }

    function restart() {
        setTyped("");
        setStarted(false);
        setFinished(false);
        setElapsed(0);
        clearInterval(timerRef.current);
        setTimeout(() => inputRef.current?.focus(), 50);
    }

    /* Render the target code with character-by-character coloring */
    function renderCode() {
        return target.split("").map((char, i) => {
            let className = "char-pending";
            if (i < typed.length) {
                className = typed[i] === char ? "char-correct" : "char-wrong";
            } else if (i === typed.length) {
                className = "char-current";
            }
            return (
                <span key={i} className={className}>
                    {char === "\n" ? "↵\n" : char === " " ? "\u00A0" : char}
                </span>
            );
        });
    }

    const rank = finished ? getRank(getWPM(typed.length, elapsed)) : null;

    return (
        <section id="typing" className="section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="section-label">Challenge</div>
                <h2 className="section-title">Code Typing Speed ⌨️</h2>
                <p className="section-subtitle">
                    How fast can you type real code? Click the code block and start typing
                    to begin the challenge!
                </p>
            </motion.div>

            <motion.div
                className="typing-challenge"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {/* Stats bar */}
                <div className="typing-stats">
                    <div className="typing-lang">
                        <span>{snippet.icon}</span>
                        <span>{snippet.lang}</span>
                    </div>
                    <div className="typing-stat-group">
                        <div className="typing-stat">
                            <span className="typing-stat-val">{wpm}</span>
                            <span className="typing-stat-label">WPM</span>
                        </div>
                        <div className="typing-stat">
                            <span className="typing-stat-val">{accuracy}%</span>
                            <span className="typing-stat-label">Accuracy</span>
                        </div>
                        <div className="typing-stat">
                            <span className="typing-stat-val">{(elapsed / 1000).toFixed(1)}s</span>
                            <span className="typing-stat-label">Time</span>
                        </div>
                        <div className="typing-stat best">
                            <span className="typing-stat-val">{bestWPM}</span>
                            <span className="typing-stat-label">Best WPM</span>
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="typing-progress-bar">
                    <div
                        className="typing-progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Code display */}
                <div
                    className="typing-code-display"
                    onClick={() => inputRef.current?.focus()}
                >
                    <pre className="typing-code">{renderCode()}</pre>

                    {/* Hidden input */}
                    <textarea
                        ref={inputRef}
                        className="typing-hidden-input"
                        value={typed}
                        onChange={handleInput}
                        disabled={finished}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                </div>

                {/* Finished overlay */}
                {finished && (
                    <motion.div
                        className="typing-result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="typing-result-rank" style={{ color: rank.color }}>
                            {rank.label}
                        </div>
                        <div className="typing-result-wpm">
                            {getWPM(typed.length, elapsed)} <span>WPM</span>
                        </div>
                        <div className="typing-result-details">
                            {accuracy}% accuracy • {(elapsed / 1000).toFixed(1)}s •{" "}
                            {snippet.lang}
                        </div>
                    </motion.div>
                )}

                {/* Controls */}
                <div className="typing-controls">
                    <button className="typing-btn" onClick={restart}>
                        ↻ Restart
                    </button>
                    <button className="typing-btn accent" onClick={nextSnippet}>
                        Next Snippet →
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
