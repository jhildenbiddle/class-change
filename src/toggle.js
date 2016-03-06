// Modules
// =============================================================================
var classChange = {
    add   : require('./add'),
    remove: require('./remove')
};

// Exports
// =============================================================================
module.exports = function(elm, classNames) {
    classNames     = classNames instanceof Array ? classNames.map(function(name){ return name.trim();}) : classNames.trim().replace(/\s+/g, ' ').split(' ');
    forceTrueFalse = forceTrueFalse || null;

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

    return elm;
};
