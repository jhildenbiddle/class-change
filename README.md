# class-change.js

A small, dependency-free micro-library for manipulating CSS class names and generating class change event listeners.

**Features**

- A consistent interface for manipulating CSS class names in modern and legacy browsers (IE9+)
- A simplified method of creating CSS class change event listeners
- The ability to change class names on multiple elements in a single method call
- The ability to specify class names as arrays or space-separated lists
- A UMD library that works in the browser or as an AMD/CommonJS module
- Lightweight (1.3k minified + gzipped) and dependency free

**What about Element.classList?**

[Element.classList](https://developer.mozilla.org/en/DOM/element.classList) already provides an API for manipulating CSS class names, but [some browsers](http://caniuse.com/#feat=classlist) suffer from incomplete implementations or lack support entirely. [Polyfills](https://github.com/eligrey/classList.js/) are available that add classList support to older browsers, but neither polyfills nor native classList methods offer the convenience features provided by this library because these features are not part of the official Element.classList specification.

**Need an example?**

Here is a basic example of how to create a class change event listener using the `listen` method. More advanced examples are provided in the [listener method](#listeneroptions) section.

```javascript
var myListener = classChange.listener({
  target: document.body, // Add an event listener to the document.body (default)
  event : 'click',       // Listen for "click" events (default)
  match : 'a',           // If the clicked element is an <a> tag
  change: 'img',         // Change class names on all <img> elements as follows:
  add   : 'foo',         // Add the "foo" class name
  remove: 'bar',         // Remove the "bar" class name
  toggle: 'baz buzz'     // Toggle the "baz" and "buzz" class names
});
```

## Installation

Download using [NPM](https://www.npmjs.com/):

```shell
npm install class-change
```

Download using [Bower](http://bower.io/):

```shell
bower install class-change
```

Clone this repository:

```shell
git clone https://github.com/jhildenbiddle/class-change.git
```

[Download](https://github.com/jhildenbiddle/class-change/archive/master.zip) the latest source code in zip format.

## Methods

### add(*target*, *classNames*)

### remove(*target*, *classNames*)

Adds or removes class names on the target elements.

**Arguments**

| Name         | Description                              |
| ------------ | ---------------------------------------- |
| `target`     | CSS selector or Node(s)                  |
| `classNames` | A space-separated list or Array of class names |

**Returns**

- Node(s) specified by `target`.

**Examples**

```javascript
// Add "myclass1" and "myclass2" to all elements with a class of "foo".
// - 'target' specified as a CSS selector
// - 'classNames' specified as a space-separated list.
classChange.add('.foo', 'myclass1 myclass2');

// Remove "myclass1" and "myclass2" from all elements with a class of "foo".
// - 'target' specified as NodeList
// - 'classNames' specified as an Array
classChange.remove(document.querySelectorAll('.foo'), ['myclass1','myclass2']);
```

### toggle(*target*, *classNames*, *forceTrueFalse*)

Toggles class names on the target elements.

**Arguments**

| Name             | Description                              |
| ---------------- | ---------------------------------------- |
| `target`         | CSS selector or Node(s)                  |
| `classNames`     | A space-separated list or Array of class names |
| `forceTrueFalse` | Boolean or conditional statement that will for CSS class names to be added (`true`) or removed (`false`). |

**Returns**

- Node(s) specified by `target`.

**Examples**

```javascript
// Toggle "myclass1" and "myclass2" to all elements with a class of "foo".
// - 'target' specified as a CSS selector
// - 'classNames' specified as a space-separated list.
classChange.toggle('.foo', 'myclass1 myclass2');

// Toggle "myclass1" and "myclass2" from all elements with a class of "foo".
// - 'target' specified as NodeList
// - 'classNames' specified as an Array
classChange.toggle(document.querySelectorAll('.foo'), ['myclass1','myclass2']);

// Force add/remove class names
classChange.toggle('.foo', 'myclass', true);    // => Force add
classChange.toggle('.foo', 'myclass', 1 === 1); // => Force add
classChange.toggle('.foo', 'myclass', false);   // => Force remove
classChange.toggle('.foo', 'myclass', 1 === 2); // => Force remove
```

### listener(*options*)

Registers an event listener that will trigger a class change event based on the options provided.

**Options**

| Name             | Description                              | Default         |
| ---------------- | ---------------------------------------- | --------------- |
| `options.target` | CSS selector or Node(s) on which the event listener(s) will be registered. | `document.body` |
| `options.event`  | The event type to listen for.            | `'click'`       |
| `options.match`  | CSS selector, Node(s) or Function that determines if a class change event is triggered. | *event.target*  |
| `options.change` | CSS selector, Node(s) or Function that determines which Node(s) will have class changes applied to them. | *event.target*  |
| `options.add`    | A list of class names to add. Class names can be provided as a space-separated list, an Array, or a Function that returns a list or an array of class names. | `null`          |
| `options.remove` | A list of class names to remove. Class names can be provided as a space-separated list, an Array, or a Function that returns a list or an array of class names. | `null`          |
| `options.toggle` | A list of class names to toggle. Class names can be provided as a space-separated list, an Array, or a Function that returns a list or an array of class names. | `null`          |

**Returns**

- Returns an object containing a `remove()` method for removing the event listener.

**Example #1: Standard option values & removing event listeners**

```javascript
var myListener = classChange.listener({
  target: document.body, // Add an event listener to the document.body (default)
  event : 'click',       // Listen for "click" events (default)
  match : 'a',           // If the clicked element is an <a> tag
  change: 'img',         // Change class names on all <img> elements as follows:
  add   : 'foo',         // Add the "foo" class name
  remove: 'bar',         // Remove the "bar" class name
  toggle: 'baz buzz'     // Toggle the "baz" and "buzz" class names
});
```

```javascript
// Removing the event listener
myListener.remove();
```

**Example #2: `options.match` Function**

Using a function for `options.match` provides additional control over when a class change event is triggered. For example, you may want to conditionally perform a class change based on the state of your application.

The following arguments are passed to an `options.match` function:

- `eventTarget`: The element that triggered the event (i.e. the "clicked" element).
- `eventObject`: The event object.

The Function is expected to return a CSS selector (String) or Node(s) to match the *event.target* against, or a Boolean (`true` / `false`) to indicate if a class change event should be triggered.

```javascript
var myListener = classChange.listener({
  target: document.body,
  event : 'click',
  match : function(eventTarget, eventObject) {
    // Determine if the clicked element is an <a> tag
    var isLink = eventTarget.tagName.toLowerCase() === 'a';
    
    // If the element is a link, prevent the default behavior    
    if (isLink) {
      eventObject.preventDefault();
    }
    
    // Return true or false to indicate match
    return isLink;
  },
  change: 'img',
  toggle: 'foo'
});
```

**Example #3: `options.change` Function**

Using a function for `options.change` allows changing class names on Nodes anywhere in the DOM. For example, you you may want to listen for `click` events on a button, but then change class names on the `document.body` or multiple`<div>` elements.

The following arguments are passed to an `options.change` function:

1. `eventTarget`: The element that triggered the event (i.e. the "clicked" element).
2. `eventObject`: The event object.
3. `matchNodeIndex`: The index of the `eventTarget` within the `options.match` collection.

The Function is expected to return a CSS selector (String) or Node(s) to apply class changes to.

```javascript
var myListener = classChange.listener({
  target: document.body,
  event : 'click',
  match : 'a',
  change: function(eventTarget, eventObject, matchNodeIndex) {
    // Change the class name(s) of the clicked <a> tag's parent node.
    // To change multiple elements, return a CSS selector or a
    // collection of Nodes.
    return eventTarget.parentNode;
  },
  toggle: 'foo'
});
```

**Example #4: `options.[add|remove|toggle]` Functions**

Using a function for `options.[add|remove|toggle]` allows dynamically generating a list of class names to add, remove or toggle. For example, you may want to create class names based on a property value or the index of a Node.

*Note that when `options.change` specifies a collection of Nodes, `options.[add|remove|toggle]` functions are called one time for each Node in the collection. On each call, a Node and its index within the `options.change` collection are passed as arguments. This feature allows you to generate custom class names for each Node in the collection.*

The following arguments are passed to an `options.[add|remove|toggle]` function:

1. `eventTarget`: The element that triggered the event (i.e. the "clicked" element).
2. `eventObject`: The event object.
3. `changeNode`: The current Node class changes are being applied to.
4. `changeNodeIndex`: The index of the `changeNode` within the `options.change` collection.

The Function is expected to return a space-separated list or an Array of class names to add, remove, or toggle on the Nodes specified by `options.change` (or the `eventTarget` if `options.changes` has not been specified).

```javascript
var myListener = classChange.listener({
  target: document.body,
  event : 'click',
  match : 'a',
  change: 'img',
  toggle: function(eventTarget, eventObject, changeNode, changeNodeIndex) {
    // Get the "data-classname" attribute value from the eventTarget
    var className1 = eventTarget.getAttribute('data-classname') || null;
    
    // Get the "data-classname" attribute value from the current <img> Node
    var className2 = changeNode.getAttribute('data-classname') || null;
    
    // Generate a class name based on the current <img> Node's index
    var className3 = 'myclass' + (changeNodeIndex + 1);
    
    // Prevent the default event behavior
    eventObject.preventDefault();
    
    // Toggle the class names on each <img> Node
    return [className1, className2, className3];
  }
});
```

## License

**The MIT License (MIT)**

Copyright (c) 2016 John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.