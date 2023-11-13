/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
    content: [
        "./resources/**/*.{js,jsx,ts,tsx}",
        "./resources/views/**/*.blade.php",
        "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    ],
    theme: {
        extend: {
            backgroundImage: {
                // if you img file is in public folder just use '/ + img-file-name'

                "custom-name": "url('/resources/assets/images/gray_paws.jpg')",

                "paws-line": "url('/resources/assets/images/paw_line.jpg')",
            },

            opacity: {
                10: "0.1",
                20: "0.2",
                25: "0.25",
                50: "0.5",
                75: "0.75",
                95: "0.95",
                100: "1",
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                black: colors.black,
                white: colors.white,
                gray: colors.gray,
                red: colors.red,
                yellow: colors.amber,
                green: colors.emerald,
                blue: colors.blue,
                indigo: colors.indigo,
                purple: colors.violet,
                pink: colors.pink,
                primary: "#374151",
                hover: "#6B7280",
                secondary: "#FFD89D",
                light: "#FFCE67",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
