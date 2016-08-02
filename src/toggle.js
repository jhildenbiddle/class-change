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
