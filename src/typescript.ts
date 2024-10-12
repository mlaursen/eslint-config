import { type TSESLint } from "@typescript-eslint/utils";
import tseslint from "typescript-eslint";
import { base } from "./base";
import { TEST_FILES } from "./constants";

export const typescript: TSESLint.FlatConfig.ConfigArray = [
  ...base,
  ...tseslint.configs.strict,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // I prefer specifying when something is used only as a type
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports" },
      ],

      // I prefer shorthand syntax
      "@typescript-eslint/array-type": ["error", { default: "array" }],

      // I prefer using `interface` over `type = {}`
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // Allow expressions to work with react hooks. Annoying to have to
      // typedef each arrow function in a `useEffect` or `useCallback` when
      // it can be derived.
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          // allow FC definitions for React
          allowTypedFunctionExpressions: true,
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": [
        "warn",
        { ignoreTypeReferences: true },
      ],
    },
  },
  {
    files: TEST_FILES,
    rules: {
      // allow tests to be less strict
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-object-literal-type-assertion": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
];

/**
 * @example
 * ```ts
 * // @ts-check
 * import { config, configs } from "@mlaursen/eslint-config";
 *
 * export default config(...configs.typescriptTypeChecking(import.meta.dirname));
 * ```
 */
export const typescriptTypeChecking = (
  tsconfigRootDir: string
): TSESLint.FlatConfig.ConfigArray => [
  ...typescript,
  ...tseslint.configs.strictTypeCheckedOnly,
  {
    rules: {
      // I do not enable the `noUncheckedIndexedAccess` tsconfig option, so I
      // still need to verify that stuff exists. There are other cases where I
      // know it exists, so I can ignore those as well
      "@typescript-eslint/no-unnecessary-condition": "off",

      // I never use `this`
      "@typescript-eslint/unbound-method": "off",

      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
        },
      ],

      // I want to allow `onClick={async (event) => { ... }}`
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
    },
  },
  {
    files: TEST_FILES,
    rules: {
      // like base typescript, can be less strict in tests
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
  },
];
