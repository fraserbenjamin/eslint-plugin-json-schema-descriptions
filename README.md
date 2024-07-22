# eslint-plugin-json-schema-descriptions [![Build Status](https://github.com/fraserbenjamin/eslint-plugin-json-schema-descriptions/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/fraserbenjamin/eslint-plugin-json-schema-descriptions/actions/workflows/publish.yml?query=branch%3Amain)

ESLint rule to mandate that JSON Schema files have description fields on properties.

## Installation

```sh
npm install --save-dev eslint-plugin-json-schema-descriptions
```

## Configuration (`eslint.config.js`)

For [flat configuration](https://eslint.org/docs/latest/use/configure/configuration-files-new), this plugin ships with an `eslint-plugin-json-schema-descriptions/recommended` config that sets up both `eslint-plugin-json-schema-descriptions` and [`jsonc-eslint-parser`](https://github.com/ota-meshi/jsonc-eslint-parser) in one go.

Import `eslint-plugin-json-schema-descriptions` and add it as the _last_ item in the configuration array in your `eslint.config.js` file so that `eslint-plugin-json-schema-descriptions` has the opportunity to override other configs:

```js
import jsonSchemaDescriptions from "eslint-plugin-json-schema-descriptions/recommended";

export default [
  jsonSchemaDescriptions,
];
```

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).
