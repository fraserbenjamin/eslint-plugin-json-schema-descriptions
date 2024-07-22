import { type ESLint } from "eslint";
import { jsonRequireDescriptions } from "./jsonRequireDescriptions.js";

export const plugin: ESLint.Plugin = {
  meta: {
    name: "json-schema-descriptions",
  },
  configs: {
    recommended: {
      files: ["**/*.json"],
      plugins: ["json-schema-descriptions"],
      rules: {
        "json-schema-descriptions/require-descriptions": "error",
      },
      processor: "json",
    },
  },
  rules: {
    "require-descriptions": jsonRequireDescriptions,
  },
};
