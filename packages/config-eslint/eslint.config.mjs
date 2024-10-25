import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import jestPlugin from 'eslint-plugin-jest'

export default tseslint.config(
	{
		ignores: ['**/dist/**', '**/.dist/**'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.recommended,
	eslintConfigPrettier,
	eslintPluginPrettier,
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			jest: jestPlugin,
		},
		languageOptions: {
			parserOptions: {
				projectService: { allowDefaultProject: ['*.js', '*.mjs'] },
			},
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				node: true,
				commonjs: true,
			},
		},
	},
	{
		// disable type-aware linting on JS files
		files: ['**/*.js', '**/*.mjs'],
		...tseslint.configs.disableTypeChecked,
	},
	{
		// enable jest rules on test files
		files: ['**/*.test.ts'],
		...jestPlugin.configs['flat/recommended'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
		},
	},
)
