// Exports
// =============================================================================
module.exports = function(elms, classNames) {
    elms       = typeof elms === 'string' ? document.querySelectorAll(elms) : elms && elms.length ? elms : [elms];
    classNames = classNames instanceof Array ? classNames.map(function(name){ return name.trim();}) : classNames.trim().replace(/\s+/g, ' ').split(' ');

    function removeClassNames(elm) {
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

    for (var i = 0; i < elms.length; i++) {
        removeClassNames(elms[i]);
    }

    return elms;
};
