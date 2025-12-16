js/bundle.js: package.json js/site.js js/*.js
	npx esbuild js/site.js --bundle --outfile=js/bundle.js --format=iife --target=es2020 --alias:util=./js/shims/util.js --alias:stream=./js/shims/stream.js --define:process.env={} --inject:./js/shims/buffer-global.js

.PHONY: dist

dist:
	npm run build
	mkdir -p dist/js/locationfilter/src
	cp -vp js/bundle.js dist/js
	cp -vpR js/locationfilter/src/img js/locationfilter/src/locationfilter.* dist/js/locationfilter/src
	cp -vpR *.html css chromecast dist

clean:
	rm -fv js/bundle.js
	rm -frv dist
