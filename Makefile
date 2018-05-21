MOCHA := ./node_modules/.bin/mocha
ESLINT := ./node_modules/.bin/eslint
ROLLUP := ./node_modules/.bin/rollup

all: lint test

ci: ensure-built lint test

lint:
	@$(ESLINT) .

test:
	@$(MOCHA) --recursive --reporter dot --require esm

build:
	@$(ROLLUP) --external xpath-analyzer,xpath-analyzer/lib/expr_type,xpath-analyzer/lib/axis_specifier,xpath-analyzer/lib/node_type --format cjs --file dist/xpath_evaluator.cjs.js --output.exports named lib/xpath_evaluator.js
	@$(ROLLUP) --external xpath-analyzer,xpath-analyzer/lib/expr_type,xpath-analyzer/lib/axis_specifier,xpath-analyzer/lib/node_type --format es --file dist/xpath_evaluator.esm.js lib/xpath_evaluator.js

ensure-built: build
	@[ -z "$(shell git status -s dist/)" ]

.PHONY: lint test build ensure-built
