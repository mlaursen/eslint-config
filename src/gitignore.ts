import { includeIgnoreFile } from "@eslint/compat";
import { type TSESLint } from "@typescript-eslint/utils";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * @example
 * ```ts
 * import { config, configs, gitignore } from "@mlaursen/eslint-config";
 *
 * export default config(gitignore(import.meta.url), ...configs.typescript);
 * ```
 *
 * @example .gitignore in a different folder
 * ```ts
 * import { config, configs, gitignore } from "@mlaursen/eslint-config";
 * import { join } from "node:path";
 *
 * export default config(gitignore(join(import.meta.url, "..", "..")), ...configs.typescript);
 * ```
 */
export function gitignore(importMetaUrl: string): TSESLint.FlatConfig.Config {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = path.dirname(__filename);
  const gitignorePath = path.resolve(__dirname, ".gitignore");

  return includeIgnoreFile(gitignorePath);
}
