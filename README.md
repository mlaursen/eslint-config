# eslint-config

A reusable eslint config that I use for most of my projects.

Starting at `5.0.0`, I only support `eslint@^9` or greater.

## Installation

```sh
npm install -D eslint @mlaursen/eslint-config
```

Then create an `eslint.config.mjs` with one of the following:

```js
// @ts-check
import { configs, gitignore } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

// somewhat strict type checking
export default defineConfig([
  gitignore(import.meta.url),
  ...configs.frontend("jest"),
]);

// somewhat strict type checking with react compiler
export default defineConfig([
  gitignore(import.meta.url),
  ...configs.frontend("jest", true),
]);

// or with vitest
// export default defineConfig(
//   gitignore(import.meta.url),
//   ...configs.frontend("vitest")
// );

// or with vitest and react compiler
// export default defineConfig(
//   gitignore(import.meta.url),
//   ...configs.frontend("vitest", true)
// );
```

```js
// @ts-check
import { configs, gitignore } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

// strict type checking
export default defineConfig([
  gitignore(import.meta.url),
  ...configs.frontendTypeChecking(import.meta.dirname, "jest"),
]);

// strict type checking with react compiler
export default defineConfig([
  gitignore(import.meta.url),
  ...configs.frontendTypeChecking(import.meta.dirname, "jest", true),
]);

// or with vitest
// export default defineConfig(
//   gitignore(import.meta.url),
//   ...configs.frontendTypeChecking(import.meta.dirname, "vitest")
// );

// or with vitest and react compiler
// export default defineConfig(
//   gitignore(import.meta.url),
//   ...configs.frontendTypeChecking(import.meta.dirname, "vitest", true)
// );
```

```js
// @ts-check
import { configs, gitignore } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

// NOTE: This is recommended for strict type checking. Callable as:
// `cross-env STRICT_TYPING=true eslint "**/*.{ts,tsx,mts,mtsx,js,jsx,mjs,cjs}`
//
// strict type checking with an environment variable. uncomment the following
// line to enable it in your editor
// const strict = true || process.env.STRICT_TYPING === 'true';
const strict = process.env.STRICT_TYPING === "true";
const reactCompiler = false;
const frontend = strict
  ? configs.frontendTypeChecking(import.meta.dirname, "jest", reactCompiler)
  : configs.frontend("jest", reactCompiler);

// or with vitest
// const frontend = strict
//   ? configs.frontendTypeChecking(import.meta.dirname, "vitest", reactCompiler)
//   : configs.frontend("vitest", reactCompiler);
export default defineConfig([gitignore(import.meta.url), ...frontend]);
```

## Next.js Setup

This is no longer included in this eslint-config since it requires the eslint
plugin to be installed in the project to work. Here are the setup steps:

```sh
npm install -D @eslint/eslintrc @next/eslint-plugin-next
yarn add -D @eslint/eslintrc @next/eslint-plugin-next
pnpm add -D @eslint/eslintrc @next/eslint-plugin-next
```

### Next.js >= 16

```diff
 import { configs, gitignore } from "@mlaursen/eslint-config";
 import { defineConfig } from "eslint/config";
+import nextPlugin from "@next/eslint-plugin-next";

 // somewhat strict type checking
 export default defineConfig([
+  nextPlugin.configs["core-web-vitals"],
   gitignore(import.meta.url),
   ...configs.frontend("jest"),
 ]);
```

### Next.js < 16

```diff
 // @ts-check
+import { FlatCompat } from "@eslint/eslintrc";
 import { configs, gitignore } from "@mlaursen/eslint-config";
 import { defineConfig } from "eslint/config";

+const compat = new FlatCompat({
+  baseDirectory: import.meta.dirname,
+});
+

 // somewhat strict type checking
 export default defineConfig([
   gitignore(import.meta.url),
+  ...compat.config({
+    extends: ["plugin:@next/next/recommended"],
+    // or with core-web-vitals
+    // extends: ["plugin:@next/next/core-web-vitals"],
+  }),
   ...configs.frontend("jest"),
 ]);
```

## Configs

I normally just use the `frontend` or `frontendTypeChecking` configs, but the
others can be used individually if needed.

<!-- toc -->

- [base](#base)
- [scripts](#scripts)
- [typescript](#typescript)
- [typescriptTypeChecking](#typescripttypechecking)
- [testing](#testing)
- [jest](#jest)
- [jestDom](#jestdom)
- [vitest](#vitest)
- [testingLibraryReact](#testinglibraryreact)
- [testingLibraryDom](#testinglibrarydom)
- [react](#react)
- [jsxA11y](#jsxa11y)
- [frontend](#frontend)
- [frontendTypeChecking](#frontendtypechecking)

<!-- tocstop -->

### base

The base config is automatically used by the [typescript](#typescript) config and is just the `eslint.configs.recommended` and a few other stylistic changes.

> This should not be used if the [typescript](#typescript) or [typescriptTypeChecking](#typescripttypechecking) configs are used.

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.base);
```

### scripts

The scripts config is used to allow `console.log()` functions in `scripts/**`:

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([...configs.base, ...configs.scripts]);
```

### typescript

This extends the [base](#base) config and the `tseslint.configs.strict` config. It also includes a few stylistic choices for type
behavior and disabled strict rules in test files.

> Only this rule or [typescripttypechecking](#typescripttypechecking) should be used. They should not be used together.

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.typescript);
```

### typescriptTypeChecking

This is the same as the [typescript](#typescript) config but also includes the `tseslint.configs.strictTypeCheckedOnly` config.

> Only this rule or [typescript](#typescript) should be used. They should not be used together.

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(
  configs.typescriptTypeChecking(import.meta.dirname)
);
```

### testing

This enables the [jest](#jest) or [vitest](#vitest) rules along with [jestDom](#jestdom).

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.testing("jest"));

// or vitest
export default defineConfig(configs.testing("vitest"));
```

### jest

This only enables the `eslint-plugin-jest.configs['flat/recommended]` rules on tests files and should not be used if using [testing](#testing).

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.jest);
```

### jestDom

This only enables the `eslint-plugin-jest-dom.configs['flat/recommended]` rules on tests files and should not be used if using [testing](#testing).

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.jestDom);
```

### vitest

This only enables the `@vitest/eslint-plugin` rules on test files and should not be used if using [testing](#testing).

### testingLibraryReact

This enables the `eslint-plugin-testing-library/.configs["flat/react]` plugin and rules on test files.

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.vitest);
```

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.testingLibraryReact);
```

### testingLibraryDom

This enables the `eslint-plugin-testing-library/.configs["flat/dom]` plugin and rules on test files.

> This should **not** be used with the [testingLibraryReact](#testinglibraryreact) rules

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.testingLibraryDom);
```

### react

This enables the `eslint-plugin-react` and `eslint-plugin-react-hooks`:

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.react());

// or with the react compiler rules enabled
export default defineConfig(configs.react(true));
```

### jsxA11y

This enables `eslint-plugin-jsx-a11y`:

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.jsxA11y);
```

### frontend

This is my normal frontend repo setup with `react`, `jsxA11y`, `jest` or
`vitest`, `jest-dom`, `typescript`, `testing-library/react`.

```js
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(configs.frontend("jest"));

// or with the react compiler rules enabled
export default defineConfig(configs.frontend("jest", true));

// or with vitest
export default defineConfig(configs.frontend("vitest"));

// or with the react compiler rules enabled
export default defineConfig(configs.frontend("vitest", true));
```

### frontendTypeChecking

Same as the [frontend](#frontend), but enables the strict type checking.

```ts
// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(
  configs.frontendTypeChecking(import.meta.dirname, "jest")
);

// or with the react compiler rules enabled
export default defineConfig(
  configs.frontendTypeChecking(import.meta.dirname, "jest"),
  true
);

// or with vitest
export default defineConfig(
  configs.frontendTypeChecking(import.meta.dirname, "vitest")
);
// or with the react compiler rules enabled
export default defineConfig(
  configs.frontendTypeChecking(import.meta.dirname, "vitest"),
  true
);
```
