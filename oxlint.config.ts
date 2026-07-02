import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "unicorn", "oxc", "import"],
  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "error",
  },
  rules: {
    "import/no-unassigned-import": "off",
  },
  env: {
    builtin: true,
  },
  ignorePatterns: ["dist", ".astro"],
});
