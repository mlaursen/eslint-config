declare module "eslint-plugin-jsx-a11y" {
  import { type TSESLint } from "@typescript-eslint/utils";

  interface JsxA11yPlugin extends TSESLint.FlatConfig.Plugin {
    configs: {
      recommended: TSESLint.FlatConfig.Rules;
      strict: JTSESLint.FlatConfig.RulesestPluginConfig;
    };
    flatConfigs: {
      recommended: TSESLint.FlatConfig.Rules;
      strict: JTSESLint.FlatConfig.RulesestPluginConfig;
    };
  }

  const plugin: JsxA11yPlugin;

  export default plugin;
}
