import { type TSESLint } from "@typescript-eslint/utils";
import jestPlugin from "eslint-plugin-jest";
import jestDomPlugin from "eslint-plugin-jest-dom";
import { TEST_FILES } from "./constants";

export const jest: TSESLint.FlatConfig.ConfigArray = [
  {
    files: TEST_FILES,
    ...jestPlugin.configs["flat/recommended"],
  },
];

export const jestDom: TSESLint.FlatConfig.ConfigArray = [
  {
    files: TEST_FILES,
    ...jestDomPlugin.configs["flat/recommended"],
  },
];
