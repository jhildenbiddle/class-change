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
            classNames.forEach(function(name) {
                elm.classList.toggle(name);
            });
        }
        // Legacy
        else {
            var elmClasses = elm.className.split(' ');

            classNames.forEach(function(name) {
                if (forceTrueFalse === false || (forceTrueFalse === null && elmClasses.indexOf(name) > -1)) {
                    classChange.remove(elm, name);
                }
                else if (forceTrueFalse === true || (forceTrueFalse === null && elmClasses.indexOf(name) === -1)) {
                    classChange.add(elm, name);
                }
            });
        }
    }

    for (var i = 0; i < elms.length; i++) {
        toggleClassNames(elms[i]);
    }

    return elms;
};
