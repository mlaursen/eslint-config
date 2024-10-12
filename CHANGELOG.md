# @mlaursen/eslint-config

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
