import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    { ignores: ["dist", "src/client", "vite.config.js", "vite.config.d.ts"] },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
