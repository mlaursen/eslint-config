declare module "eslint-plugin-react-hooks" {
  import { type TSESLint } from "@typescript-eslint/utils";

  interface ReactHooksPlugin extends TSESLint.FlatConfig.Plugin {
    configs: {
      recommended: {
        plugins: readonly string[];
        rules: TSESLint.FlatConfig.Rules;
      };
    };
  }

  const plugin: ReactHooksPlugin;

  export default plugin;
}
