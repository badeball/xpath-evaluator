import Functions from "../functions";

export default function evaluate (rootEvaluator, ast, context, type) {
  var args = (ast.args || []).map(function (arg) {
    return rootEvaluator.evaluate(arg, context, type);
  });

  args.unshift(context);

  var functionEvaluator = Functions[ast.name];

  if (functionEvaluator) {
    return functionEvaluator.apply(null, args);
  } else {
    throw new Error("Unknown function " + ast.name);
  }
}
