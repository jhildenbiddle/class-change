// Modules
// =============================================================================
var util = require('./util');

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
