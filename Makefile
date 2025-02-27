js/bundle.js: package.json js/site.js
	browserify js/site.js > js/bundle.js

.PHONY: dist

dist:
	npm run build
	mkdir -p dist/js/locationfilter/src
	cp -vp js/bundle.js dist/js
	cp -vupR js/locationfilter/src/img js/locationfilter/src/locationfilter.* dist/js/locationfilter/src
	cp -vupR *.html css chromecast dist

clean:
	rm -fv js/bundle.js
	rm -frv dist
