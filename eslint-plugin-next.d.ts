declare module "@next/eslint-plugin-next" {
  import { type TSESLint } from "@typescript-eslint/utils";

  interface NextPlugin extends TSESLint.FlatConfig.Plugin {
    configs: {
      recommended: {
        plugins: readonly string[];
        rules: TSESLint.FlatConfig.Rules;
      };
      "core-web-vitals": {
        plugins: readonly string[];
        extends: readonly string[];
        rules: TSESLint.FlatConfig.Rules;
      };
    };
  }

  const plugin: NextPlugin;

  export default plugin;
}
