build: build-ts
	cp manifest.json build/manifest.json
	cp package.json build/package.json

build-ts: node_modules
	yarn check:all
	rm -rf build
	yarn build

node_modules:
	yarn