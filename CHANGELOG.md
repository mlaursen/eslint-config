# @mlaursen/eslint-config

## 10.0.2

### Patch Changes

- Bumped eslint rule dependencies to latest.

## 10.0.1

### Patch Changes

- Fixes
  - Add `settings.react.version = "detect"` to remove warning

  Features
  - Add new scripts config to allow console in `scripts/**`

## 10.0.0

### Major Changes

- ===
  Breaking Changes
  - Removed the default export
  - Removed the `defineConfig` re-export from `eslint/config`.

    ```diff
    -import { configs, defineConfig } from "@mlaursen/eslint-config";
    +import { configs } from "@mlaursen/eslint-config";
    +import { defineConfig } from "eslint/config";

    -export default defineConfig(
    +export default defineConfig([
       gitignore(import.meta.url),
       ...configs.frontend("jest")
    -)
    +])
    ```

  - Bumped `eslint-plugin-react-hooks` to the latest. The `react` config is now a
    function

    ```diff
     import { configs } from "@mlaursen/eslint-config";
     import { defineConfig } from "eslint/config";

     export default defineConfig([
       gitignore(import.meta.url),
    -  ...configs.react,
    +  ...configs.react(),
     ]);
    ```

  ===
  Features
  - Bumped dependencies to latest
  - Bumped `eslint-plugin-react-hooks` to v7 which supports the react compiler
    rules. Enable the react compiler flag to use the new rules

    ```diff
     // @ts-check
     import { configs, gitignore, type TestFramework } from "@mlaursen/eslint-config";
     import { defineConfig } from "eslint/config";

     const strict = process.env.STRICT_TYPING === "true";
     const testFramework: TestFramework = "jest";
    +const reactCompiler = true;
     const frontend = strict
    -  ? configs.frontendTypeChecking(import.meta.dirname, testFramework)
    -  : configs.frontend(testFramework);
    +  ? configs.frontendTypeChecking(import.meta.dirname, testFramework, reactCompiler)
    +  : configs.frontend(testFramework, reactCompiler);

     export default defineConfig([gitignore(import.meta.url), ...frontend]);

    ```

## 9.0.3

### Patch Changes

- Update packages to latest without major versions.

## 9.0.2

### Patch Changes

- Hopefully fix eslint type mismatch

## 9.0.1

### Patch Changes

- Typescript definition fixes after switching to Linter.Config instead of TSEslint.Config.FlatConfig

## 9.0.0

### Major Changes

- Breaking changes:
  - Use `defineConfig` from `@eslintjs/config` instead of `config` from
    `typescript-eslint`. This requires the following changes:

  ```diff
   // @ts-check
  -import { config, configs, gitignore } from "@mlaursen/eslint-config";
  +import { defineConfig, configs, gitignore } from "@mlaursen/eslint-config";

   // somewhat strict type checking
  -export default config(
  +export default defineConfig(
     gitignore(import.meta.url),
     ...configs.frontend("jest")
   );
  ```

  Other changes:
  - Bumped dependencies to latest

## 8.0.3

### Patch Changes

- Bumped @eslint/js and eslint-plugin-testing-library to latest

## 8.0.2

### Patch Changes

- c0d08d8: Updated dependencies to latest
- Bumped safe dependencies to latest.

## 8.0.2-next.0

### Patch Changes

- Updated dependencies to latest

## 8.0.1

### Patch Changes

- Added missing rules after upgrading to eslint flat config. Also updated dependencies to latest.

## 8.0.1-next.0

### Patch Changes

- Added missing rules after upgrading to eslint flat config. Also updated dependencies to latest.

## 8.0.0

### Major Changes

- `frontend` and `frontendTypeChecking` are both functions that require a test framework to be provided
- `next` config is no longer included and instead shown on the README how to setup
- Added support for vitest
- 223e34e: Added support for vitest. This causes breaking changes by making the `frontend` and `frontendTypeChecking` to require a test framework to be provided.
- 865a0a2: Removed next.js eslint config since it requires the plugin to be installed in the project.

## 8.0.0-next.1

### Patch Changes

- Removed next.js eslint config since it requires the plugin to be installed in the project.

## 8.0.0-next.0

### Major Changes

- Added support for vitest. This causes breaking changes by making the `frontend` and `frontendTypeChecking` to require a test framework to be provided.

## 7.1.0

### Minor Changes

- 9b65a95: Updated dependencies to latest and update type definitions.

## 7.1.0-next.0

### Minor Changes

- Updated dependencies to latest and update type definitions.

## 7.0.0

### Major Changes

- 6a3b2a5: Updated to only support ESM
- I'm not sure if this is really a breaking change, but updated to be ESM.

## 7.0.0-next.0

### Major Changes

- Updated to only support ESM

## 6.1.0

### Minor Changes

- Updated dependencies and rules to the latest versions.

## 6.0.0

### Major Changes

- Updated dependencies for the latest eslint rules and behavior.
  - Bumped `eslint-plugin-testing-library` to v7.1.0
  - Bumped `@next/eslint-plugin-next` to v15.0.4

- Updated dependencies for the latest eslint rules and behavior.
  - Bumped `eslint-plugin-testing-library` to v7.1.0
  - Bumped `@next/eslint-plugin-next` to v15.0.4

## 6.0.0-next.0

### Major Changes

- Updated dependencies for the latest eslint rules and behavior.
  - Bumped `eslint-plugin-testing-library` to v7.1.0
  - Bumped `@next/eslint-plugin-next` to v15.0.4

## 5.2.0

### Minor Changes

- Features:
  - bump dependencies to latest

  Fixes:
  - Disabled `@typescript-eslint/unified-signatures` since you get better type inference with separate signatures
  - Disabled `no-undef` and removed globals since I use typescript

## 5.1.3

### Patch Changes

- The release focused on improving docs and debugging:
  - added a `name` to each configuration so it can be inspected more easily with `npx @eslint/config-inspector@latest`
  - added tsdoc to each configuration object so it can be viewed from editor
  - export `globals` so additional globals can be added easily
  - allow default export if you prefer `import mlaursenConfig from "@mlaursen/eslint-config` -> `export default mlaursenConfig.configs.typescript;`
  - added a few more typescript file types

## 5.1.2

### Patch Changes

- There were a few changes in this release:
  - attempt to fix the globals issue when using react/jsx-a11y
  - allow less strict typescript behavior in tests
  - fix some typescript rules that conflicted with base js
  - customize and disable some strict typescript rules since I don't always agree with them
  - require the dependency array for the `useIsomorphicLayoutEffect` hook

## 5.1.1

### Patch Changes

- Fixed missing react and jsx-a11y plugins.

## 5.1.0

### Minor Changes

- Added support for the next eslint plugin and ignoring files with .gitignore

## 5.0.0

### Major Changes

- Update the eslint config to use eslint@9 or greater. Also includes a few other new eslint rules.
