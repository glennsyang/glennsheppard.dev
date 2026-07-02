import { configs } from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

export default [
  ...configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
      },
    },
  },
];
