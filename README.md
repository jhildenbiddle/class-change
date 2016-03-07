# class-change
This small (less than 1.5k minified+gzip), dependency-free micro-library provides the following features:

- A consistent interface for manipulating CSS class names in legacy (IE9+) and modern browsers.
- Simplified CSS class change event delegation.
- The ability to specify multiple class names as arrays or space-separated strings.
- The ability to `require` all methods as a single object.
- The ability to `require` individual methods as needed (for including with other libraries).
- The ability replace or work alongside classList polyfills.

## Why?

Manipulating CSS class names is a common front-end development practice. Modern browsers that support [Element.classList](https://developer.mozilla.org/en/DOM/element.classList) methods provide a consistent interface for handling class name changes, but some browsers suffer from incomplete implementations or lack support entirely. Even with modern classList support, the repetitive nature of the code required to delegate class change events can lead to unnecessary code bloat.

- Internet Explore 9 does not support [Element.classList](https://developer.mozilla.org/en/DOM/element.classList) methods.

- Internet Explorer 10 and 11 (as well as older versions of Chrome, Firefox and Safari) provide limited classList support that suffers from [known issues](http://caniuse.com/#feat=classlist) such as the inability to add, remove or toggle multiple class as described in the official classList specification.

- [Polyfills](https://github.com/eligrey/classList.js/) are available that provide a consistent classList implementation across browsers, but these polyfills lack the ability to apply changes to multiple elements with a single method call or specify classes as arrays and space-separated strings because these features are not part of the official classList specification.

- Neither polyfills nor native classList methods help address the repetitive nature of the code required to delegate class change events. Given the frequent need to manipulate class names in web applications, reducing the amount of code required to handle these events can reduce code bloat and enforce best practices.

## Installation

Download using [NPM](https://www.npmjs.com/):

```shell
npm install class-change
```

Clone this repository:

```shell
git clone https://github.com/jhildenbiddle/class-change.git
```

[Download](https://github.com/jhildenbiddle/class-change/archive/master.zip) the latest source code in zip format.

## Methods

- **add(*elements*, *classNames*)**
  Adds class name(s) to the specified element(s). Returns `elements`.
  - `elements`: CSS selector, Node or Node List
  - `classNames`: Space-separated string or Array of class names
- **remove(*elements*, *classNames*)**
  Removes class name(s) from the specified element(s). Returns `elements`.
  - `elements`: CSS selector, Node or Node List
  - `classNames`: Space-separated string or Array of class names
- **toggle(*elements*, *classNames*, *forceTrueFalse*)**
  Adds or removes class name(s) from the specified element(s). Returns `elements`.
  - `elements`: CSS selector, Node or Node List
  - `classNames`: Space-separated string or Array of class names
  - `forceTrueFalse` (optional): Boolean or conditional statement that will determine if CSS classes are added (`true`) or removed (`false`).
- **delegate(*options*)**
  Registers new event listener(s) based on the *options* provided. Returns an object containing a `remove()` method for removing the associated event listener(s). Options are as follows:
  - `options.target`:  The element on which the event listener will be registered. Accepts a CSS selector or Node (default: `document.body`).
  - `options.event`: A string representing the event type to listen for (default: `"click"`).
  - `options.matches`: CSS selector that matches the intended event target(s). Note that if a CSS selector is used, the selector must be relative to the `options.target` element.
  - `options.add`: CSS class name(s) to add to the `options.change` element(s).
  - `options.remove`: CSS class name(s) to remove from the `options.change` element(s).
  - `options.toggle`: CSS class name(s) to toggle on the `options.change` element(s).
  - `options.change`: CSS selector, Node, Node List or Function representing the element(s) to apply the CSS class change to.
    - When omitted, class changes will be applied to the event target element.
    - When a CSS selector, Node or Node List is provided, class changes will be applied to these elements.
    - When Function is provided, the function will be called and is expected to return a CSS selector, Node or Node List on which class changes will be applied. The following arguments are passed to the function:
      - `elm`: The element associated with the event. For example, an element that was clicked.
      - `index`: The index of `elm` in the `options.matches` collection. For example, if the `options.matches` CSS selector matches three elements and the first of those three elements is clicked, the index passed to the `options.change` function will be `0`.

### Delegated Event Methods

When the `classChange.delegate()` method is called, the following methods are returned:

- **remove()**
  Removes all event listeners previously registered with `classChange.delegate()` method.

## Examples

### Add, Remove and Toggle

These example demonstrates programmatically applying class changes using various methods of specifying elements and class names.

**HTML**

```html
<div class="foo"></div>
<div class="bar"></div>
<div class="baz"></div>
```

**JavaScript**

```javascript
// Changing one class on a single element using CSS selectors and Strings
classChange.add('.foo', 'myclass');
classChange.remove('.bar', 'bar');
classChange.toggle('.baz', 'baz');

// Changing multiple classes on a single element using CSS Selectors and String lists
classChange.add('div', 'myclass1 myclass2');
classChange.remove('div', 'myclass1 myclass2');
classChange.toggle('div', 'myclass1 myclass2');

// Changing multiple classes on multiple elements using Node Lists and Arrays
classChange.add(document.querySelectorAll('div'), ['myclass1','myclass2']);
classChange.remove(document.querySelectorAll('div'), ['myclass1','myclass2']);
classChange.toggle(document.querySelectorAll('div'), ['myclass1','myclass2']);
```

### Basic Accordion

**Demo:** http://codepen.io/jhildenbiddle/pen/xVZEoB

This example demonstrates using an `options.change` function to toggle a class change on the clicked element's parent node. This is done using the `elm` argument that is passed to the `options.change` function.

**HTML**

```html
<dl class="accordion">
  <dt><a href="#title1">Title 1</a></dt>
  <dd>This is content for the first section.</dd>
  <dt><a href="#title2">Title 2</a></dt>
  <dd>This is content for the second section.</dd>
  <dt><a href="#title3">Title 3</a></dt>
  <dd>This is content for the third section.</dd>
</dl>
```

**CSS**

```css
/* Hide all <dd> elements by default */
dd {
  display: none;
}

/* Show the <dd> element adjacent to a <dt> element with an "active" class */
dt.active + dd {
  display: block;
}
```

**JavaScript**

```javascript
// Toggle "active" class on the parent node of the clicked <a> element
var accordionListener = classChange.delegate({
  matches: '.accordion dt a',
  toggle : 'active',
  change : function(elm, index) {
    return elm.parentNode;
  }
});
```

### Basic Tabbed Content

**Demo:** http://codepen.io/jhildenbiddle/pen/rexWMP

This example demonstrates delegating multiple events and applying class changes using the `index` argument that is passed to the `options.change` function.

The `.tab-list` element contains three `<a>` elements. An event listener is created that listens for `"click"` events on these three elements. When one of these links is clicked, the index of the element (0, 1 or 2) is passed to the `options.change` function. This index is used to find the first, second or third `.tab-list li` and `.tab-content li` elements. These elements are then returned from the `options.change` function so class changes can be applied. The CSS rules then determines the presentation and visibility of the tabbed content based on "active" class name.

**HTML**

```html
<ul class="tab-list">
  <li><a href="#tab1">Tab 1</a></li>
  <li><a href="#tab2">Tab 2</a></li>
  <li><a href="#tab3">Tab 3</a></li>
</ul>

<ul class="tab-content">
  <li>This is content for the first tab.</li>
  <li>This is content for the second tab.</li>
  <li>This is content for the third tab.</li>
</ul>
```

**CSS**

```css
/* Align items horizontally */
.tab-list li {
  display: inline-block;
}

/* Hide all tab content by default */
.tab-content li {
  display: none;
}

/* Change the appearance of the active tab */
.tab-list li.active a {
  color: red;
}

/* Show the active tab content */
.tab-content li.active {
  display: block;
}
```

**JavaScript**

```javascript
// Remove the "active" class from all .tab-list and .tab-content <li> elements
var resetTabsListener = classChange.delegate({
  matches: '.tab-list a',
  remove : 'active',
  change : '.tab-list li, .tab-content li'
});

// Add the "active" class to the .tab-list and .tab-content <li> elements with the same
// index as the <a> element in the matched node list that was clicked
var setActiveTabListener = classChange.delegate({
  matches: '.tab-list a',
  add    : 'active',
  change : function(elm, index) {
    // Tab 1 <a>: index = 0
    // Tab 2 <a>: index = 1
    // Tab 3 <a>: index = 2
    return [
      document.querySelectorAll('.tab-list li')[index],
      document.querySelectorAll('.tab-content li')[index]
    ];
  }
});
```

## License

**The MIT License (MIT)**

Copyright (c) 2016 John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
