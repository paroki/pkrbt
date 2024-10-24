import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["./src/**/*.{js,mjs,cjs,ts}"],
  },
  {
    ignores: ["dist/*", "node_modules/*"],
  },
];
