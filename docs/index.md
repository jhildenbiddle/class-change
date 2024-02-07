# class-change.js

[![NPM](https://img.shields.io/npm/v/class-change.svg?style=flat-square)](https://www.npmjs.com/package/class-change)
[![GitHub Workflow Status (master)](https://img.shields.io/github/actions/workflow/status/jhildenbiddle/class-change/test.yml?branch=master&label=checks&style=flat-square)](https://github.com/jhildenbiddle/class-change/actions?query=branch%3Amaster+)
[![Codacy code quality](https://img.shields.io/codacy/grade/d656ba140a6e488ab9db2f33183f760e/master?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/class-change/dashboard?branch=master)
[![Codacy branch coverage](https://img.shields.io/codacy/coverage/d656ba140a6e488ab9db2f33183f760e/master?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/class-change/dashboard?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/class-change/blob/master/LICENSE)
[![Sponsor this project](https://img.shields.io/static/v1?style=flat-square&label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/jhildenbiddle)
[![Add a star on GitHub](https://img.shields.io/github/stars/jhildenbiddle/class-change?style=social)](https://github.com/jhildenbiddle/class-change)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fclass-change&hashtags=css,developers,frontend,javascript)

A versatile [Element.classList](https://developer.mozilla.org/en/DOM/element.classList) alternative for manipulating CSS class names, triggering class change events using HTML data attributes, and creating class-related event listeners using a simple, declarative API.

- [Codepen Demo](https://codepen.io/jhildenbiddle/pen/wvmYVML)

## Why?

CSS class names change. A lot.

Native methods for manipulating CSS class names are rudimentary given how often we need them. [Element.classList](https://developer.mozilla.org/en/DOM/element.classList) provides a basic API for working with classes, but changes can only be applied to a single element and separate event listeners must be created for each class change event. Legacy browsers also suffer from [incomplete implementations](http://caniuse.com/#feat=classlist) or lack support entirely. The result is unnecessary code bloat and complexity from repeated loops and boilerplate code, polyfills for legacy browsers, and potential performance issues caused by a high volume of event listeners. This micro-library addresses these issues by reducing and simplifying the code required for handling CSS class changes for modern and legacy browsers.

## Features

- Apply class changes to Arrays, CSS Selectors, HTMLCollections, and NodeLists
- Trigger class changes using [HTML data attributes](#attrs)
- Create class change [event listeners](#listener) using a simple, declarative API
- Legacy browser support (IE9+)
- ES and UMD modules available
- Lightweight (1.6k min+gzip) and dependency-free

## Installation

**NPM**

```bash
npm install class-change --save
```

**CDN**

Available on [jsdelivr](https://www.jsdelivr.com/package/npm/class-change) (below), [unpkg](https://unpkg.com/browse/class-change/), and other CDN services that auto-publish npm packages.

!> Note the `@` version lock in the URLs below. This prevents breaking changes in future releases from affecting your project and is therefore the safest method of loading dependencies from a CDN. When a new major version is released, you will need to manually update your CDN URLs by changing the version after the `@` symbol.

```html
<!-- ES6 module (latest v1.x.x) -->
<script type="module">
  import classChange from 'https://cdn.jsdelivr.net/npm/class-change@1/dist/class-change.esm.min.js';
  // ...
</script>
```

```html
<!-- ES5 (latest v1.x.x) -->
<script src="https://cdn.jsdelivr.net/npm/class-change@1"></script>
```

**Git**

```bash
git clone https://github.com/jhildenbiddle/class-change
```

## Usage

**Basic Usage**

For programmatic class changes, use the [`add()`](#add), [`remove()`](#remove), and [`toggle()`](#toggle) methods:

```js
// Add "foo" and "bar" classes on all <p> elements
// using a CSS selector and a space-separated class list
classChange.add('p', 'foo bar');

// Remove "foo" and "bar" classes from all <p> elements
// using a NodeList and an Array of class names
classChange.remove(document.querySelectorAll('p'), ['foo', 'bar']);

// Conditionally toggle "foo" or "bar" classes on all <p> elements
// using a callback function
classChange.toggle('p', (elm, index) => myAppState = 'ok' ? 'foo' : 'bar');
```

**HTML Data Attributes**

Class changes can also be triggered using HTML data attributes. To enable this feature, use the [`attrs()`](#attrs) method to create an event listener that will handle class changes based on `data-class` [attributes](#data-attributes):

```js
// Initialize the default data-class attribute listener
classChange.attrs();
```

```html
<!-- Add "foo" and "bar" classes to this element on click -->
<button data-class-add="foo bar">Button</button>

<!-- Toggle "foo" and "bar" classes to all class="my-class" elements -->
<button data-class-toggle="foo bar" data-class-target=".my-class">Button</button>

<!--
  Specify elements for each change type (add, remove, toggle)
  - Add "foo" class to element with id="test1"
  - Remove "bar" class from closest <span> ancestor
  - Toggle "baz" class on all <div> ancestors
-->
<button data-class-add="foo"
        data-class-add-target="#test1"
        data-class-remove="bar"
        data-class-remove-closest="span"
        data-class-toggle="baz"
        data-class-toggle-parents="div">Button</button>
```

**Event Listeners**

The [`listener()`](#listener) method provides a simple, declarative API that can be used to create advanced class change event listeners:

```js
// Add class change event listener
const myListener = classChange.listener({
  target: document.body, // Add an event listener to the document.body (default)
  event : 'click',       // Listen for "click" events (default)
  match : 'button',      // If the clicked element is a <button>
  change: 'p',           // Apply class changes to all <p> elements:
  add   : 'foo',         // 1. Add the "foo" class name
  remove: 'bar',         // 2. Remove the "bar" class name
  toggle: 'baz buzz'     // 3. Toggle the "baz" and "buzz" class names
});
```

## API

### add()

Adds class names to target element(s). Returns `target` element(s).

```js
classChange.add(target, classNames);
```

**Arguments**

1. **target**: Elements to add classes to.
   - Type: `Array`, `Element`, `HTMLCollection`, `NodeList`, or `String`
   - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
1. **classNames**: A list of class names to add.
   - Type: `Array`, `String`, or `Function`
   - Strings should be a space-separated list of class names
   - Functions...
     - Are called once for each `target` element
     - Should return class names as an Array or String
     - Receive the following arguments:
       1. **element**: The `target` element  to add classes to
       1. **index**: The element index in the `target` collection

**Examples**

```js
// Add "foo" and "bar" class names to all <p> elements
classChange.add('p', 'foo bar');

// Same as above using a NodeList and an Array of class names
classChange.add(document.querySelectorAll('p'), ['foo','bar']);

// Conditionally add "foo" or "bar" class to all <p> elements

// Conditionally add "foo" or "bar" class to all <p> elements
// Before:
//   <p>...</p>
//   <p>...</p>
// After:
//   <p class="foo">...</p>
//   <p class="bar">...</p>
classChange.add('p', (elm, index) => index === 0 ? 'foo' : 'bar');
```

### attrs()

Add/remove event listener to handle class change events on elements with <code style="white-space:nowrap">data-class</code> [attributes](#data-attributes). Returns an `Object` containing a `remove()` method.

```js
classChange.attrs(listenerTarget, addTrueRemoveFalse);
```

**Arguments**

1. **listenerTarget**: Target element(s) to add or remove event listener to.
   - Default: `document`
   - Type: `Array`, `Boolean`, `Element`, `HTMLCollection`, `NodeList`, or a `String`
   - Passing `true` will add the default event listener, while `false` will remove the default event listener
   - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
1. **addTrueRemoveFalse**: Determines if a data attribute event listener should be added or removed.
   - Default: `true`
   - Type: `Boolean`
   - Passing `true` will add a new event listener, while `false` will remove an existing event listener

**Examples**

The default attribute listener will handle clicks events on any element with a  `data-class` attribute.

```js
// Initialize default listener
classChange.attrs();

// Remove default listener
classChange.attrs(false);
```

A remove() method is available when the return object is stored.

```js
// Add listeners and store the return object
const myListeners = classChange.attrs();

// Remove listeners using the remove() method
myListeners.remove();
```

Attribute listeners can also be added to and removed from specific elements.

```js
// Add listeners to all <form> and class="myclass" elements
classChange.attrs('form, .myclass');

// Remove listeners
classChange.attrs('form, .myclass', false);
```

### listener()

Creates event listeners for handling class change events using a simple, declarative API. Returns an `Object` containing a `remove()` method.

```js
const myListener = classChange.listener(options);
```

**Options**

- **target**: Target element(s) to add or remove event listener to.
  - Default: `document.body`
  - Type: `Array`, `Element`, `HTMLCollection`, `NodeList`, or `String`
  - Strings are expected to be valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- **event**: The event type to listen for.
  - Default: `'click'`
  - Type: `String`
  - Strings are expected to be a valid [Event Name](https://developer.mozilla.org/en-US/docs/Web/Events)
- **match**: The criteria that the event element will be matched against. If the event target *or any of its ancestors* match the element, the CSS selector, or is found in the Array/HTMLCollection/NodeList specified, the `add`, `remove`, and `toggle` class changes will be triggered.
  - Default: `true` (equivalent to *event.target*)
  - Type: `Array`, `Boolean`, `Element`, `HTMLCollection`, `NodeList`, `String`, or `Function`
  - Boolean `true`  is equivalent to *event.target*, while `false` will exit
  - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
  - Functions...
    - Should return any other accepted value/type
    - Receive the following argument:
      1. **eventObject**: The event object
- **change**: The elements that will have class changes applied to them.
  - Default: `true` (equivalent to *event.target*)
  - Type: `Array`, `Boolean`, `Element`, `HTMLCollection`, `NodeList`, `String`, or `Function`
  - Boolean `true`  is equivalent to *event.target*, while `false` will exit
  - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
  - Functions...
    - Should return any other accepted value/type
    - Receive the following arguments:
      1. **eventObject**: The event object
      1. **matchedElm**: The matched element
      1. **matchedElmIndex**: The index of the `matchedElm` in the `options.match` collection
- **add**: A list of class names to add to the `change` elements.
  - Type: `Array`, `Element`, `HTMLCollection`, `NodeList`, `String`, or `Function`
  - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
  - Functions...
    - Are called once for each `change` element
    - Should return any other accepted value/type
    - Receive the following arguments:
      1. **eventObj**: The event object
      1. **matchedElm**: The matched element
      1. **matchedElmIndex**: The index of the `matchedElm` in the `options.match` collection
      1. **changeElm**: The element class changes are being applied to
      1. **changeElmIndex**: The index of the `changeElm` in the `options.change` collection
- **remove**: A list of class names to remove from the `change` elements.
  - (Same as **add**...)
- **toggle**: A list of class names to toggle on the `change` elements.
  - (Same as **add**...)

**Example 1: Basic usage**

```js
// Add listener
const myListener = classChange.listener({
  target: document.body, // Add an event listener to the document.body (default)
  event : 'click',       // Listen for "click" events (default)
  match : 'button',      // If the clicked element is a <button>
  change: 'p',           // Apply class changes to all <p> elements:
  add   : 'foo',         // 1. Add the "foo" class name
  remove: 'bar',         // 2. Remove the "bar" class name
  toggle: 'baz buzz'     // 3. Toggle the "baz" and "buzz" class names
});
```

```js
// Removing the event listener
myListener.remove();
```

**Example 2: `match` Function**

A `match` function allows for dynamically generating the match criteria each time an event occurs. For example, you may want to only match elements based on the state of your application.

```js
// Application state
const myAppState = 'ok';

// Add listener
const myListener = classChange.listener({
  target: document.body,
  event : 'click',
  match : function(eventObject) {
    // Match <button> elements if app state is "ok"
    // Returning false exits without applying changes
    return myAppState === 'ok' ? 'button' : false;
  },
  change: 'p',
  add   : 'foo'
});
```

**Example 3: `change` Function**

A `change` function allows dynamically generating the elements to apply class changes to each time an event occurs. For example, you may want to listen for click events on a button, but then change class names on the button's parent element.

```js
// Add listener
const myListener = classChange.listener({
  target: document.body,
  event : 'click',
  match : 'button',
  change: function(eventObject, matchedElm, matchedElmIndex) {
    // Apply class changes to <button> parent
    return matchedElm.parentNode;
  },
  add   : 'foo'
});
```

**Example 4: `add|remove|toggle` Functions**

An `add|remove|toggle` function allows dynamically generating a list of class names to add, remove or toggle each time an event occurs. For example, you may want specify class names based on existing class names, or generate class names based on an element index.

```js
const myListener = classChange.listener({
  target: document.body,
  event : 'click',
  match : 'button',
  change: 'p',
  add: function(eventObj, matchedElm, matchedElmIndex, changeElm, changeElmIndex) {
    // Add class names based on matched element property
    // Clicked:
    //   <button name="test">
    // Before:
    //   <p class="foo">
    //   <p class="foo">
    // After:
    //   <p class="foo bar">
    //   <p class="foo bar">
    return matchedElm.name === 'test' ? 'bar' : '';
  },
  remove: function(eventObj, matchedElm, matchedElmIndex, changeElm, changeElmIndex) {
    // Remove class names based on change element index
    // Before:
    //   <p class="foo bar">
    //   <p class="foo bar">
    // After:
    //   <p class="bar">
    //   <p class="foo bar">
    return changeElmIndex === 0 ? 'foo' : '';
  },
  toggle: function(eventObj, matchedElm, matchedElmIndex, changeElm, changeElmIndex) {
    // Toggle class names based on change element class name
    // Before:
    //   <p class="bar">
    //   <p class="foo bar">
    // After:
    //   <p class="bar baz">
    //   <p class="foo bar buzz">
    return changeElm.className.split(' ').indexOf('foo') === -1 ? 'baz' : 'buzz';
  }
});
```

### remove()

Removes class names from target element(s). Returns `target` element(s).

```js
classChange.remove(target, classNames);
```

**Arguments**

1. **target**: Elements to remove classes from.
   - Type: `Array`, `Element`, `HTMLCollection`, `NodeList`, or `String`
   - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
1. **classNames**: A list of class names to remove.
   - Type: `Array`, `String`, or `Function`
   - Strings should be a space-separated list of class names
   - Functions...
     - Are called once for each `target` element
     - Should return class names as an Array or String
     - Receive the following arguments:
       1. **element**: The `target` element  to add classes to
       1. **index**: The element index in the `target` collection

**Examples**

```js
// Remove "foo" and "bar" class names from all <p> elements
classChange.remove('p', 'foo bar');

// Same as above using a NodeList and an Array of class names
classChange.remove(document.querySelectorAll('p'), ['foo','bar']);

// Conditionally remove "foo" or "bar" class to all <p> elements
// Before:
//   <p class="foo bar">...</p>
//   <p class="foo bar">...</p>
// After:
//   <p class="bar">...</p>
//   <p class="foo">...</p>
classChange.remove('p', (elm, index) => index === 0 ? 'foo' : 'bar');
```

### toggle()

Toggles class names on target element(s). Returns `target` element(s).

```js
classChange.add(target, classNames, forceTrueFalse);
```

**Arguments**

1. **target**: Elements to toggle classes on.
   - Type: `Array`, `Element`, `HTMLCollection`, `NodeList`, or `String`
   - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
1. **classNames**: A list of class names to toggle.
   - Type: `Array`, `String`, or `Function`
   - Strings should be a space-separated list of class names
   - Functions...
     - Are called once for each `target` element
     - Receive the following arguments: *element*, *index*
     - Receive the following arguments:
       1. **element**: The `target` element  to add classes to
       1. **index**: The element index in the `target` collection
1. **forceTrueFalse**: Will force class names to be added (`true`) or removed (`false`).
   - Type: `Boolean`

**Examples**

```js
// Toggle "foo" and "bar" class names on all <p> elements
classChange.toggle('p', 'foo bar');

// Same as above using a NodeList and an Array of class names
classChange.toggle(document.querySelectorAll('p'), ['foo','bar']);

// Force add/remove
classChange.toggle('p', 'foo', true);  // => Force add
classChange.toggle('p', 'foo', false); // => Force remove

// Conditionally toggle "foo" or "bar" class to all <p> elements
// Before:
//   <p class="foo">...</p>
//   <p>...</p>
// After:
//   <p>...</p>
//   <p class="bar">...</p>
classChange.remove('p', (elm, index) => index === 0 ? 'foo' : 'bar');
```

## Data Attributes

Class changes can be triggered using `data-class` attributes on HTML elements. This approach can significantly reduce and simplify the amount of code required for handling class change events in your application.

- Class changes are applied on click and tap events
- Specify class names as a space-separated list
- Apply class changes directly to a clicked/tapped element by specifying class names using the  <code style="white-space:nowrap">add|remove|toggle</code> attributes
- Apply class changes to other elements by specifying CSS selectors using the <code style="white-space:nowrap">closest|parents|siblings|target</code> data attributes
- Apply multiple class changes to multiple elements using the `data-class-[action]-[target]` data attributes. Note that these attribute values will override the more general attributes above for the change type specified. For example, when <code style="white-space:nowrap">data-class-add-closest</code> is set, <code style="white-space:nowrap">data-class-closest</code> is ignored for <code style="white-space:nowrap">data-class-add</code> class names.

!> In order to use `data-class` attributes to trigger class changes, you must create an event listener using the [`attr()`](#attrs) method below.

| Attribute                    | Value         | Description                                        |
| ---------------------------- | ------------- | -------------------------------------------------- |
| `data‑class‑add`             | Class name(s) | Class name(s) to add (space-separated list)        |
| `data‑class‑add‑closest`     | CSS Selector  | Closest ancestor element to add classes to         |
| `data‑class‑add‑parents`     | CSS Selector  | Ancestor elements to add classes to                |
| `data‑class‑add‑siblings`    | CSS Selector  | Sibling elements to add classes to                 |
| `data‑class‑add‑target`      | CSS Selector  | Elements to add classes to                         |
| `data‑class‑closest`         | CSS Selector  | Closest ancestor element to apply class changes to |
| `data‑class‑parents`         | CSS Selector  | Ancestor elements to apply class changes to        |
| `data‑class‑remove`          | Class name(s) | Class name(s) to remove (space-separated list)     |
| `data‑class‑remove‑closest`  | CSS Selector  | Closest ancestor element to remove classes from    |
| `data‑class‑remove‑parents`  | CSS Selector  | Ancestor elements to remove classes from           |
| `data‑class‑remove‑siblings` | CSS Selector  | Sibling elements to remove classes from            |
| `data‑class‑remove‑target`   | CSS Selector  | Elements to remove classes from                    |
| `data‑class‑siblings`        | CSS Selector  | Sibling elements to apply class changes to         |
| `data‑class‑target`          | CSS Selector  | Elements to apply class changes to                 |
| `data‑class‑toggle`          | Class name(s) | Class name(s) to toggle (space-separated list)     |
| `data‑class‑toggle‑closest`  | CSS Selector  | Closest ancestor element to toggle classes on      |
| `data‑class‑toggle‑parents`  | CSS Selector  | Ancestor elements to toggle classes on             |
| `data‑class‑toggle‑siblings` | CSS Selector  | Sibling elements to toggle classes on              |
| `data‑class‑toggle‑target`   | CSS Selector  | Elements to toggle classes on                      |

**Examples**

```html
<!-- Add "foo" and "bar" classes to this element -->
<button data-class-add="foo bar">Button</button>

<!-- Add "foo" and "bar" classes to the closest <div> ancestor -->
<button data-class-add="foo bar" data-class-closest="div">Button</button>

<!-- Add "foo" and "bar" classes to <div> ancestors -->
<button data-class-add="foo bar" data-class-parents="div">Button</button>

<!-- Add "foo" and "bar" classes to <div> siblings -->
<button data-class-add="foo bar" data-class-siblings="div">Button</button>

<!-- Add "foo" and "bar" classes to all <div> elements -->
<button data-class-add="foo bar" data-class-target="div">Button</button>

<!-- Add, remove, and toggle classes on this element -->
<button data-class-add="foo"
        data-class-remove="bar"
        data-class-toggle="baz">Button</button>

<!--
	Specify elements for each change type (add, remove, toggle)
	- Add "foo" class to element with id="test1"
	- Remove "bar" class from closest <span> ancestor
	- Toggle "baz" class on all <div> ancestors
-->
<button data-class-add="foo"
        data-class-add-target="#test1"
        data-class-remove="bar"
        data-class-remove-closest="span"
        data-class-toggle="baz"
        data-class-toggle-parents="div">Button</button>

<!--
	Using event bubbling to trigger multiple class change events
	- Click on inner <span>, "foo" class added to id="test1"
	- Event bubbles to outer <span>, "bar" class removed from closest <span>
	- Event bubbles to <button>, "baz" class toggled on <div> ancestors
-->
<button data-class-toggle="baz" data-class-parents="div">
  <span data-class-remove="bar" data-class-closest="span">
    <span data-class-add="foo" data-class-target="#test1">Button</span>
  </span>
</button>
```

## Sponsorship

A [sponsorship](https://github.com/sponsors/jhildenbiddle) is more than just a way to show appreciation for the open-source authors and projects we rely on; it can be the spark that ignites the next big idea, the inspiration to create something new, and the motivation to share so that others may benefit.

If you benefit from this project, please consider lending your support and encouraging future efforts by [becoming a sponsor](https://github.com/sponsors/jhildenbiddle).

Thank you! 🙏🏻

<iframe src="https://github.com/sponsors/jhildenbiddle/button" title="Sponsor jhildenbiddle" height="35" width="116" style="border: 0; margin: 0;"></iframe>

## Contact & Support

- Follow 👨🏻‍💻 **@jhildenbiddle** on [Twitter](https://twitter.com/jhildenbiddle) and [GitHub](https://github.com/jhildenbiddle) for announcements
- Create a 💬 [GitHub issue](https://github.com/jhildenbiddle/class-change/issues) for bug reports, feature requests, or questions
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/class-change) and 🐦 [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fclass-change&hashtags=css,developers,frontend,javascript) to promote the project
- Become a 💖 [sponsor](https://github.com/sponsors/jhildenbiddle) to support the project and future efforts

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/jhildenbiddle/class-change/blob/master/LICENSE) for details.

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))

<!-- GitHub Buttons -->

<script async defer src="https://buttons.github.io/buttons.js"></script>
