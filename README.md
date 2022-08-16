# class-change.js

[![NPM](https://img.shields.io/npm/v/class-change.svg?style=flat-square)](https://www.npmjs.com/package/class-change)
[![GitHub Workflow Status (master)](https://img.shields.io/github/workflow/status/jhildenbiddle/class-change/Build%20&%20Test/master?label=checks&style=flat-square)](https://github.com/jhildenbiddle/get-css-data/actions?query=branch%3Amaster+)
[![Codacy code quality](https://img.shields.io/codacy/grade/d656ba140a6e488ab9db2f33183f760e/master?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/class-change/dashboard?branch=master)
[![Codacy branch coverage](https://img.shields.io/codacy/coverage/d656ba140a6e488ab9db2f33183f760e/master?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/class-change/dashboard?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/class-change/blob/master/LICENSE)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fclass-change&hashtags=css,developers,frontend,javascript)

A versatile [Element.classList](https://developer.mozilla.org/en/DOM/element.classList) alternative for manipulating CSS class names, triggering class change events using HTML data attributes, and creating class-related event listeners using a simple, declarative API.

- [Documentation](https://jhildenbiddle.github.io/class-change)
- [Codepen Demo](https://codepen.io/jhildenbiddle/pen/wvmYVML)

## Why?

CSS class names change. A lot.

Native methods for manipulating CSS class names are rudimentary given how often we need them. [Element.classList](https://developer.mozilla.org/en/DOM/element.classList) provides a basic API for working with classes, but changes can only be applied to a single element and separate event listeners must be created for each class change event. Legacy browsers also suffer from [incomplete implementations](http://caniuse.com/#feat=classlist) or lack support entirely. The result is unnecessary code bloat and complexity from repeated loops and boilerplate code, polyfills for legacy browsers, and potential performance issues caused by a high volume of event listeners. This micro-library addresses these issues by reducing and simplifying the code required for handling CSS class changes for modern and legacy browsers.

## Features

- Apply class changes to Arrays, CSS Selectors, HTMLCollections, and NodeLists
- Trigger class changes using HTML data attributes
- Create class change event listeners using a simple, declarative API
- Legacy browser support (IE9+)
- ES and UMD modules available
- Lightweight (1.6k min+gzip) and dependency-free

## Usage & Options

See the [documentation site](https://jhildenbiddle.github.io/class-change/) for details.

## Contact & Support

- Create a [Github issue](https://github.com/jhildenbiddle/class-change/issues) for bug reports, feature requests, or questions
- Follow [@jhildenbiddle](https://twitter.com/jhildenbiddle) for announcements
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/class-change) or 🐦 [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fclass-change&via=jhildenbiddle&hashtags=css,developers,frontend,javascript) to support the project!

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/jhildenbiddle/class-change/blob/master/LICENSE) for details.

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))
