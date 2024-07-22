import globals from "globals";
import pluginJs from "@eslint/js";
import jsonSchemaDescriptions from "../dist/index.js";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  jsonSchemaDescriptions,
];
