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
    'no-use-before-define': 'warn',

    'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(
      confusingBrowserGlobals
    ),

    // too many false positives with aliases/root dirs
    'import/no-unresolved': 'off',

    curly: 'error',

    'object-shorthand': ['error', 'always'],
    'no-useless-rename': ['error'],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        // I want correct tsdoc syntax
        'tsdoc/syntax': 'warn',

        'react/prop-types': 'off',

        // have to disable since it can report incorrect errors
        'no-empty-function': 'off',

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
        '@typescript-eslint/ban-types': 'off',

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

        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'warn',
          { ignoreTypeReferences: true },
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
        'prefer-template': 'off',

        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-function': 'off',

        'jsx-a11y/no-autofocus': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/control-has-associated-label': 'off',

        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react/prefer-stateless-function': 'off',
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
