/** @type {import ('tailwindcss').Config} */

import tailwindScrollbar from "tailwind-scrollbar";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                Montserrat: ["Montserrat", "sans-serif"]
            }
        },
    },
    plugins: [tailwindScrollbar]
}