import globals from "globals";

const { jest: jestGlobals, node: nodeGlobals } = globals;

export default [
	{
		files: ["**/*.js"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...nodeGlobals,
				...jestGlobals,
			},
		},
		rules: {
			"no-unused-vars": "warn",
			"no-console": "off",
		},
	},
];
