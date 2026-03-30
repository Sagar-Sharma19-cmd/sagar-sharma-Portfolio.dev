import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ASCII_ART = `
  ███████  █████   ██████   █████  ██████  
  ██      ██   ██ ██       ██   ██ ██   ██ 
  ███████ ███████ ██   ███ ███████ ██████  
       ██ ██   ██ ██    ██ ██   ██ ██   ██ 
  ███████ ██   ██  ██████  ██   ██ ██   ██ 
`;

const JOKES = [
    "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
    "A SQL query walks into a bar, sees two tables and asks... 'Can I JOIN you?' 🍺",
    "There are only 10 types of people: those who understand binary and those who don't.",
    "Java: Write once, debug everywhere. ☕",
    "!false — it's funny because it's true. 😄",
    "A programmer's wife says: 'Go to the store and buy a loaf of bread. If they have eggs, buy a dozen.' He comes home with 12 loaves. 🍞",
    "Why did the developer go broke? Because he used up all his cache. 💸",
    "What's a programmer's favorite hangout place? Foo Bar! 🍸",
];

const FACTS = [
    "☕ Java was originally called 'Oak' after an oak tree outside James Gosling's office.",
    "🌐 The first website ever made is still online: info.cern.ch",
    "🐍 Python is named after Monty Python, not the snake!",
    "📦 npm has over 2 million packages — more than any other package registry.",
    "🚀 The Apollo 11 guidance computer had only 74KB of memory.",
    "💻 The first computer bug was an actual bug — a moth found in Harvard Mark II in 1947.",
    "☸️ Kubernetes means 'helmsman' or 'pilot' in Greek.",
    "🍃 Spring Boot can create a production-ready app in under 5 minutes.",
];

function getResponse(cmd) {
    const c = cmd.trim().toLowerCase();

    if (c === "help") {
        return `Available commands:
  about     → Learn about Sagar
  skills    → View tech stack
  education → Academic background
  projects  → Featured projects
  contact   → Get in touch
  joke      → Random programming joke 😄
  fact      → Random tech fact 🤓
  trivia    → Tech trivia question 🧠
  fortune   → Fortune cookie 🥠
  flip      → Flip a coin 🪙
  dice      → Roll a dice 🎲
  coffee    → Brew some coffee ☕
  matrix    → Enter the Matrix 🟢
  ascii     → Show ASCII art
  whoami    → Who are you?
  date      → Current date & time
  clear     → Clear terminal
  sudo hire sagar → 🤫`;
    }

    if (c === "about") {
        return `👋 Hi! I'm Sagar Sharma
   Full Stack Java Developer & AI Explorer
   📍 Currently pursuing MCA at PES University, Bangalore
   🎓 BCA from D.Y. Patil University, Pune
   ☕ I love Java, Spring Boot, React, and building cool stuff!`;
    }

    if (c === "skills") {
        return `Tech Stack:
   ☕ Java ████████████████░░ 90%
   🍃 Spring Boot ██████████████░░░░ 85%
   ⚛️ React ██████████████░░░░ 85%
   ⚡ JavaScript ███████████████░░░ 88%
   🐳 Docker █████████████░░░░░ 70%
   ☸️ Kubernetes ████████████░░░░░░ 60%
   🗄️ MySQL ██████████████░░░░ 80%
   🐍 Python ██████████████░░░░ 80%`;
    }

    if (c === "education") {
        return `🎓 Education:
   ┌── MCA (Currently Pursuing)
   │   PES University, Bangalore
   │   2024 — Present
   │
   └── BCA (Completed)
       D.Y. Patil University, Pune
       2021 — 2024`;
    }

    if (c === "projects") {
        return `🚀 Featured Projects:
   1. Employee Management System — Spring Boot + React
   2. E-Commerce Microservices — Docker + Kubernetes
   3. AI-Powered Chat Assistant — Spring AI
   4. Emoji Emotion AI — Python + TensorFlow
   5. Blog & CMS Platform — Spring MVC + Docker
   6. Fruit Stall Marketplace — MERN Stack`;
    }

    if (c === "contact") {
        return `📬 Let's connect!
   📧 contact.sagarsharma19@gmail.com
   📱 +91 82759 26376
   🔗 linkedin.com/in/sagar-sharma-1921-
   🐙 github.com/Sagar-Sharma19-cmd
   🏆 leetcode.com/u/Sagar_Sharma_19`;
    }

    if (c === "joke") {
        return JOKES[Math.floor(Math.random() * JOKES.length)];
    }

    if (c === "fact") {
        return `💡 Fun fact: ${FACTS[Math.floor(Math.random() * FACTS.length)]}`;
    }

    if (c === "ascii") {
        return ASCII_ART;
    }

    if (c === "whoami") {
        return "You are a curious visitor exploring Sagar's portfolio! Welcome! 🎉";
    }

    if (c === "date") {
        return `📅 ${new Date().toLocaleString()}`;
    }

    if (c === "matrix") {
        return `Wake up, Neo...
The Matrix has you...
Follow the white rabbit. 🐇

    01001010 01100001 01110110 01100001
    ████░░████░░░░████░░░░████░░████
    ░░░░██░░░░████░░░░████░░░░██░░░░
    ████░░████░░░░████░░░░████░░████

Just kidding. But Sagar does write code that feels like magic! ✨`;
    }

    if (c === "sudo hire sagar") {
        return `✅ Permission granted!
   🎉 Congratulations! You've made the best decision.
   Sagar Sharma has been added to your team.
   Productivity increased by 500%! 🚀🚀🚀`;
    }

    if (c === "clear") {
        return "__CLEAR__";
    }

    if (c === "ls") {
        return `about.txt  skills.json  projects/  education/  contact.md  README.md`;
    }

    if (c === "pwd") {
        return `/home/sagar/portfolio`;
    }

    if (c === "cat readme.md" || c === "cat readme") {
        return `# Sagar Sharma's Portfolio
Thanks for visiting! Type 'help' to see available commands.
Built with ☕ Java + ⚛️ React + ❤️ Passion`;
    }

    if (c.startsWith("echo ")) {
        return cmd.slice(5);
    }

    if (c === "trivia") {
        const trivia = [
            "Q: What does JSON stand for?\nA: JavaScript Object Notation",
            "Q: Who created Linux?\nA: Linus Torvalds in 1991",
            "Q: What does API stand for?\nA: Application Programming Interface",
            "Q: In what year was Java released?\nA: 1995 by Sun Microsystems",
            "Q: What does CSS stand for?\nA: Cascading Style Sheets",
            "Q: What is the time complexity of binary search?\nA: O(log n)",
            "Q: Who invented the World Wide Web?\nA: Tim Berners-Lee in 1989",
            "Q: What does SQL stand for?\nA: Structured Query Language",
            "Q: What language is Spring Boot written in?\nA: Java ☕",
            "Q: What port does HTTP use by default?\nA: Port 80 (HTTPS uses 443)",
        ];
        return `🧠 ${trivia[Math.floor(Math.random() * trivia.length)]}`;
    }

    if (c === "fortune") {
        const fortunes = [
            "🥠 A clean codebase is a happy codebase.",
            "🥠 You will merge a pull request with zero conflicts.",
            "🥠 The bug you've been chasing is on line 42.",
            "🥠 Your next deployment will be flawless.",
            "🥠 Stack Overflow will have the exact answer you need.",
            "🥠 A recruiter will slide into your DMs today.",
            "🥠 Your code will compile on the first try. (Just kidding.)",
            "🥠 The coffee machine will never be broken when you need it.",
        ];
        return fortunes[Math.floor(Math.random() * fortunes.length)];
    }

    if (c === "flip") {
        return Math.random() > 0.5 ? "🪙 Heads! " : "🪙 Tails!";
    }

    if (c === "dice" || c === "roll") {
        const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        const val = Math.floor(Math.random() * 6);
        return `🎲 You rolled: ${faces[val]} (${val + 1})`;
    }

    if (c === "coffee") {
        return `☕ Brewing coffee...
   ▓▓▓▓▓▓▓▓░░ 80%
   ┌─────────┐
   │  ~  ~  ~│
   │  JAVA   │
   │  BREW   │
   └─────────┘
   Coffee ready! Now go write some code! ⚡`;
    }

    if (c === "" || c === "\n") {
        return "";
    }

    return `Command not found: ${cmd}
Type 'help' to see available commands.`;
}

export default function Terminal() {
    const [history, setHistory] = useState([
        { type: "system", text: "Welcome to Sagar's Terminal! Type 'help' to get started." },
        { type: "system", text: "──────────────────────────────────────────" },
    ]);
    const [input, setInput] = useState("");
    const endRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        /* Scroll only inside the terminal body, NOT the page */
        const el = endRef.current;
        if (el && el.parentElement) {
            el.parentElement.scrollTop = el.parentElement.scrollHeight;
        }
    }, [history]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.trim()) return;

        const response = getResponse(input);

        if (response === "__CLEAR__") {
            setHistory([
                { type: "system", text: "Terminal cleared. Type 'help' for commands." },
            ]);
        } else {
            setHistory((prev) => [
                ...prev,
                { type: "cmd", text: input },
                { type: "response", text: response },
            ]);
        }
        setInput("");
    }

    return (
        <section id="terminal" className="section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="section-label">Interactive</div>
                <h2 className="section-title">Try My Terminal</h2>
                <p className="section-subtitle">
                    Go ahead — type commands, explore, have fun! This is a fully
                    interactive terminal. Try <code>help</code> to see what you can do.
                </p>
            </motion.div>

            <motion.div
                className="terminal-window"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onClick={() => inputRef.current?.focus()}
            >
                {/* Title bar */}
                <div className="terminal-titlebar">
                    <div className="terminal-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                    </div>
                    <span className="terminal-title">sagar@portfolio ~ % </span>
                </div>

                {/* Output area */}
                <div className="terminal-body">
                    {history.map((line, i) => (
                        <div key={i} className={`terminal-line ${line.type}`}>
                            {line.type === "cmd" && (
                                <span className="terminal-prompt">❯ </span>
                            )}
                            <span className="terminal-text">{line.text}</span>
                        </div>
                    ))}
                    <div ref={endRef} />

                    {/* Input line */}
                    <form onSubmit={handleSubmit} className="terminal-input-line">
                        <span className="terminal-prompt">❯ </span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="terminal-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="type a command..."
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </form>
                </div>
            </motion.div>
        </section>
    );
}
