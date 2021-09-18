module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', 'prettier'],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    camelcase: [
      2,
      {
        properties: 'never',
      },
    ],
    'consistent-return': 0,
    'array-callback-return': 0,
    'no-return-assign': 0,
    'max-len': 0,
    'no-undef': 0,
    'no-param-reassign': 0,
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    'no-underscore-dangle': 0,
    'prefer-destructuring': 0,
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^@?\\w',
            // Side effect imports.
            '^\\u0000',
            // Internal packages.
            '^(controllers|constants|server|graphql|models|services|swagger|utils)(/.*|$)',
            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // Other relative imports. Put same-folder imports and `.` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
  parser: 'babel-eslint',
};
