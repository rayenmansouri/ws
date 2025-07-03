import tseslint from "typescript-eslint";
import maxParamsNoConstructor from "eslint-plugin-max-params-no-constructor";

export default [
  {
    files: ["src/**/*.ts"],
    plugins: {
      "max-params-no-constructor": maxParamsNoConstructor,
    },
    rules: {
      "@typescript-eslint/no-empty-object-type": "warn",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "inversify",
              importNames: ["inject"],
              message: "Please use the custom typed inject decorator instead",
            },
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "import",
          next: "*",
        },
        { blankLine: "any", prev: "import", next: "import" },
      ],
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowNullableBoolean: false,
          allowNullableString: true,
        },
      ],
      "max-params-no-constructor/max-params-no-constructor": ["error", 3],
      "no-console": ["error"],
    },
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
      },
    },
  },
  {
    files: ["*.controller.ts", "src/core/*"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/only-throw-error": "off",
    },
  },
  {
    ignores: [
      ".vscode/",
      "node_modules/",
      "build/",
      "dist/",
      "tools/",
      "pdf/",
      "coverage/",
      "jestGlobalSetup.js",
      "jestGlobalTeardown.js",
      "webschool-types/",
      "**/*.mjs",
      "**/*.js",
    ],
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/unbound-method": "off",
    },
  },
];
