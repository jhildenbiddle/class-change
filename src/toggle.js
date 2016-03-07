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
