# eslint-config

A reusable eslint config that I use for most of my projects.

Starting at `5.0.0`, I only support `eslint@^9` or greater.

## Installation

```sh
npm install -D eslint @mlaursen/eslint-config
```

Then create an `eslint.config.mjs` with the following:

```js
// @ts-check
import { config, configs, gitignore } from "@mlaursen/eslint-config";

// choose the config you want to use:
// somewhat strict type checking
export default config(gitignore(import.meta.url), ...configs.frontend);

// strict type checking
export default config(gitignore(import.meta.url), ...configs.frontendTypeChecking(import.meta.dirname));

// NOTE: This is recommended for strict type checking. Callable as:
// `cross-env STRICT_TYPING=true eslint "**/*.{ts,tsx,mts,mtsx,js,jsx,mjs,cjs}`
//
// strict type checking with an environment variable. uncomment the following
// line to enable it in your editor
// const strict = true || process.env.STRICT_TYPING === 'true';
const strict = process.env.STRICT_TYPING === 'true';
const frontend = strict ? configs.frontendTypeChecking(import.meta.dirname) : configs.frontend
export default config(gitignore(import.meta.url), ...frontend);
```

The `config` export is the `typescript-eslint.config()` function to provide type
definitions and `gitignore` automatically ignores files from linting based on
your `.gitignore` rules.

## Configs

I normally just use the `frontend` or `frontendTypeChecking` configs, but the
others can be used individually if needed.

<!--toc:start-->

- [base](#base)
- [typescript](#typescript)
- [typescriptTypeChecking](#typescripttypechecking)
- [jest](#jest)
- [jestDom](#jestdom)
- [testingLibraryReact](#testinglibraryreact)
- [testingLibraryDom](#testinglibrarydom)
- [react](#react)
- [jsxA11y](#jsxa11y)
- [next](#next)
- [frontend](#frontend)
- [frontendTypeChecking](#frontendtypechecking)

<!--toc:end-->

### base

The base config is automatically used by the [typescript](#typescript) config and is just the `eslint.configs.recommended` and a few other stylistic changes.

> This should not be used if the [typescript](#typescript) or [typescriptTypeChecking](#typescripttypechecking) configs are used.

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.base);
```

### typescript

This extends the [base](#base) config and the `tseslint.configs.strict` config. It also includes a few stylistic choices for type
behavior and disabled strict rules in test files.

> Only this rule or [typescripttypechecking](#typescripttypechecking) should be used. They should not be used together.

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.typescript);
```

### typescriptTypeChecking

This is the same as the [typescript](#typescript) config but also includes the `tseslint.configs.strictTypeCheckedOnly` config.

> Only this rule or [typescript](#typescript) should be used. They should not be used together.

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.typescriptTypeChecking(import.meta.dirname));
```

### jest

This only enables the `eslint-plugin-jest.configs['flat/recommended]` rules on tests files.

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.jest);
```

### jestDom

This only enables the `eslint-plugin-jest-dom.configs['flat/recommended]` rules on tests files.

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.jestDom);
```

### testingLibraryReact

This enables the `eslint-plugin-testing-library/.configs["flat/react]` plugin and rules on test files.

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.testingLibraryReact);
```

### testingLibraryDom

This enables the `eslint-plugin-testing-library/.configs["flat/dom]` plugin and rules on test files.

> This should **not** be used with the [testingLibraryReact](#testinglibraryreact) rules

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.testingLibraryDom);
```

### react

This enables the `eslint-plugin-react` and `eslint-plugin-react-hooks`:

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.react);
```

### jsxA11y

This enables `eslint-plugin-jsx-a11y`:

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.jsxA11y);
```

### next

This is a small wrapper around the `@next/eslint-plugin-next` that works with eslint v9.

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.next);
```

### frontend

This is my normal frontend repo setup with `react`, `jsxA11y`, `jest`,
`jest-dom`, `typescript`, `testing-library/react`.

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.frontend);
```

### frontendTypeChecking

Same as the [frontend](#frontend), but enables the strict type checking.

```js
// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.frontendTypeChecking(import.meta.dirname));
```
