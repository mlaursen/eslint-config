import eslint from "@eslint/js";
import { type TSESLint } from "@typescript-eslint/utils";
import { DEV_WARNING_PROD_ERROR } from "./constants";

export const base: TSESLint.FlatConfig.ConfigArray = [
  eslint.configs.recommended,
  {
    rules: {
      // You normally do not want `console.{whatever}` in prod but is fine for
      // development in debugging
      "no-console": DEV_WARNING_PROD_ERROR,

      "no-use-before-define": "warn",

      // I want to enforce all statements to require curly braces even if it
      // could be omitted for consistency
      curly: "error",

      // Since this is auto-fixable, I like `{ someproperty }` instead of
      // `{ someproperty: someproperty }`
      "object-shorthand": ["error", "always"],

      // This is about the same as `object-shorthand`. Only rename if it has to
      // be renamed
      "no-useless-rename": ["error"],
    },
  },
];
