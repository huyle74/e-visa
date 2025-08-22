import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends("prettier"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
      "react/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
      "react/jsx-closing-bracket-location": [
        "off",
        { nonEmpty: "after-props", selfClosing: "line-aligned" },
      ],
      "@next/next/no-img-element": "off",
    },

    settings: { react: { version: "detect" } },
  },
];

export default eslintConfig;
