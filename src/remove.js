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
