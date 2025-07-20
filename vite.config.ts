import { type UserConfig } from 'vite'
import wasm from "vite-plugin-wasm";
import pluginChecker from 'vite-plugin-checker';

export default {

    build: {
        outDir: "/dist",
    },
    plugins: [
        pluginChecker({ typescript: true }),
        wasm()
    ]


} satisfies UserConfig