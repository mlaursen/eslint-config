declare module "eslint-plugin-testing-library" {
  import { FixupPluginDefinition } from "@eslint/compat";
  import { TSESLint } from "@typescript-eslint/utils";

  interface TestingLibraryPluginConfig {
    plugins: {
      jest: TSESLint.FlatConfig.Plugin;
    };
    rules: TSESLint.FlatConfig.Rules;
  }

  interface TestingLibraryPlugin extends FixupPluginDefinition {
    configs: {
      "flat/dom": TestingLibraryPluginConfig;
      "flat/react": TestingLibraryPluginConfig;
      "flat/angular": TestingLibraryPluginConfig;
      "flat/vue": TestingLibraryPluginConfig;
      "flat/marko": TestingLibraryPluginConfig;
    };
  }
  declare const plugin: TestingLibraryPlugin;

  export default plugin;
}
