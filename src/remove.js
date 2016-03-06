// Exports
// =============================================================================
module.exports = function(elm, classNames) {
    classNames = classNames instanceof Array ? classNames.map(function(name){ return name.trim();}) : classNames.trim().replace(/\s+/g, ' ').split(' ');

    // Native
    if (elm.classList) {
        elm.classList.remove.apply(elm.classList, classNames);
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

    return elm;
};
