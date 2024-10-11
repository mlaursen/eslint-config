declare module "eslint-plugin-jest" {
  import { TSESLint } from "@typescript-eslint/utils";

  interface JestPluginConfig {
    plugins: {
      jest: TSESLint.FlatConfig.Plugin;
    };
    languageOptions: TSESLint.FlatConfig.LanguageOptions;
    rules: TSESLint.FlatConfig.Rules;
  }

  interface JestPlugin extends TSESLint.FlatConfig.Plugin {
    configs: {
      "flat/all": JestPluginConfig;
      "flat/recommended": JestPluginConfig;
      "flat/style": JestPluginConfig;
    };
  }

  const plugin: JestPlugin;

  export default plugin;
}
