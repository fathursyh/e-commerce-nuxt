// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here

  {
    rules: {
      "semi": ["error", "always"],

      "comma-dangle": ["error", "always-multiline"],

      // Double quotes required
      "quotes": ["error", "double", { avoidEscape: true }],

      // Comma spacing
      "comma-spacing": ["error", { before: false, after: true }],

      // Key spacing in objects
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],

      // Arrow function parentheses (always)
      "arrow-parens": ["error", "always"],

      // Consistent spacing inside braces
      "object-curly-spacing": ["error", "always"],

      // No unused variables (Nuxt auto imports can cause false positives)
      "no-unused-vars": ["warn"],
      "space-before-function-paren": ["error", "never"],
      "no-multi-spaces": ["error"],
      "no-trailing-spaces": ["error"],
    },

  },
);
