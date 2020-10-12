const confusingBrowserGlobals = require('confusing-browser-globals');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['@typescript-eslint', 'jest', 'jsx-a11y', 'react-hooks'],
  env: {
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
      version: 'detect',
    },
  },
  rules: {
    'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(
      confusingBrowserGlobals
    ),

    // too many false positives with aliases/root dirs
    'import/no-unresolved': 0,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'react/prop-types': 0,

        // I prefer shorthand syntax
        '@typescript-eslint/array-type': ['error', { default: 'array' }],

        // I prefer using `interface` over `type = {}`
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],

        // Allow expressions to work with react hooks. Annoying to have to typedef each arrow
        // function in a useEffect or useCallback when it can be derived.
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            // allow FC definitions for React
            allowTypedFunctionExpressions: true,
          },
        ],

        // I don't like type casting
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',

        '@typescript-eslint/prefer-ts-expect-error': 'error',

        // not a big fan of requiring unknown objects to require the index signature
        '@typescript-eslint/ban-types': 0,
      },
    },
    {
      files: ['**/__tests__/**', '**/*.test.*'],
      extends: ['plugin:jest/recommended'],
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
        'react/prefer-stateless-function': 0,
      },
    },
  ],
};
