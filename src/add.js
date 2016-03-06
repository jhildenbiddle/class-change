// Exports
// =============================================================================
module.exports = function(elm, classNames) {
    classNames = classNames instanceof Array ? classNames.map(function(name){ return name.trim();}) : classNames.trim().replace(/\s+/g, ' ').split(' ');

    // Native
    if (elm.classList) {
        elm.classList.add.apply(elm.classList, classNames);
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

    return elm;
};
