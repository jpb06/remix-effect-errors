/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: { browser: true, commonjs: true, es6: true },
  ignorePatterns: ['!**/.server', '!**/.client'],

  // Base config
  extends: ['eslint:recommended'],

  overrides: [
    // React
    {
      files: ['**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json'],
      },
      plugins: ['react', '@typescript-eslint', 'import', 'jsx-a11y'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
      },
      rules: {
        'import/order': [
          'error',
          {
            alphabetize: { caseInsensitive: true, order: 'asc' },
            groups: ['builtin', 'external', 'parent', 'sibling'],
            'newlines-between': 'always',
            pathGroups: [],
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
        'react/jsx-no-leaked-render': [
          'warn',
          { validStrategies: ['ternary'] },
        ],
        'react/self-closing-comp': ['error'],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        eqeqeq: 'error',
        complexity: [
          'error',
          {
            max: 15,
          },
        ],
        curly: 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'no-unneeded-ternary': 'error',
        'prefer-arrow-callback': 'error',
        'no-else-return': 'error',
        'no-useless-return': 'error',
        'no-console': [
          'error',
          {
            allow: ['warn', 'error', 'info'],
          },
        ],
        'array-callback-return': [
          'error',
          {
            allowImplicit: true,
          },
        ],
      },
    },

    // Typescript
    {
      files: ['**/*.ts'],
      plugins: ['@stylistic/js', 'prettier', '@typescript-eslint', 'import'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        'plugin:import/recommended',
        'plugin:prettier/recommended',
        'plugin:import/typescript',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        'import/order': [
          'error',
          {
            alphabetize: { caseInsensitive: true, order: 'asc' },
            groups: ['builtin', 'external', 'parent', 'sibling'],
            'newlines-between': 'always',
            pathGroups: [],
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
        '@stylistic/js/semi': 'error',
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        eqeqeq: 'error',
        complexity: [
          'error',
          {
            max: 15,
          },
        ],
        curly: 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'no-unneeded-ternary': 'error',
        'prefer-arrow-callback': 'error',
        'no-else-return': 'error',
        'no-useless-return': 'error',
        'no-console': [
          'error',
          {
            allow: ['warn', 'error', 'info'],
          },
        ],
        'array-callback-return': [
          'error',
          {
            allowImplicit: true,
          },
        ],
      },
    },

    // Node
    {
      files: ['.eslintrc.cjs', 'postcss.config.js', 'remix.config.js'],
      env: {
        node: true,
      },
    },
  ],
};
