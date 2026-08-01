import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'
import * as regex from '@lvce-editor/eslint-plugin-regex'
import * as tsconfig from '@lvce-editor/eslint-plugin-tsconfig'

export default defineConfig([
  ...config.default,
  ...config.recommendedVirtualDom,
  ...config.recommendedActions,
  ...tsconfig.default,
  ...regex.default,
  {
    files: ['**/test/**/*.ts'],
    rules: {
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
    },
  },
])
