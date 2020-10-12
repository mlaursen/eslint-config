# eslint-config

A reusable eslint config that I use for most of my projects.

## Usage

```js
module.exports = {
  extends: "@mlaursen/eslint-config",
  // this is required since some of the @typescript-eslint rules require type information
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  rules: {
    // any custom rules for this project
  },
  overrides: [
    // any custom overrides for this project
  ],
};
```
