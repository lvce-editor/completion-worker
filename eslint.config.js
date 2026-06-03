import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'
import * as regex from '@lvce-editor/eslint-plugin-regex'
import * as tsconfig from '@lvce-editor/eslint-plugin-tsconfig'

export default [...config.default, ...actions.default, ...tsconfig.default, ...regex.default]
