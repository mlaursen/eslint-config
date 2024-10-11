import { fixupPluginRules } from "@eslint/compat";
import { type TSESLint } from "@typescript-eslint/utils";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import { TEST_FILES } from "./constants";

const testingLibrary: TSESLint.FlatConfig.Config = {
  files: TEST_FILES,
  plugins: {
    // @ts-expect-error There is a bad typing atm
    "testing-library": fixupPluginRules(testingLibraryPlugin),
  },
};

/**
 * NOTE: Only choose this or the {@link testingLibraryDom}. Do not use
 * both.
 */
export const testingLibraryReact: TSESLint.FlatConfig.ConfigArray = [
  {
    ...testingLibrary,
    rules: {
      ...testingLibraryPlugin.configs["flat/react"].rules,
    },
  },
];

/**
 * NOTE: Only choose this or the {@link testingLibraryReact}. Do not use
 * both.
 */
export const testingLibraryDom: TSESLint.FlatConfig.ConfigArray = [
  {
    ...testingLibrary,
    rules: {
      ...testingLibraryPlugin.configs["flat/dom"].rules,
    },
  },
];
