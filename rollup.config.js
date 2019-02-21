import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  external: ["xpath-lexer", "xpath-analyzer"],
  input: "lib/xpath_evaluator.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  plugins: [
    typescript({ tsconfigOverride: { exclude: ["test/**/*.ts"] } })
  ]
};
