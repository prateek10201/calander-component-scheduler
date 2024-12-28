import type { Config } from "tailwindcss";

const config = {
  //darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        xs:"var(--spur-spacing-xs)",
        s:"var(--spur-spacing-s)",
        m:"var(--spur-spacing-m)",
        l:"var(--spur-spacing-l)",
        xl:"var(--spur-spacing-xl)",
        xxl:"var(--spur-spacing-xxl)",
        xxxl:"var(--spur-spacing-xxxl)",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--spur-Core-Blue-Primary)",
          "blue-light": "var(--spur-Core-Blue-Light)",
          "core-blue": "var(--spur-Core-Blue)",
        },
        secondary: {
          DEFAULT: "var(--spur-Warm-Gray-100)",
          "gray-125": "var(--spur-Warm-Gray-125)",
          "gray-150": "var(--spur-Warm-Gray-150)",
          "gray-200": "var(--spur-Warm-Gray-200)",
          "gray-700": "var(--spur-Warm-Gray-700)",
          "gray-800": "var(--spur-Warm-Gray-800)",
          "gray-1100": "var(--spur-Warm-Gray-1100)",
        },
        destructive: {
          DEFAULT: "var(--spur-Destructive-Red-Primary)",
        },
        muted: {
          DEFAULT: "var(--spur-overlay)",
        },
      },
      borderRadius: {
        s: "var(--spur-spacing-xs)",
        m: "calc(var(--spur-spacing-s) + 2px)",
        l: "var(--spur-spacing-s)",
        xl: "var(--spur-spacing-l)",
        xxl: "var(--spur-spacing-xxl)"
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
