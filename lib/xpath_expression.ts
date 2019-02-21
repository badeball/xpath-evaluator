import XPathAnalyzer, { ExprNode } from "xpath-analyzer";

import {
  ABSOLUTE_LOCATION_PATH,
  ADDITIVE,
  AND,
  DIVISIONAL,
  EQUALITY,
  FILTER,
  FUNCTION_CALL,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL,
  INEQUALITY,
  LESS_THAN,
  LESS_THAN_OR_EQUAL,
  LITERAL,
  MODULUS,
  MULTIPLICATIVE,
  NEGATION,
  NUMBER,
  OR,
  PATH,
  RELATIVE_LOCATION_PATH,
  SUBTRACTIVE,
  UNION
} from "xpath-analyzer";

import {
  AdapterType,
  XPathResultType,
  XPathValue
} from "./types.d";

import Context from "./context";

import {
  AbsoluteLocationPath,
  Additive,
  And,
  Divisional,
  Equality,
  Filter,
  FunctionCall,
  GreaterThan,
  GreaterThanOrEqual,
  Inequality,
  LessThan,
  LessThanOrEqual,
  Literal,
  Modulus,
  Multiplicative,
  Negation,
  Number_,
  Or,
  Path,
  RelativeLocationPath,
  Subtractive,
  Union
} from "./evaluators";

import XPathResult from "./xpath_result";

export interface RootEvaluator<T> {
  evaluate: (ast: ExprNode, context: Context<T>, type: XPathResultType) => XPathValue<T>
}

export default class XPathExpression<T> {
  private ast: ExprNode;
  private adapter: AdapterType<T>;

  constructor(expression: string, adapter: AdapterType<T>) {
    this.ast = new XPathAnalyzer(expression).parse();
    this.adapter = adapter;
  }

  evaluate(nativeContext: T, type: XPathResultType): XPathResult<T> {
    var Adapter = this.adapter;

    var evaluate = (ast: ExprNode, context: Context<T>, type: XPathResultType): XPathValue<T> => {
      switch (ast.type) {
        case ABSOLUTE_LOCATION_PATH:
          return AbsoluteLocationPath<T>({ evaluate }, ast, context, type);
        case ADDITIVE:
          return Additive<T>({ evaluate }, ast, context, type);
        case AND:
          return And<T>({ evaluate }, ast, context, type);
        case DIVISIONAL:
          return Divisional<T>({ evaluate }, ast, context, type);
        case EQUALITY:
          return Equality<T>({ evaluate }, ast, context, type);
        case FILTER:
          return Filter<T>({ evaluate }, ast, context, type);
        case FUNCTION_CALL:
          return FunctionCall<T>({ evaluate }, ast, context, type);
        case GREATER_THAN:
          return GreaterThan<T>({ evaluate }, ast, context, type);
        case GREATER_THAN_OR_EQUAL:
          return GreaterThanOrEqual<T>({ evaluate }, ast, context, type);
        case INEQUALITY:
          return Inequality<T>({ evaluate }, ast, context, type);
        case LESS_THAN:
          return LessThan<T>({ evaluate }, ast, context, type);
        case LESS_THAN_OR_EQUAL:
          return LessThanOrEqual<T>({ evaluate }, ast, context, type);
        case LITERAL:
          return Literal<T>({ evaluate }, ast, context, type);
        case MODULUS:
          return Modulus<T>({ evaluate }, ast, context, type);
        case MULTIPLICATIVE:
          return Multiplicative<T>({ evaluate }, ast, context, type);
        case NEGATION:
          return Negation<T>({ evaluate }, ast, context, type);
        case NUMBER:
          return Number_<T>({ evaluate }, ast, context, type);
        case OR:
          return Or<T>({ evaluate }, ast, context, type);
        case PATH:
          return Path<T>({ evaluate }, ast, context, type);
        case RELATIVE_LOCATION_PATH:
          return RelativeLocationPath<T>({ evaluate }, ast, context, type);
        case SUBTRACTIVE:
          return Subtractive<T>({ evaluate }, ast, context, type);
        case UNION:
        return Union<T>({ evaluate }, ast, context, type);
      }
    };

    var value = evaluate(this.ast, new Context(new Adapter(nativeContext), 1, 1), type);

    return new XPathResult<T>(type, value);
  }
}
