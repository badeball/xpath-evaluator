MOCHA := ./node_modules/.bin/mocha
ROLLUP := ./node_modules/.bin/rollup

all: test

ci: ensure-built test

lint:
	echo "Not yet implemented"
	false

test:
	$(MOCHA) --recursive --reporter dot --require esm

build:
	$(ROLLUP) --config

ensure-built: build
	[ -z "$(shell git status -s dist/)" ]

.PHONY: test build ensure-built
