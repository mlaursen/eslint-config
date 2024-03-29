# eslint-config

A reusable eslint config that I use for most of my projects.

## Usage

```js
module.exports = {
  extends: "@mlaursen/eslint-config",
};
```

## Additional Type Checking

Or if I want to do additional rules and strict type checking linting rules:

```js
module.exports = {
  extends: "@mlaursen/eslint-config",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  rules: {
    // any custom rules for this project
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
    },
    // any custom overrides for this project
  ],
};
```
