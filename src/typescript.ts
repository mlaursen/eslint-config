import { type Linter } from "eslint";
import tseslint from "typescript-eslint";
import { base } from "./base.js";
import { BASE_NAME, TEST_FILES, TS_FILES } from "./constants.js";

const customTypescript: Linter.Config[] = [
  {
    name: `${BASE_NAME}/typescript`,
    files: TS_FILES,
    rules: {
      // I normally do not want unified signatures since it helps improve type
      // inference with function overloading
      "@typescript-eslint/unified-signatures": "off",

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
    name: `${BASE_NAME}/typescript/tests`,
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
 * import { configs, gitignore } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig([
 *   gitignore(import.meta.url),
 *   ...configs.typescript,
 * ]);
 * ```
 */
export const typescript: Linter.Config[] = [
  ...base,
  ...tseslint.configs.strict,
  ...customTypescript,
];

/**
 * @example
 * ```ts
 * // @ts-check
 * import { configs, gitignore } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig([
 *   gitignore(import.meta.url),
 *   ...configs.typescriptTypeChecking(import.meta.dirname)
 * ]);
 * ```
 */
export const typescriptTypeChecking = (
  tsconfigRootDir: string
): Linter.Config[] => [
  ...typescript,
  ...tseslint.configs.strictTypeCheckedOnly,
  {
    name: `${BASE_NAME}/typescript-type-checking-language-options`,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
  },
  ...customTypescript,
  {
    name: `${BASE_NAME}/typescript-type-checking`,
    files: TS_FILES,
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
    name: `${BASE_NAME}/typescript-type-checking/tests`,
    files: TEST_FILES,
    rules: {
      // like base typescript, can be less strict in tests
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
    },
  },
];
