import { fixupPluginRules } from "@eslint/compat";
import nextPlugin from "@next/eslint-plugin-next";
import { type TSESLint } from "@typescript-eslint/utils";

export const next: TSESLint.FlatConfig.ConfigArray = [
  {
    plugins: {
      // @ts-expect-error There is a bad typing atm
      "@next/next": fixupPluginRules(nextPlugin),
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
];
