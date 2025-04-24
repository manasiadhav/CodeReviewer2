/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(240 5.9% 90%)",
        input: "hsl(240 5.9% 90%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(240 10% 3.9%)",
        primary: {
          DEFAULT: "hsl(240 5.9% 10%)",
          foreground: "hsl(0 0% 98%)",
          50: "#f8f8fc",
          100: "#f1f1fa",
          200: "#e4e4f0",
          300: "#d0d0e0",
          400: "#acacc0",
          500: "#8484a0",
          600: "#666680",
          700: "#4d4d60",
          800: "#38383f",
          900: "#2c2c30",
          950: "#18181b",
        },
        secondary: {
          DEFAULT: "hsl(240 4.8% 95.9%)",
          foreground: "hsl(240 5.9% 10%)",
        },
        accent: {
          DEFAULT: "hsl(240 100% 50%)",
          foreground: "hsl(0 0% 98%)",
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(0 0% 98%)",
          50: "#fff1f2",
          100: "#ffe1e2",
          200: "#ffc9ca",
          300: "#fea3a6",
          400: "#fc6f74",
          500: "#f33b42",
          600: "#de1d25",
          700: "#ba181e",
          800: "#991a1f",
          900: "#7d1a1e",
          950: "#450a0c",
        },
        warning: {
          DEFAULT: "hsl(38 92% 50%)",
          foreground: "hsl(0 0% 98%)",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#783c10",
          950: "#451e02",
        },
        success: {
          DEFAULT: "hsl(142 71% 45%)",
          foreground: "hsl(0 0% 98%)",
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        muted: {
          DEFAULT: "hsl(240 4.8% 95.9%)",
          foreground: "hsl(240 3.8% 46.1%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(240 10% 3.9%)",
        },
        dark: {
          DEFAULT: "hsl(240 10% 3.9%)",
          foreground: "hsl(0 0% 98%)",
        },
      },
      spacing: {
        'xxs': '0.125rem', // 2px
        'xs': '0.25rem',  // 4px
        'sm': '0.5rem',   // 8px 
        'md': '1rem',     // 16px
        'lg': '1.5rem',   // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',    // 48px
        '3xl': '4rem',    // 64px
      },
      borderRadius: {
        'sm': '0.125rem',   // 2px
        'md': '0.25rem',    // 4px 
        'lg': '0.5rem',     // 8px
        'xl': '1rem',       // 16px
        '2xl': '1.5rem',    // 24px
        '3xl': '2rem',      // 32px
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideIn: 'slideInFromRight 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink: 'blink 1s linear infinite',
      },
      fontSize: {
        'tiny': '.625rem',  // 10px 
        'xs': '.75rem',     // 12px
        'sm': '.875rem',    // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'outline': '0 0 0 3px rgba(99, 102, 241, 0.6)',
        'none': 'none',
      },
    },
  },
  plugins: [],
};