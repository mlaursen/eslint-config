import { type TSESLint } from "@typescript-eslint/utils";
import { jest, jestDom } from "./jest";
import { jsxA11y } from "./jsxA11y";
import { react } from "./react";
import { testingLibraryReact } from "./testing-library";
import { typescript, typescriptTypeChecking } from "./typescript";

export const frontend: TSESLint.FlatConfig.ConfigArray = [
  ...typescript,
  ...react,
  ...jsxA11y,
  ...jest,
  ...jestDom,
  ...testingLibraryReact,
];

export const frontendTypeChecking = (
  tsconfigRootDir: string
): TSESLint.FlatConfig.ConfigArray => [
  ...typescriptTypeChecking(tsconfigRootDir),
  ...react,
  ...jsxA11y,
  ...jest,
  ...jestDom,
  ...testingLibraryReact,
];
