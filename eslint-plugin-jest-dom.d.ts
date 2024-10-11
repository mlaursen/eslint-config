declare module "eslint-plugin-jest-dom" {
  import { type TSESLint } from "@typescript-eslint/utils";

  interface JestDomPluginConfig {
    plugins: {
      jest: TSESLint.FlatConfig.Plugin;
    };
    rules: TSESLint.FlatConfig.Rules;
  }

  interface JestDomPlugin extends TSESLint.FlatConfig.Plugin {
    configs: {
      "flat/all": JestDomPluginConfig;
      "flat/recommended": JestDomPluginConfig;
    };
  }
  declare const plugin: JestDomPlugin;

  export default plugin;
}
