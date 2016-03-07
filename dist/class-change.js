(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.classChange = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Modules
// =============================================================================
var add      = require('./src/add');
var delegate = require('./src/delegate');
var remove   = require('./src/remove');
var toggle   = require('./src/toggle');

// Exports
// =============================================================================
module.exports = {
    add     : add,
    delegate: delegate,
    remove  : remove,
    toggle  : toggle
};

},{"./src/add":2,"./src/delegate":3,"./src/remove":4,"./src/toggle":5}],2:[function(require,module,exports){
// Exports
// =============================================================================
module.exports = function(elms, classNames) {
    elms       = typeof elms === 'string' ? document.querySelectorAll(elms) : elms && elms.length ? elms : [elms];
    classNames = classNames instanceof Array ? classNames.map(function(name){ return name.trim();}) : classNames.trim().replace(/\s+/g, ' ').split(' ');

    function addClassNames(elm) {
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

    for (var i = 0; i < elms.length; i++) {
        addClassNames(elms[i]);
    }

    return elms;
};

},{}],3:[function(require,module,exports){
// Modules
// =============================================================================
var classChange = {
    add   : require('./add'),
    remove: require('./remove'),
    toggle: require('./toggle')
};

// Exports
// =============================================================================
module.exports = function(options) {
    var settings  = {
        // Element to apply listener to
        target : options.target  || document.body,
        // Type of event
        event  : options.event   || 'click',
        // CSS selector to test against event
        matches: options.matches || null,
        // List of class names to add (String or Array)
        add    : options.add     || null,
        // List of class names to remove (String or Array)
        remove : options.remove  || null,
        // List of class names to remove (String or Array)
        toggle : options.toggle  || null,
        // Element, Array, Node List, CSS selector or Function
        // If null, change is applied to event target element
        change : options.change  || null
    };

    // Target: CSS Selector
    if (typeof settings.target === 'string') {
        settings.target = document.querySelector(settings.target);
    }

    // Functions
    // -------------------------------------------------------------------------
    // Add event listener
    function addListener(changeType) {
        var listener = function(e) {
            var eventElm = e.target;
            var i;

            // Ensure event element matches
            if (matchesSelector(eventElm, settings.matches)) {
                var changeElms = settings.change || eventElm;

                // Change: Function
                if (changeElms instanceof Function) {
                    var index = null;

                    // Get index of elements within matched nodes
                    if (settings.matches) {
                        var matchElms = settings.target.querySelectorAll(settings.matches);

                        for (i = 0; i < matchElms.length; i++) {
                            if (eventElm == matchElms[i]) {
                                index = i;
                                break;
                            }
                        }
                    }

                    // Call change function
                    changeElms = changeElms(eventElm, index);
                }

                // Change: CSS Selector
                if (typeof changeElms === 'string') {
                    changeElms = settings.target.querySelectorAll(changeElms);
                }

                // Ensure changeElm(s) exist
                if (changeElms) {
                    // Convert single element to array
                    if (!changeElms.length) {
                        changeElms = [changeElms];
                    }

                    // Loop through elements and change classes
                    for (i = 0; i < changeElms.length; i++) {
                        // Call change method
                        classChange[changeType](changeElms[i], settings[changeType]);
                    }
                }
            }
        };

        // Add event listener
        settings.target.addEventListener(settings.event, listener);

        // Store target, event type and listener reference
        var data = {
            target  : settings.target,
            event   : settings.event,
            matches : settings.matches,
            change  : settings.change,
            listener: listener
        };

        data[changeType] = settings[changeType];

        // Return stored reference
        return data;
    }

    // Cross-browser wrapper for native "matches" method
    function matchesSelector(elm, selector) {
        var matchesSelector = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
        return matchesSelector.call(elm, selector);
    }

    // Data & Methods
    // -------------------------------------------------------------------------
    var ctx = {
        listeners: [],
        remove: function destroy() {
            for (var i = 0; i < this.listeners.length; i++) {
                var listener = this.listeners[i];

                listener.target.removeEventListener(listener.event, listener.listener);
            }
        }
    };

    // Main
    // -------------------------------------------------------------------------
    // Loop through class lists
    ['toggle', 'remove', 'add'].forEach(function(changeType) {
        var list = settings[changeType];

        if (list) {
            // Convert values to arrays
            if (typeof list === 'string') {
                // Trim class names and create array of class names
                settings[changeType] = list.trim().replace(/\s+/g, ' ').split(' ');
            }
            else {
                // Trim class names
                settings[changeType] = settings[changeType].map(function(className) {
                    return className.trim();
                });
            }

            // Add event listener
            var listener = addListener(changeType);

            // Push listener reference
            ctx.listeners.push(listener);
        }
    });

    // Return Data & Methods
    // -------------------------------------------------------------------------
    return ctx;
};

},{"./add":2,"./remove":4,"./toggle":5}],4:[function(require,module,exports){
// Exports
// =============================================================================
module.exports = function(elms, classNames) {
    elms       = typeof elms === 'string' ? document.querySelectorAll(elms) : elms && elms.length ? elms : [elms];
    classNames = classNames instanceof Array ? classNames.map(function(name){ return name.trim();}) : classNames.trim().replace(/\s+/g, ' ').split(' ');

    function removeClassNames(elm) {
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

    for (var i = 0; i < elms.length; i++) {
        removeClassNames(elms[i]);
    }

    return elms;
};

},{}],5:[function(require,module,exports){
// Modules
// =============================================================================
var classChange = {
    add   : require('./add'),
    remove: require('./remove')
};

// Exports
// =============================================================================
module.exports = function(elms, classNames, forceTrueFalse) {
    elms           = typeof elms === 'string' ? document.querySelectorAll(elms) : elms && elms.length ? elms : [elms];
    classNames     = classNames instanceof Array ? classNames.map(function(name){ return name.trim();}) : classNames.trim().replace(/\s+/g, ' ').split(' ');
    forceTrueFalse = forceTrueFalse || null;

    function toggleClassNames(elm) {
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

    for (var i = 0; i < elms.length; i++) {
        toggleClassNames(elms[i]);
    }

    return elms;
};

},{"./add":2,"./remove":4}]},{},[1])(1)
});