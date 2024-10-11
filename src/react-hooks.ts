import { type TSESLint } from "@typescript-eslint/utils";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export const reactHooks: TSESLint.FlatConfig.ConfigArray = [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
];
