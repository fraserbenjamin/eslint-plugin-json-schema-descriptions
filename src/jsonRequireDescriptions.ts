"use strict";
import { type Rule } from "eslint";
import { getSourceCode } from "eslint-compat-utils";
import {
  JSONObjectExpression,
  JSONProgram,
  JSONProperty,
} from "jsonc-eslint-parser/lib/parser/ast.js";

const recursiveCheckProperties = (
  property: JSONObjectExpression,
  context: Rule.RuleContext
) => {
  property.properties.forEach((p: JSONProperty) => {
    if (
      p.key.type === "JSONLiteral" &&
      p.value.type === "JSONObjectExpression"
    ) {
      p.value.properties.forEach((schemaProperties) => {
        if (schemaProperties.key.type === "JSONLiteral") {
          if (
            schemaProperties.key.value === "properties" &&
            schemaProperties.value.type === "JSONObjectExpression"
          ) {
            // Recursively check child properties
            recursiveCheckProperties(schemaProperties.value, context);
          }
        }
      });

      const propertyKeys = p.value.properties
        .map((p) => (p.key.type === "JSONLiteral" ? p.key.value : null))
        .filter(Boolean);

      if (!propertyKeys.includes("description")) {
        context.report({
          node: p as unknown as Rule.Node,
          message: `Missing description in property ${p.key.value}`,
        });
      }
    }
  });
};

export const jsonRequireDescriptions: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Enforce descriptions in JSON schema properties",
      category: "Documentation",
      recommended: true,
    },
    schema: [
      {
        enum: ["always", "require-descriptions"],
      },
    ],
  },

  // @ts-expect-error JSONProgram is an external parser extension
  create(context: Rule.RuleContext) {
    if (!context.filename.endsWith(".json")) {
      return {};
    }

    const source = getSourceCode(context).text;
    if (
      !source.includes(
        `"$schema": "https://json-schema.org/draft/2020-12/schema"`
      )
    )
      return {};

    return {
      Program: (node: JSONProgram): void => {
        const jsonSchema = node.body[0].expression;

        if (jsonSchema.type === "JSONObjectExpression") {
          const topLevelJsonSchemaProperties = (
            jsonSchema as JSONObjectExpression
          ).properties.find((item) => {
            return (
              item.key.type === "JSONLiteral" && item.key.value === "properties"
            );
          });

          // No properties field found
          if (!topLevelJsonSchemaProperties) return;

          if (
            topLevelJsonSchemaProperties.value.type === "JSONObjectExpression"
          )
            recursiveCheckProperties(
              topLevelJsonSchemaProperties.value,
              context
            );
        }
      },
    };
  },
};
