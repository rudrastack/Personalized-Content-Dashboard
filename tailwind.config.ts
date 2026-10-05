import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                canvas: {
                    dark: "#090A0F",
                    light: "#F8FAFC",
                },
                surface: {
                    DEFAULT: "#0E1017",
                    elevated: "#131620",
                    overlay: "#161924",
                    hover: "#1A1E2B",
                    border: "#1E2230",
                    borderHighlight: "#2C3246",
                },
                accent: {
                    DEFAULT: "#3B82F6",
                    hover: "#2563EB",
                    subtle: "rgba(59, 130, 246, 0.1)",
                },
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "sans-serif",
                ],
                mono: [
                    "JetBrains Mono",
                    "SF Mono",
                    "Menlo",
                    "Monaco",
                    "Consolas",
                    "monospace",
                ],
            },
        },
    },
    plugins: [],
};

export default config;
