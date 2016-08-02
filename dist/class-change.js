(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.classChange = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Modules
// =============================================================================
var add      = require('./src/add');
var listener = require('./src/listener');
var remove   = require('./src/remove');
var toggle   = require('./src/toggle');

// Exports
// =============================================================================
module.exports = {
    add     : add,
    listener: listener,
    remove  : remove,
    toggle  : toggle
};

},{"./src/add":2,"./src/listener":3,"./src/remove":4,"./src/toggle":5}],2:[function(require,module,exports){
// Modules
// =============================================================================
var util = require('./util');

// Exports
// =============================================================================
module.exports = function(target, classNames) {
    elms = typeof target === 'string' ? document.querySelectorAll(target) : util.isIterableObj(target) ? target : [target];

    function addClassNames(elm, classNames) {
        // Convert to array and trim values
        classNames = util.classNamesToArray(classNames);

        if (classNames && classNames.length) {
            // Native
            if (elm.classList) {
                classNames.forEach(function(className) {
                    elm.classList.add(className);
                });
            }
            // Legacy
            else {
                var elmClasses = elm.className.split(' ');

                classNames.forEach(function(className) {
                    if (elmClasses.indexOf(className) === -1) {
                        elmClasses.push(className);
                    }
                });

                elm.className = elmClasses.join(' ');
            }
        }
    }

    for (var i = 0, len = elms.length; i < len; i++) {
        if (classNames instanceof Function) {
            addClassNames(elms[i], classNames(elms[i], i));
        }
        else {
            addClassNames(elms[i], classNames);
        }
    }

    return elms.length === 1 ? elms[0] : elms;
};

},{"./util":6}],3:[function(require,module,exports){
// Modules
// =============================================================================
var classChange = {
        add   : require('./add'),
        remove: require('./remove'),
        toggle: require('./toggle')
    };
var util = require('./util');

// Exports
// =============================================================================
module.exports = function(options) {
    var settings  = {
        target : options.target  || document.body,
        event  : options.event   || 'click',
        match  : options.match   || null,
        change : options.change  || null,
        add    : options.add     || null,
        remove : options.remove  || null,
        toggle : options.toggle  || null
    };

    // Convert settings.target CSS selector to NodeList
    if (typeof settings.target === 'string') {
        settings.target = document.querySelectorAll(settings.target);
    }

    // Convert single element listener target to an array
    // Allows for iterating over targets and adding event listeners
    if (!util.isIterableObj(settings.target)) {
        settings.target = [settings.target];
    }

    // Functions
    // -------------------------------------------------------------------------
    // Add event listener
    function addListener(listenerTarget, changeType) {
        var listener = function(evt) {
            var eventElm  = evt.target;
            var matchElms = settings.match;
            var triggerChange, i, len;

            // If matchElms is a function, call the function and set matchElms
            // to the return value.
            if (matchElms instanceof Function) {
                matchElms = matchElms(eventElm, evt);
            }

            // If matchElms is a CSS selector, trigger the class change event
            // if the event.target matches the selector.
            if (typeof matchElms === 'string') {
                triggerChange = util.matchesSelector(eventElm, matchElms);

                // If it's a match, convert the CSS selector to a NodeList.
                if (triggerChange) {
                    matchElms = listenerTarget.querySelectorAll(matchElms);
                }
            }

            // If matchElms has not been specified, set matchElms to the
            // event.target and trigger the change.
            if (matchElms === null) {
                matchElms = eventElm;
                triggerChange = true;
            }
            // If matchElms is an iterable object, loop over the items
            // and check if the event.target trigger the event if it is part of
            // the collection.
            else if (util.isIterableObj(matchElms)) {
                for (i = 0, len = matchElms.length; i < len; i++) {
                    if (eventElm === matchElms[i]) {
                        triggerChange = true;
                        break;
                    }
                }
            }
            // If matchElms is an non-iterable object, trigger the
            // class change event if the event.target is the object.
            else if (typeof matchElms === 'object') {
                triggerChange = eventElm === matchElms;
            }

            // Trigger the class change event
            if (triggerChange) {
                // Set the elements to receive the class change to either
                // those specified by settings.change or the event.target
                var changeElms = settings.change || eventElm;

                // If changeElms is a function, call the function and set
                // changeElms to the return value.
                if (changeElms instanceof Function) {
                    var index = null;

                    // Get index of the event.target within the collection of
                    // matched elements to pass to function as argument.
                    if (matchElms) {
                        if (util.isIterableObj(matchElms)) {
                            for (i = 0, len = matchElms.length; i < len; i++) {
                                if (eventElm === matchElms[i]) {
                                    index = i;
                                    break;
                                }
                            }
                        }
                    }

                    // Call change function
                    // Pass the event.target, the event object and the index
                    // of the matched element within the matchElms collection.
                    changeElms = changeElms(eventElm, evt, index);
                }

                // If changeElms is a CSS selector convert it to a NodeList
                if (typeof changeElms === 'string') {
                    changeElms = document.querySelectorAll(changeElms);
                }

                // Convert changeElms to an iterable object if necessary
                if (!util.isIterableObj(changeElms)) {
                    changeElms = [changeElms];
                }

                // If the [add/remove/toggle] value is a function, call the
                // function once for every item in changeElms.
                if (settings[changeType] instanceof Function) {
                    for (i = 0, len = changeElms.length; i < len; i++) {
                        // Each time the function is called, pass the
                        // event.target, a changeElms item, and the index of
                        // the item within the changeElms collection.
                        var classNames = settings[changeType](eventElm, evt, changeElms[i], i);

                        // Now that we have the return value of the
                        // [add/remove/toggle] function, pass the class names
                        // to corresponding classChange method.
                        classChange[changeType](changeElms[i], classNames);
                    }
                }
                else {
                    // Change class names (add/remove/toggle)
                    classChange[changeType](changeElms, settings[changeType]);
                }
            }
        };

        // Add event listener
        listenerTarget.addEventListener(settings.event, listener);

        // Store target, event type and listener reference
        var data = {
            target  : listenerTarget,
            event   : settings.event,
            match   : settings.match,
            change  : settings.change,
            listener: listener
        };

        data[changeType] = settings[changeType];

        // Return stored reference
        return data;
    }

    // Data & Methods
    // -------------------------------------------------------------------------
    var ctx = {
        listeners: [],
        remove: function remove() {
            for (var i = 0, len = this.listeners.length; i < len; i++) {
                var settings = this.listeners[i];

                settings.target.removeEventListener(settings.event, settings.listener);
            }
        }
    };

    // Main
    // -------------------------------------------------------------------------
    // Loop through event listener targets
    settings.target.forEach(function(listenerTarget) {
        // Loop through class lists
        ['toggle', 'remove', 'add'].forEach(function(changeType) {
            if (settings[changeType]) {
                // Add event listener
                var listener = addListener(listenerTarget, changeType);

                // Push listener reference
                ctx.listeners.push(listener);
            }
        });
    });

    // Return Data & Methods
    // -------------------------------------------------------------------------
    return ctx;
};

},{"./add":2,"./remove":4,"./toggle":5,"./util":6}],4:[function(require,module,exports){
// Modules
// =============================================================================
var util = require('./util');

// Exports
// =============================================================================
module.exports = function(target, classNames) {
    elms = typeof target === 'string' ? document.querySelectorAll(target) : util.isIterableObj(target) ? target : [target];

    function removeClassNames(elm, classNames) {
        // Convert to array and trim values
        classNames = util.classNamesToArray(classNames);

        if (classNames && classNames.length) {
            // Native
            if (elm.classList) {
                classNames.forEach(function(className) {
                    elm.classList.remove(className);
                });
            }
            // Legacy
            else {
                var elmClasses = elm.className.split(' ');

                classNames.forEach(function(className) {
                    var index = elmClasses.indexOf(className);

                    if (index > -1) {
                        elmClasses[index] = '';
                    }
                });

                elm.className = elmClasses.join(' ');
            }
        }
    }

    for (var i = 0, len = elms.length; i < len; i++) {
        if (classNames instanceof Function) {
            removeClassNames(elms[i], classNames(elms[i], i));
        }
        else {
            removeClassNames(elms[i], classNames);
        }
    }

    return elms.length === 1 ? elms[0] : elms;
};

},{"./util":6}],5:[function(require,module,exports){
// Modules
// =============================================================================
var classChange = {
        add   : require('./add'),
        remove: require('./remove')
    };
var util = require('./util');

// Exports
// =============================================================================
module.exports = function(target, classNames, forceTrueFalse) {
    elms = typeof target === 'string' ? document.querySelectorAll(target) : util.isIterableObj(target) ? target : [target];
    forceTrueFalse = forceTrueFalse || null;

    function toggleClassNames(elm, classNames) {
        // Convert to array and trim values
        classNames = util.classNamesToArray(classNames);

        if (classNames && classNames.length) {
            // Native
            if (elm.classList) {
                classNames.forEach(function(className) {
                    if (forceTrueFalse === true) {
                        elm.classList.add(className);
                    }
                    else if (forceTrueFalse === false) {
                        elm.classList.remove(className);
                    }
                    else {
                        elm.classList.toggle(className);
                    }
                });
            }
            // Legacy
            else {
                var elmClasses = elm.className.split(' ');

                classNames.forEach(function(className) {
                    if (forceTrueFalse === false || (forceTrueFalse === null && elmClasses.indexOf(className) > -1)) {
                        classChange.remove(elm, className);
                    }
                    else if (forceTrueFalse === true || (forceTrueFalse === null && elmClasses.indexOf(className) === -1)) {
                        classChange.add(elm, className);
                    }
                });
            }
        }
    }

    for (var i = 0, len = elms.length; i < len; i++) {
        if (classNames instanceof Function) {
            toggleClassNames(elms[i], classNames(elms[i], i));
        }
        else {
            toggleClassNames(elms[i], classNames);
        }
    }

    return elms.length === 1 ? elms[0] : elms;
};

},{"./add":2,"./remove":4,"./util":6}],6:[function(require,module,exports){
// Exports
// =============================================================================
module.exports = {
    classNamesToArray: function(classNames) {
        // String - Trim and convert to Array
        if (typeof classNames === 'string') {
            classNames = classNames.trim().replace(/\s+/g, ' ').split(' ');
        }

        // Trim array items
        if (Array.isArray(classNames)) {
            classNames = classNames.map(function(name) {
                return name && name.length ? name.trim() : null;
            });

            // Filter out "falsey" values
            classNames = classNames.filter(Boolean);
        }

        return classNames;
    },
    // Returns true/false if "obj" is an Object and is iterable
    isIterableObj: function(obj) {
        var isIterable = obj ? typeof obj[Symbol.iterator] === 'function' : false;
        var isObject   = typeof obj === 'object';

        return (isObject && isIterable);
    },
    // Cross-browser wrapper for native "matches" method
    matchesSelector: function(elm, selector) {
        var matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
        return matches.call(elm, selector);
    }
};

},{}]},{},[1])(1)
});