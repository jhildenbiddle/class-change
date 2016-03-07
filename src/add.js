// Exports
// =============================================================================
module.exports = function(elms, classNames) {
    elms       = typeof elms === 'string' ? document.querySelectorAll(elms) : elms && elms.length ? elms : [elms];
    classNames = classNames instanceof Array ? classNames.map(function(name){ return name.trim();}) : classNames.trim().replace(/\s+/g, ' ').split(' ');

    function addClassNames(elm) {
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

    for (var i = 0; i < elms.length; i++) {
        addClassNames(elms[i]);
    }

    return elms;
};
