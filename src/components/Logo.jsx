import React from "react";

/**
 * Custom SVG logo — geometric "S" mark with code-style framing
 * Uses currentColor and CSS variables so it works with both themes
 */
export default function Logo({ size = 32, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Sagar Sharma Logo"
        >
            <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="var(--color-accent)" />
                    <stop offset="100%" stopColor="var(--color-accent-secondary)" />
                </linearGradient>
                <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Outer hexagonal frame */}
            <path
                d="M60 4L110 30V90L60 116L10 90V30L60 4Z"
                fill="none"
                stroke="url(#logo-grad)"
                strokeWidth="2.5"
                opacity="0.7"
            />

            {/* Inner hex fill */}
            <path
                d="M60 14L102 36V84L60 106L18 84V36L60 14Z"
                fill="url(#logo-grad)"
                opacity="0.08"
            />

            {/* Code brackets */}
            <path
                d="M30 48L18 60L30 72"
                stroke="url(#logo-grad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#logo-glow)"
            />
            <path
                d="M90 48L102 60L90 72"
                stroke="url(#logo-grad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#logo-glow)"
            />

            {/* Stylized "S" */}
            <path
                d="M70 38C70 38 66 34 58 34C50 34 44 39 44 46C44 53 50 56 58 58C66 60 74 63 74 72C74 81 68 86 58 86C48 86 44 80 44 80"
                stroke="var(--color-text-primary)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#logo-glow)"
            />

            {/* Slash */}
            <path
                d="M78 34L62 86"
                stroke="url(#logo-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.4"
            />
        </svg>
    );
}
