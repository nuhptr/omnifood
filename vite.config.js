import { defineConfig } from "vite"
import injectHTML from "vite-plugin-html-inject"

export default defineConfig({
    root: "app",
    plugins: [injectHTML()],
    build: {
        outDir: "../dist",
        emptyOutDir: true,
    },
})
