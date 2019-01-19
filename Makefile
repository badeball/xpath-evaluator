MOCHA := ./node_modules/.bin/mocha
ESLINT := ./node_modules/.bin/eslint
ROLLUP := ./node_modules/.bin/rollup

all: lint test

ci: ensure-built lint test

lint:
	$(ESLINT) .

test:
	$(MOCHA) --recursive --reporter dot --require esm

build:
	$(ROLLUP) --config

ensure-built: build
	[ -z "$(shell git status -s dist/)" ]

.PHONY: lint test build ensure-built
