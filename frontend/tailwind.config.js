import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)'],
                mono: ['var(--font-geist-mono)'],
            },
            animation: {
                'spin-slow': 'spin 14s linear infinite',
                fade: 'fadeIn .4s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui({
        themes: {
            dark: {
                colors: {
                    primary: {
                        DEFAULT: '#C03FF7',
                        foreground: '#000000',
                    },
                    focus: '#FF1CF7',
                },
            },
            light: {
                colors: {
                    primary: {
                        DEFAULT: '#C03FF7',
                        foreground: '#000000',
                    },
                    focus: '#FF1CF7',
                },
            }
        }
    })
    ],
};
