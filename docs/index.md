# class-change.js

[![NPM](https://img.shields.io/npm/v/class-change.svg?style=flat-square)](https://www.npmjs.com/package/class-change)
[![GitHub Workflow Status (master)](https://img.shields.io/github/workflow/status/jhildenbiddle/class-change/Build%20&%20Test/master?label=checks&style=flat-square)](https://github.com/jhildenbiddle/get-css-data/actions?query=branch%3Amaster+)
[![Codacy code quality](https://img.shields.io/codacy/grade/d656ba140a6e488ab9db2f33183f760e/master?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/class-change/dashboard?branch=master)
[![Codacy branch coverage](https://img.shields.io/codacy/coverage/d656ba140a6e488ab9db2f33183f760e/master?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/class-change/dashboard?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/class-change/blob/master/LICENSE)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fclass-change&hashtags=css,developers,frontend,javascript)
<a class="github-button" href="https://github.com/jhildenbiddle/class-change" data-icon="octicon-star" data-show-count="true" aria-label="Star jhildenbiddle/class-change on GitHub">Star</a>

A versatile [Element.classList](https://developer.mozilla.org/en/DOM/element.classList) alternative for manipulating CSS class names, triggering change events using HTML data attributes, and creating class-related event listeners using a simple, declarative API.

## Description

CSS class names change. A lot.

Yet the native methods for manipulating CSS class names remain rudimentary given how often we need them. [Element.classList](https://developer.mozilla.org/en/DOM/element.classList) provides a basic API for working with classes, but [some browsers](http://caniuse.com/#feat=classlist) suffer from an incomplete implementation (or lack support entirely), changes can only be applied to a single element, and separate event listeners must be created for each change event. The result is often polyfills or patches for legacy browsers, manual loops for applying changes to multiple elements, repeated boilerplate code for handling delegated events, and performance issues caused by a high volume of event listeners.

This micro-library aims to address these issues by reducing and simplifying the code required for CSS class changes and events.

## Features

- [Add](#add), [remove](#remove), and [toggle](#toggle) class names
- Apply class changes to Arrays, CSS Selectors, HTMLCollections, and NodeLists
- Trigger class changes using [HTML data attributes](#attrs)
- Create [class-related event listeners](#listener) using a simple, declarative API
- Legacy browser support (IE9+)
- UMD and ES6 modules available
- Rigorously tested with 100% code coverage
- Lightweight (1.6k min+gzip) and dependency-free

## Installation

NPM:

```bash
npm install class-change --save
```

Git:

```bash
git clone https://github.com/jhildenbiddle/class-change
```

CDN ([jsdelivr.com](https://www.jsdelivr.com/) shown, also on [unpkg.com](https://unpkg.com/)):

```html
<!-- ES5 (latest v1.x.x) -->
<script src="https://cdn.jsdelivr.net/npm/class-change@1"></script>
```

```html
<!-- ES6 module (latest v1.x.x) -->
<script type="module">
  import classChange from 'https://cdn.jsdelivr.net/npm/class-change@1/dist/class-change.esm.min.js';
  // ...
</script>
```

## Examples

**Basic usage**

```javascript
// Add "foo" and "bar" class names to all <p> elements
classChange.add('p', 'foo bar');

// Remove "foo" and "bar" class names from all <p> elements
classChange.remove(document.querySelectorAll('p'), ['foo','bar']);

// Toggle "foo" and "bar" class names on all <p> elements
classChange.toggle('p', 'foo bar');
classChange.toggle('p', 'foo bar', true);  // => Force add
classChange.toggle('p', 'foo bar', false); // => Force remove
```

**Data Attributes**

```javascript
// Initialize the default attribute listener
classChange.attrs();
```

```html
<!-- Add "foo" and "bar" classes to this element -->
<button data-class-add="foo bar">Button</button>

<!-- Add "foo" and "bar" classes to all <div> elements -->
<button data-class-add="foo bar" data-class-target="div">Button</button>

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

```javascript
// Add class change event listener
var myListener = classChange.listener({
  target: document.body, // Add an event listener to the document.body (default)
  event : 'click',       // Listen for "click" events (default)
  match : 'button',      // If the clicked element is a <button>
  change: 'p',           // Apply class changes to all <p> elements:
  add   : 'foo',         // 1. Add the "foo" class name
  remove: 'bar',         // 2. Remove the "bar" class name
  toggle: 'baz buzz'     // 3. Toggle the "baz" and "buzz" class names
});
```

## Methods

### add()

Adds class names to target elements.

**Syntax**

```javascript
classChange.add(target, classNames);
```

**Arguments**

1. **target**: Elements to add classes to.
   - Accepts: Array, Element, HTMLCollection, NodeList, or String
   - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
1. **classNames**: A list of class names to add.
   - Accepts: Array, String, or Function
   - Strings should separate class names with a space
   - Functions...
     - Are called once for each `target` element
     - Should return class names as an Array or String
     - Receive the following arguments:
       1. **element**: The `target` element  to add classes to
       1. **index**: The element index in the `target` collection

**Returns**

Element or Array of elements specified by `target`

**Example**

```javascript
// Add "foo" and "bar" class names to all <p> elements
classChange.add('p', 'foo bar');

// Same as above using a NodeList and an Array of class names
classChange.add(document.querySelectorAll('p'), ['foo','bar']);

// Using a function to specify class names
classChange.add('p', function(elm, index) {
  // If this is the first <p>, add "foo" otherwise "bar"
  return index === 0 ? 'foo' : 'bar';
});
```

### attrs()

Add/removes event listeners that respond to click events on child elements with <code style="white-space:nowrap">data-class</code> attributes. This allows class changes to be triggered by modifying the HTML markup instead of writing custom event handlers in JavaScript.

**Syntax**

```javascript
classChange.attrs(listenerTarget, addTrueRemoveFalse);
```

**Arguments**

1. **listenerTarget**: Target elements to add or remove event listener to.
   - Default: `document`
   - Accepts: Array, Boolean, Element, HTMLCollection, NodeList, or a String
   - Boolean `true` will add the default event listener, while `false` will remove the default event listener
   - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
1. **addTrueRemoveFalse**: Determines if a data attribute event listener should be added or removed.
   - Default: `true`
   - Accepts: Boolean
   - Boolean `true` will add a new event listener, while `false` will remove an existing event listener

**Returns**

Object containing a `remove()` method

**Data Attributes**

- Class changes are applied on click and tap events.
- Specify class names as a space-separated list.
- Apply class changes directly to a clicked/tapped element by specifying class names using the  <code style="white-space:nowrap">add|remove|toggle</code> attributes.
- Apply class changes to other elements by specifying CSS selectors using the <code style="white-space:nowrap">closest|parents|siblings|target</code> data attributes.
- Apply multiple class changes to multiple elements using the `data-class-[action]-[target]` data attributes. Note that these attribute values will override the more general attributes above for the change type specified. For example, when <code style="white-space:nowrap">data-class-add-closest</code> is set, <code style="white-space:nowrap">data-class-closest</code> is ignored for <code style="white-space:nowrap">data-class-add</code> class names.

| Attributes                   | Value         | Description                                        |
| ---------------------------- | ------------- | -------------------------------------------------- |
| `data‑class‑add`             | Class name(s) | Class names to add                                 |
| `data‑class‑add‑closest`     | CSS Selector  | Closest ancestor element to add classes to         |
| `data‑class‑add‑parents`     | CSS Selector  | Ancestor elements to add classes to                |
| `data‑class‑add‑siblings`    | CSS Selector  | Sibling elements to add classes to                 |
| `data‑class‑add‑target`      | CSS Selector  | Elements to add classes to                         |
| `data‑class‑closest`         | CSS Selector  | Closest ancestor element to apply class changes to |
| `data‑class‑parents`         | CSS Selector  | Ancestor elements to apply class changes to        |
| `data‑class‑remove`          | Class name(s) | Class names to remove                              |
| `data‑class‑remove‑closest`  | CSS Selector  | Closest ancestor element to remove classes from    |
| `data‑class‑remove‑parents`  | CSS Selector  | Ancestor elements to remove classes from           |
| `data‑class‑remove‑siblings` | CSS Selector  | Sibling elements to remove classes from            |
| `data‑class‑remove‑target`   | CSS Selector  | Elements to remove classes from                    |
| `data‑class‑siblings`        | CSS Selector  | Sibling elements to apply class changes to         |
| `data‑class‑target`          | CSS Selector  | Elements to apply class changes to                 |
| `data‑class‑toggle`          | Class name(s) | Class names to toggle                              |
| `data‑class‑toggle‑closest`  | CSS Selector  | Closest ancestor element to toggle classes on      |
| `data‑class‑toggle‑parents`  | CSS Selector  | Ancestor elements to toggle classes on             |
| `data‑class‑toggle‑siblings` | CSS Selector  | Sibling elements to toggle classes on              |
| `data‑class‑toggle‑target`   | CSS Selector  | Elements to toggle classes on                      |

**Examples (JavaScript)**

The default attribute listener will handle clicks events on any element with a  `data-class` attribute.

```javascript
// Initialize default listener
classChange.attrs();

// Remove default listener
classChange.attrs(false);
```

A remove() method is available when the return object is stored.

```javascript
// Add listeners and store the return object
var myListeners = classChange.attrs();

// Remove listeners using the remove() method
myListeners.remove();
```

Attribute listeners can also be added to and removed from specific elements.

```javascript
// Add listeners to all <form> and class="myclass" elements
classChange.attrs('form, .myclass');

// Remove listeners
classChange.attrs('form, .myclass', false);
```

**Examples (HTML)**

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

### listener()

Provides a simplified method of adding and removing event listeners that trigger class change events.

**Syntax**

```javascript
classChange.listener(options);
```

**Options**

- **target**: Target elements to add or remove event listener to.
  - Default: `document.body`
  - Accepts: Array, Element, HTMLCollection, NodeList, or String
  - Strings are expected to be valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- **event**: The event type to listen for.
  - Default: `"click"`
  - Accepts: String
  - Strings are expected to be a valid [Event Name](https://developer.mozilla.org/en-US/docs/Web/Events)
- **match**: The criteria that the event element will be matched against. If the event target *or any of its ancestors* match the element, the CSS selector, or is found in the Array/HTMLCollection/NodeList specified, the `add`, `remove`, and `toggle` class changes will be triggered.
  - Default: `true` (equivalent to *event.target*)
  - Accepts: Array, Boolean, Element, HTMLCollection, NodeList, String, or Function
  - Boolean `true`  is equivalent to *event.target*, while `false` will exit
  - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
  - Functions...
    - Should return any other accepted value/type
    - Receive the following argument:
      1. **eventObject**: The event object
- **change**: The elements that will have class changes applied to them.
  - Default: `true` (equivalent to *event.target*)
  - Accepts: Array, Boolean, Element, HTMLCollection, NodeList, String, or Function
  - Boolean `true`  is equivalent to *event.target*, while `false` will exit
  - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
  - Functions...
    - Should return any other accepted value/type
    - Receive the following arguments:
      1. **eventObject**: The event object
      1. **matchedElm**: The matched element
      1. **matchedElmIndex**: The index of the `matchedElm` in the `options.match` collection
- **add**: A list of class names to add to the `change` elements.
  - Accepts: Array, Element, HTMLCollection, NodeList, String, or Function
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

**Returns**

Object containing a `remove()` method

**Example 1: Basic usage**

```javascript
// Add listener
var myListener = classChange.listener({
  target: document.body, // Add an event listener to the document.body (default)
  event : 'click',       // Listen for "click" events (default)
  match : 'button',      // If the clicked element is a <button>
  change: 'p',           // Apply class changes to all <p> elements:
  add   : 'foo',         // 1. Add the "foo" class name
  remove: 'bar',         // 2. Remove the "bar" class name
  toggle: 'baz buzz'     // 3. Toggle the "baz" and "buzz" class names
});
```

```javascript
// Removing the event listener
myListener.remove();
```

**Example 2: `match` Function**

A `match` function allows dynamically generating the match criteria each time an event occurs. For example, you may want to only match elements based on the state of your application.

```javascript
// Application state
var myAppState = 'ok';

// Add listener
var myListener = classChange.listener({
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

```javascript
// Add listener
var myListener = classChange.listener({
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

```javascript
var myListener = classChange.listener({
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

Removes class names from target elements.

**Syntax**

```javascript
classChange.remove(target, classNames);
```

**Arguments**

1. **target**: Elements to remove classes from.
   - Accepts: Array, Element, HTMLCollection, NodeList, or String
   - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
1. **classNames**: A list of class names to remove.
   - Accepts: Array, String, or Function
   - Strings should separate class names with a space
   - Functions...
     - Are called once for each `target` element
     - Should return class names as an Array or String
     - Receive the following arguments:
       1. **element**: The `target` element  to add classes to
       1. **index**: The element index in the `target` collection

**Returns**

Element or Array of elements specified by `target`

**Example**

```javascript
// Remove "foo" and "bar" class names from all <p> elements
classChange.remove('p', 'foo bar');

// Same as above using a NodeList and an Array of class names
classChange.remove(document.querySelectorAll('p'), ['foo','bar']);

// Using a function to specify class names
// Before:
//   <p class="foo">...</p>
//   <p class="foo bar">...</p>
// After:
//   <p class="foo">...</p>
//   <p class="bar">...</p>
classChange.remove('p', function(elm, index) {
  // If class "bar" exists, remove "foo"
  if (elm.className.split(' ').indexOf('bar') !== -1) {
    return 'foo';
  }
});
```

### toggle()

Toggles class names on target elements.

**Syntax**

```javascript
classChange.add(target, classNames, forceTrueFalse);
```

**Arguments**

1. **target**: Elements to toggle classes on.
   - Accepts: Array, Element, HTMLCollection, NodeList, or String
   - Strings are expected to be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
1. **classNames**: A list of class names to toggle.
   - Accepts: Array, String, or Function
   - Strings should separate class names with a space
   - Functions...
     - Are called once for each `target` element
     - Receive the following arguments: *element*, *index*
     - Receive the following arguments:
       1. **element**: The `target` element  to add classes to
       1. **index**: The element index in the `target` collection
1. **forceTrueFalse**: Will force class names to be added or removed (rather than toggled).
   - Accepts: Boolean
   - Boolean `true` will force class names to be added, while `false` will force them to be removed

**Returns**

Element or Array of elements specified by `target`

**Example**

```javascript
// Toggle "foo" and "bar" class names on all <p> elements
classChange.toggle('p', 'foo bar');

// Same as above using a NodeList and an Array of class names
classChange.toggle(document.querySelectorAll('p'), ['foo','bar']);

// Force add/remove
classChange.toggle('p', 'foo', true);    // => Force add
classChange.toggle('p', 'foo', 1 === 1); // => Force add
classChange.toggle('p', 'foo', false);   // => Force remove
classChange.toggle('p', 'foo', 1 === 2); // => Force remove

// Using a function to specify class names
// Before:
//   <p class="foo">...</p>
//   <p class="bar">...</p>
// After:
//   <p class="foo">...</p>
//   <p class="buzz">...</p>
classChange.toggle('p', function(elm, index) {
  // If class "bar" exists, toggle "bar" and "buzz"
  if (elm.className.split(' ').indexOf('bar') !== -1) {
    return 'bar buzz';
  }
});
```

## Contact & Support

- Create a [Github issue](https://github.com/jhildenbiddle/class-change/issues) for bug reports, feature requests, or questions
- Follow [@jhildenbiddle](https://twitter.com/jhildenbiddle) for announcements
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/class-change) or ❤️ [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fclass-change&via=jhildenbiddle&hashtags=css,developers,frontend,javascript) to support the project!

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/jhildenbiddle/class-change/blob/master/LICENSE) for details.

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))

<!-- GitHub Buttons -->

<script async defer src="https://buttons.github.io/buttons.js"></script>
