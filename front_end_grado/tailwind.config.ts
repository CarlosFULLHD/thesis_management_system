import { nextui } from "@nextui-org/theme"
import type { Config } from "tailwindcss"

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{ts,tsx}', // Assuming you also keep some files under /src
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {

      colors: {
        'blue-light': '#052845', // blue-50
        'yellow-light': '#FFD527', // yellow-50
        'background-light': '#ffffff', // white (native)

        // Modo oscuro
        'blue-dark': '#1c537d', // blue-25
        'yellow-dark': '#FFC107', // yellow-25
        'background-dark': '#23272A', // black-50
        'off-white': '#f5f5f5',
        //otros colores
	      'custom-green': '#052915',
        'custom-green-font' : '#18bb47',
        'custom-red': '#2f0412',
        'custom-red-font' : '#f33c58',
        'custom-blue':'#002d61',
        'custom-blue-font': '#0069ee',
        'custom-yellow': '#df9522',
        'custom-purple': '#854bbf',

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  darkMode: "class", // Use class-based dark mode
  plugins: [
    require("tailwindcss-animate"), // Assuming you still need animations
    nextui(), // Next UI theme plugin
  ],
  
} satisfies Config

export default config