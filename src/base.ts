import eslint from "@eslint/js";
import { type Linter } from "eslint";
import { BASE_NAME, DEV_WARNING_PROD_ERROR } from "./constants.js";

/**
 * @example
 * ```js
 * import { configs } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig(configs.base);
 * ```
 */
export const base: Linter.Config[] = [
  eslint.configs.recommended,
  {
    name: `${BASE_NAME}/base`,
    rules: {
      // I use typescript instead
      "no-undef": "off",

      // You normally do not want `console.{whatever}` in prod but is fine for
      // development in debugging
      "no-console": DEV_WARNING_PROD_ERROR,

      "no-var": "error",
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

      "no-eval": "error",
      "no-alert": "error",
      "no-lonely-if": "error",
      "no-else-return": "error",
      eqeqeq: "error",

      // 100% stylistic, but do not allow `a = b = c = "whatever"` / `let a = whatever, b = whatever, c = whatever;`
      // these should be different statements
      "no-multi-assign": "error",
      "no-sequences": "error",

      // use template strings instead
      "no-multi-str": "error",

      // better to use new variables most of the time
      "no-param-reassign": "error",

      // i'd never hit these, but who trusts other people and AI?
      "no-return-assign": "error",
      "no-script-url": "error",
    },
  },
];
