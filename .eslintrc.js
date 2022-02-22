module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
    jest: true,
    "node": true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never',
    }],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'var', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'max-len': ['warn', { code: 150 }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
      alias: {
        map: [
          ['@', `${__dirname}/src`],
        ],
        extensions: ['.js', '.vue'],
      },
    },
  },
};
