import { ESLint } from "eslint";
import jsoncParser from "jsonc-eslint-parser";
import { jsonRequireDescriptions } from "./jsonRequireDescriptions.js";

const plugin: ESLint.Plugin = {
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

export default {
  files: ["test/**/*.json"],
  plugins: {
    "json-schema-descriptions": plugin,
  },
  rules: {
    "json-schema-descriptions/require-descriptions": "error",
  },
  languageOptions: {
    parser: jsoncParser,
  },
};
