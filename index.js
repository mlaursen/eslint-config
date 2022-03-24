const confusingBrowserGlobals = require('confusing-browser-globals');

let react = false;
let isNewJsx = false;
try {
  require.resolve('react');
  react = true;
  isNewJsx = parseInt(require('react').version, 10) > 16;
} catch (e) {}

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    isNewJsx && 'plugin:react/jsx-runtime',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ].filter(Boolean),
  plugins: ['@typescript-eslint', 'jest', 'jsx-a11y', 'react-hooks', 'tsdoc'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: react ? 'detect' : '17.0.0',
    },
  },
  rules: {
    'no-console': 'warn',

    'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(
      confusingBrowserGlobals
    ),

    // too many false positives with aliases/root dirs
    'import/no-unresolved': 0,

    curly: 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        // I want correct tsdoc syntax
        'tsdoc/syntax': 'warn',

        'react/prop-types': 0,

        // have to disable since it can report incorrect errors
        'no-empty-function': 0,

        // I prefer shorthand syntax
        '@typescript-eslint/array-type': ['error', { default: 'array' }],

        // I prefer using `interface` over `type = {}`
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],

        // Allow expressions to work with react hooks. Annoying to have to
        // typedef each arrow function in a `useEffect` or `useCallback` when
        // it can be derived.
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            // allow FC definitions for React
            allowTypedFunctionExpressions: true,
          },
        ],

        // not a big fan of requiring unknown objects to require the index signature
        '@typescript-eslint/ban-types': 0,

        // This is a "better" version of the `noUnusedLocals` and
        // `noUnusedParameters` from the tsconfig.json since it can catch
        // unused vars in rest parameters that weren't meant to be omitted. I
        // must manually rename to be _name so I know it was intentionally
        // omitted
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
    {
      files: [
        'src/setupTests.js',
        'src/setupTests.ts',
        '**/__tests__/**',
        '**/*.test.*',
      ],
      env: {
        jest: true,
      },
      // allow for less strict rules when writing tests
      rules: {
        'prefer-template': 0,

        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-object-literal-type-assertion': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-empty-function': 0,

        'jsx-a11y/no-autofocus': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/control-has-associated-label': 0,

        'react/prop-types': 0,
        'react/display-name': 0,
        'react/prefer-stateless-function': 0,
      },
    },
    {
      files: ['**/__tests__/**', '**/*.test.*'],
      extends: ['plugin:jest/recommended'],
      rules: {
        // it's valid to do @jest-environment or other things in tests
        'tsdoc/syntax': 0,
      },
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        'no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],
};
