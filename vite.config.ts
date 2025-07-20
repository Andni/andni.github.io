import { type UserConfig } from 'vite'
import wasm from "vite-plugin-wasm";

export default {

    build: {
        outDir: "/dist",
    },
    plugins: [
        wasm(),
    ]


} satisfies UserConfig