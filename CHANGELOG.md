# Change Log

## 0.0.1 - 2016-03-05
**Added**
- Initial release

## 0.0.2 - 2016-03-05
**Changed**
- Switched to browserify and separate modules for each method

## 0.0.3 - 2016-03-06
**Added**
- Index page

**Changed**
- Specify elements using CSS selector with add/remove/toggle methods
- Handle multiple elements being passed to add/remove/toggle methods

## 0.0.4 - 2016-03-07
**Added**
- New demos to index.html
- Library documentation added to README

**Changed**
- destroy() method renamed to remove()

**Fixed**
- toggle() force feature with IE10/11
- Changing multiple class names with IE10/11

## 1.0.0 - 2016-08-01
**Breaking changes from previous versions**
- delegate() has been renamed to listener().
- The "matches" option from delegate() has been renamed "match" for listener().
- The arguments previously passed to delegate() "change" option have changed
  for listener(). See the README for details.

**Added**
- add(), remove() and toggle() support Functions as "classNames" arg.
- listener() supports Functions as option values.
- Adding library to Bower.

**Changed**
- add(), remove() and toggle() now return an element when a single element
  is passed as "target" (previously an array with one item was returned).
- listener() "target" option will now create an event listener for all Nodes
  specified. This allows for adding event listeners directly to multiple nodes
  instead of delegating a single event to a parent node.
- Updated README.md.

**Fixed**
- Passing "falsey" values as class names to add(), remove(), toggle() and
  listen() will no longer throw an error.
