import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#050A18",
          "navy-mid": "#071225",
          gold: "#D5A53B",
          "gold-light": "#F2D28C",
          cyan: "#00C8FF",
          steel: "#AEB8C6",
          ivory: "#F6F3EA",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
        ui: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #D5A53B 0%, #F2D28C 50%, #D5A53B 100%)",
        "navy-gradient":
          "linear-gradient(180deg, #050A18 0%, #071225 100%)",
        "hero-radial":
          "radial-gradient(ellipse at center, #0A1A3A 0%, #050A18 70%)",
        "african-geo":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D5A53B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "track-line": "trackLine 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
        "slide-in-left": "slideInLeft 0.8s ease forwards",
        "counter-up": "counterUp 2s ease forwards",
      },
      keyframes: {
        pulseGold: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        trackLine: {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "scaleX(1)", opacity: "0.6" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        counterUp: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        gold: "0 0 20px rgba(213, 165, 59, 0.3), 0 0 60px rgba(213, 165, 59, 0.1)",
        "gold-sm": "0 0 10px rgba(213, 165, 59, 0.2)",
        cyan: "0 0 20px rgba(0, 200, 255, 0.3)",
        "card-dark": "0 4px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(213,165,59,0.08)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
