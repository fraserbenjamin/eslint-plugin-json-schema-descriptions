import jsoncParser from "jsonc-eslint-parser";
import { plugin } from "../plugin.js";

export default {
  plugins: {
    "json-schema-descriptions": plugin,
  },
  files: ["**/*.json"],
  rules: {
    "json-schema-descriptions/require-descriptions": "error",
  },
  languageOptions: {
    parser: jsoncParser,
  },
};
