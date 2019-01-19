MOCHA := ./node_modules/.bin/mocha
ROLLUP := ./node_modules/.bin/rollup
DTS := ./node_modules/.bin/dts-bundle-generator

all: test

ci: ensure-built test

lint:
	echo "Not yet implemented"
	false

test:
	$(MOCHA) --recursive --reporter dot --require ts-node/register "test/**/*_test.ts"

build:
	$(ROLLUP) --config
	$(DTS) -o dist/xpath_evaluator.d.ts lib/xpath_evaluator.ts

ensure-built: build
	[ -z "$(shell git status -s dist/)" ]

.PHONY: test build ensure-built
