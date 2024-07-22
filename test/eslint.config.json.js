import globals from "globals";
import pluginJs from "@eslint/js";
import jsonSchemaDescriptions from "../dist/recommended/index.js";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  jsonSchemaDescriptions,
];
