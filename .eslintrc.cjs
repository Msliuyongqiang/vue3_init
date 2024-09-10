/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    './.eslintrc-auto-import.json'
  ],
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly',
    ElNotification: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    indent: [2, 2, { SwitchCase: 1 }],
    'prettier/prettier': [2, { tabWidth: 2, endOfLine: 'auto' }],
    'vue/multi-word-component-names': 0
  }
}
