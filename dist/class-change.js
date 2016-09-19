(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["classChange"] = factory();
	else
		root["classChange"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Modules
	// =============================================================================
	var add      = __webpack_require__(2);
	var listener = __webpack_require__(5);
	var remove   = __webpack_require__(3);
	var toggle   = __webpack_require__(4);

	// Exports
	// =============================================================================
	module.exports = {
	    add     : add,
	    listener: listener,
	    remove  : remove,
	    toggle  : toggle
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	    // Returns true/false if "obj" is an Array or NodeList
	    isIterableList: function(obj) {
	        return this.isType(obj, 'array|nodelist');
	    },
	    // Returns true/false if type match
	    // Test multiple types using "|" as separator (Ex: "type1|type2")
	    isType: function(val, type) {
	        var re = new RegExp(type.toLowerCase());

	        return re.test(this.getType(val).toLowerCase());
	    },
	    // Returns specific JavaScript type (more specific than typeof)
	    getType: function(val) {
	        return Object.prototype.toString.call(val).slice(8,-1);
	    },
	    // Cross-browser wrapper for native "matches" method
	    matchesSelector: function(elm, selector) {
	        var matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
	        return matches.call(elm, selector);
	    }
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// Modules
	// =============================================================================
	var util = __webpack_require__(1);

	// Exports
	// =============================================================================
	module.exports = function(target, classNames) {
	    elms = typeof target === 'string' ? document.querySelectorAll(target) : util.isIterableList(target) ? target : [target];

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Modules
	// =============================================================================
	var util = __webpack_require__(1);

	// Exports
	// =============================================================================
	module.exports = function(target, classNames) {
	    elms = typeof target === 'string' ? document.querySelectorAll(target) : util.isIterableList(target) ? target : [target];

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// Modules
	// =============================================================================
	var classChange = {
	        add   : __webpack_require__(2),
	        remove: __webpack_require__(3)
	    };
	var util = __webpack_require__(1);

	// Exports
	// =============================================================================
	module.exports = function(target, classNames, forceTrueFalse) {
	    elms = typeof target === 'string' ? document.querySelectorAll(target) : util.isIterableList(target) ? target : [target];
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Modules
	// =============================================================================
	var classChange = {
	        add   : __webpack_require__(2),
	        remove: __webpack_require__(3),
	        toggle: __webpack_require__(4)
	    };
	var util = __webpack_require__(1);

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
	    if (!util.isIterableList(settings.target)) {
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
	            else if (util.isIterableList(matchElms)) {
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
	                        if (util.isIterableList(matchElms)) {
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
	                if (!util.isIterableList(changeElms)) {
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
	    for (var i = 0, len = settings.target.length; i < len; i++) {
	        var currentTarget = settings.target[i];

	        // Loop through class lists
	        ['toggle', 'remove', 'add'].forEach(function(changeType) {
	            if (settings[changeType]) {
	                // Add event listener
	                var listener = addListener(currentTarget, changeType);

	                // Push listener reference
	                ctx.listeners.push(listener);
	            }
	        });
	    }

	    // Return Data & Methods
	    // -------------------------------------------------------------------------
	    return ctx;
	};


/***/ }
/******/ ])
});
;