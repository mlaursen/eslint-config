import { includeIgnoreFile } from "@eslint/compat";
import { type Linter } from "eslint";
import { fileURLToPath } from "node:url";

/**
 * @example
 * ```ts
 * import { configs, gitignore } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig([gitignore(import.meta.url), ...configs.typescript]);
 * ```
 *
 * @example .gitignore in a different folder
 * ```ts
 * import { configs, gitignore } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 * import { join } from "node:path";
 *
 * export default defineConfig([
 *   gitignore(join(import.meta.url, "..", "..")),
 *   ...configs.typescript,
 * ]);
 * ```
 */
export function gitignore(importMetaUrl: string): Linter.Config {
  return includeIgnoreFile(fileURLToPath(new URL(".gitignore", importMetaUrl)));
}
