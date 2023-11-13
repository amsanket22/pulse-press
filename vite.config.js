import { defineConfig, resolve } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            refresh: true,
        }),
    ],
    css: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
    build: {
        chunkSizeWarningLimit: 250,
        rollupOptions: {
            onwarn(warning, warn) {
                if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
                    return;
                }
                warn(warning);
            },
        },
    },
});
