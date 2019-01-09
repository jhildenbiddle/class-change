/*!
 * class-change
 * v1.1.4
 * https://jhildenbiddle.github.io/class-change
 * (c) 2018-2019 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, 
    global.classChange = factory());
})(this, function() {
    "use strict";
    function classNamesToArray(classNames) {
        if (typeof classNames === "string") {
            classNames = classNames.trim().replace(/\s+/g, " ").split(" ");
        }
        if (Array.isArray(classNames)) {
            classNames = classNames.map(function(name) {
                return name && name.length ? name.trim() : null;
            });
            classNames = classNames.filter(Boolean);
        }
        return classNames;
    }
    function elementsToArray(elements) {
        if (typeof elements === "string") {
            elements = Array.apply(null, document.querySelectorAll(elements));
        } else if (elements instanceof window.HTMLCollection || elements instanceof window.NodeList) {
            elements = Array.apply(null, elements);
        } else if (elements && !Array.isArray(elements)) {
            elements = [ elements ];
        }
        if (Array.isArray(elements)) {
            return elements.filter(function(value, index, self) {
                return self.indexOf(value) === index;
            });
        } else {
            return [];
        }
    }
    function getClosest(elm, matchSelector) {
        var matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
        var matchedElm = null;
        var testElm = elm;
        while (testElm && testElm !== document) {
            if (matches.call(testElm, matchSelector)) {
                matchedElm = testElm;
                break;
            }
            testElm = testElm.parentNode;
        }
        return matchedElm;
    }
    function getParents(elm, matchSelector) {
        var matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
        var parentElms = [];
        var testElm = elm.parentNode;
        while (testElm && testElm !== document) {
            if (!matchSelector || matchSelector && matches.call(testElm, matchSelector)) {
                parentElms.push(testElm);
            }
            testElm = testElm.parentNode;
        }
        return parentElms;
    }
    function matchesSelector(elm, selector) {
        var matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
        return matches.call(elm, selector);
    }
    function addClass(target, classNames) {
        var elms = elementsToArray(target);
        elms.forEach(function(elm, i) {
            var classArray = classNamesToArray(classNames instanceof Function ? classNames(elm, i) : classNames);
            if (classArray && classArray.length) {
                var elmClassArray = elm.className.length ? elm.className.split(" ") : [];
                var newClassArray = classArray.filter(function(className) {
                    return elmClassArray.indexOf(className) === -1;
                });
                var finalClassArray = elmClassArray.concat(newClassArray);
                elm.className = finalClassArray.join(" ");
            }
        });
        return elms.length === 1 ? elms[0] : elms;
    }
    function removeClass(target, classNames) {
        var elms = elementsToArray(target);
        elms.forEach(function(elm, i) {
            var classArray = classNamesToArray(classNames instanceof Function ? classNames(elm, i) : classNames);
            if (elm.className.trim().length && classArray && classArray.length) {
                var elmClassArray = elm.className.split(" ");
                var finalClassArray = elmClassArray.filter(function(className) {
                    return classArray.indexOf(className) === -1;
                });
                if (finalClassArray.length) {
                    elm.className = finalClassArray.join(" ");
                } else {
                    elm.removeAttribute("class");
                }
            }
        });
        return elms.length === 1 ? elms[0] : elms;
    }
    var classChange = {
        add: addClass,
        remove: removeClass
    };
    function toggleClass(target, classNames, forceTrueFalse) {
        if (forceTrueFalse === true) {
            return classChange.add(target, classNames);
        } else if (forceTrueFalse === false) {
            return classChange.remove(target, classNames);
        } else {
            var elms = elementsToArray(target);
            elms.forEach(function(elm, i) {
                var classArray = classNamesToArray(classNames instanceof Function ? classNames(elm, i) : classNames);
                if (classArray && classArray.length) {
                    var elmClassArray = elm.className.length ? elm.className.split(" ") : [];
                    var keepClassArray = elmClassArray.filter(function(className) {
                        return classArray.indexOf(className) === -1;
                    });
                    var newClassArray = classArray.filter(function(className) {
                        return elmClassArray.indexOf(className) === -1;
                    });
                    var finalClassArray = keepClassArray.concat(newClassArray);
                    elm.className = finalClassArray.join(" ");
                }
            });
            return elms.length === 1 ? elms[0] : elms;
        }
    }
    var classChange$1 = {
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
    function addRemoveAttrListener() {
        var listenerTarget = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var addTrueRemoveFalse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        addTrueRemoveFalse = typeof listenerTarget === "boolean" ? listenerTarget : addTrueRemoveFalse;
        listenerTarget = typeof listenerTarget === "boolean" ? document : listenerTarget;
        var elms = elementsToArray(listenerTarget);
        var method = listenerTarget === false || addTrueRemoveFalse === false ? "removeEventListener" : "addEventListener";
        elms.forEach(function(elm) {
            elm[method]("click", handleAttrEvent);
        });
        return {
            remove: function remove() {
                elms.forEach(function(elm) {
                    elm.removeEventListener("click", handleAttrEvent);
                });
            }
        };
    }
    function handleAttrEvent(evt) {
        var elms = [ evt.target ].concat(getParents(evt.target));
        var matchSelector = "[data-class-add],[data-class-remove],[data-class-toggle]";
        var methods = [ "add", "remove", "toggle" ];
        elms.forEach(function(elm) {
            var hasAttr = matchesSelector(elm, matchSelector);
            if (hasAttr) {
                var changeTasks = {};
                methods.forEach(function(method) {
                    var classNames = elm.getAttribute("data-class-".concat(method));
                    if (classNames && classNames.length) {
                        var closestAttr = elm.getAttribute("data-class-".concat(method, "-closest")) || elm.getAttribute("data-class-closest");
                        var parentsAttr = elm.getAttribute("data-class-".concat(method, "-parents")) || elm.getAttribute("data-class-parents");
                        var siblingsAttr = elm.getAttribute("data-class-".concat(method, "-siblings")) || elm.getAttribute("data-class-siblings");
                        var targetAttr = elm.getAttribute("data-class-".concat(method, "-target")) || elm.getAttribute("data-class-target");
                        var changeElms = [];
                        if (closestAttr) {
                            var _elms = getClosest(elm, closestAttr);
                            changeElms = changeElms.concat(_elms);
                        }
                        if (parentsAttr) {
                            var _elms2 = getParents(elm, parentsAttr);
                            changeElms = changeElms.concat(_elms2);
                        }
                        if (siblingsAttr) {
                            var siblingElms = elementsToArray(elm.parentNode.children);
                            siblingElms.forEach(function(siblingElm) {
                                var isSibling = siblingElm !== elm;
                                var isMatch = matchesSelector(siblingElm, siblingsAttr);
                                if (isSibling && isMatch) {
                                    changeElms.push(siblingElm);
                                }
                            });
                        }
                        if (targetAttr) {
                            var _elms3 = elementsToArray(document.querySelectorAll(targetAttr));
                            changeElms = changeElms.concat(_elms3);
                        }
                        changeTasks[method] = {
                            target: changeElms.length ? changeElms : elm,
                            classNames: classNames
                        };
                    }
                });
                methods.forEach(function(method) {
                    if (changeTasks[method]) {
                        classChange$1[method](changeTasks[method].target, changeTasks[method].classNames);
                    }
                });
            }
        });
    }
    function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return _typeof(obj);
    }
    var classChange$2 = {
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
    function addChangeListener(options) {
        var settings = {
            target: elementsToArray(options.target || document.body),
            event: options.event || "click",
            match: options.match || true,
            change: options.change || true,
            add: options.add || null,
            remove: options.remove || null,
            toggle: options.toggle || null
        };
        function triggerChangeEvent(evt) {
            handleChangeEvent(evt, settings);
        }
        settings.target.forEach(function(target) {
            target.addEventListener(settings.event, triggerChangeEvent);
        });
        return {
            remove: function remove() {
                settings.target.forEach(function(target) {
                    target.removeEventListener(settings.event, triggerChangeEvent);
                });
            }
        };
    }
    function handleChangeEvent(evt, settings) {
        var matchElms = settings.match instanceof Function ? settings.match(evt) : settings.match;
        var matchedElm;
        if (matchElms === true) {
            matchElms = [ evt.target ];
            matchedElm = evt.target;
        } else if (typeof matchElms === "string") {
            var isMatch = matchesSelector(evt.target, matchElms);
            matchedElm = isMatch ? evt.target : getParents(evt.target).filter(function(elm) {
                return matchesSelector(elm, matchElms);
            })[0] || null;
            matchElms = elementsToArray(matchElms);
        } else if (_typeof(matchElms) === "object") {
            var _isMatch = evt.target === matchElms;
            matchElms = elementsToArray(matchElms);
            matchedElm = _isMatch ? evt.target : matchElms[matchElms.indexOf(evt.target)] || getParents(evt.target).filter(function(elm) {
                return matchElms.indexOf(elm) !== -1;
            })[0] || null;
        }
        if (matchedElm) {
            var matchedElmIndex = matchElms.indexOf(matchedElm);
            var changeElms = settings.change instanceof Function ? settings.change(evt, matchedElm, matchedElmIndex) : settings.change;
            changeElms = changeElms === true ? [ evt.target ] : elementsToArray(changeElms);
            [ "toggle", "remove", "add" ].forEach(function(changeType) {
                if (settings[changeType] instanceof Function) {
                    changeElms.forEach(function(changeElm, changeElmIndex) {
                        var classNames = settings[changeType](evt, matchedElm, matchedElmIndex, changeElm, changeElmIndex);
                        classChange$2[changeType](changeElm, classNames);
                    });
                } else {
                    var classNames = settings[changeType];
                    classChange$2[changeType](changeElms, classNames);
                }
            });
        }
    }
    var index = {
        add: addClass,
        attrs: addRemoveAttrListener,
        listener: addChangeListener,
        remove: removeClass,
        toggle: toggleClass
    };
    return index;
});
//# sourceMappingURL=class-change.js.map
