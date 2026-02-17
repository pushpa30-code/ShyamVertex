/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#115e59', // Teal 800 - Lighter than before
                secondary: '#fcd34d', // Amber 300 - Lighter Gold
                accent: '#f8fafc', // Slate 50 - Very light background
                dark: '#1e293b', // Slate 800 - Lighter dark
                surface: '#ffffff', // Pure white for cards
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
