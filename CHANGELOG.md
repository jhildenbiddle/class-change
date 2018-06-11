# Change Log

## 1.1.1

*2018-06-11*

- Updated description and documentation

## 1.1.0

*2018-06-09*

**Added**

- Added attrs() method, allowing class changes to be triggered using HTML
  data attributes.
- Added automated tests

## 1.0.3

*2016-09-18*

**Fixed**

- Iterable class list check that prevented classChange from working in IE

## 1.0.2

*2016-08-04*

**Added**

- Switched build to webpack

## 1.0.1

*2016-08-03*

**Added**

- Minor updated to Bower config, .gitignore and README.md

## 1.0.0

*2016-08-01*

**Breaking changes from 0.x**

- The delegate() method has been renamed to listener()
- The delegate() "matches" option has been renamed "match" for listener()
- The delegate() arguments have changed for listener()

**Added**

- add(), remove() and toggle() support Functions as "classNames" arg
- listener() supports Functions as option values
- Adding library to Bower

**Changed**

- add(), remove() and toggle() now return an element when a single element
  is passed as "target" (previously an array with one item was returned)
- listener() "target" option will now create an event listener for all Nodes
  specified. This allows for adding event listeners directly to multiple nodes
  instead of delegating a single event to a parent node.
- Updated README.md

**Fixed**

- Passing "falsey" values as class names to add(), remove(), toggle() and
  listen() will no longer throw an error

## 0.0.4

*2016-03-07*

**Added**

- New demos
- Library documentation added to README

**Changed**

- destroy() method renamed to remove()

**Fixed**

- toggle() force feature with IE10/11
- Changing multiple class names with IE10/11

## 0.0.3

*2016-03-06*

**Added**

- Demo page
- Specify elements using CSS selector with add/remove/toggle methods
- Handle multiple elements being passed to add/remove/toggle methods

## 0.0.2

*2016-03-05*

**Changed**

- Switched to browserify and separate modules for each method

## 0.0.1

*2016-03-05*

**Added**

- Initial release
