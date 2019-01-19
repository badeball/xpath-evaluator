import pkg from "./package.json";

export default {
  external: ["xpath-lexer", "xpath-analyzer"],
  input: "lib/xpath_evaluator.js",
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
  ]
};
