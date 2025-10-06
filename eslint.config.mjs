import js from "@eslint/js";
import globals, { jest } from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.browser },
		env: { jest: true, node: true },
	},
	pluginReact.configs.flat.recommended,
]);
