import { includeIgnoreFile } from "@eslint/compat";
import { type TSESLint } from "@typescript-eslint/utils";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function gitignore(importMetaUrl: string): TSESLint.FlatConfig.Config {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = path.dirname(__filename);
  const gitignorePath = path.resolve(__dirname, ".gitignore");

  return includeIgnoreFile(gitignorePath);
}
