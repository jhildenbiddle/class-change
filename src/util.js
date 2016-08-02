// Exports
// =============================================================================
module.exports = {
    classNamesToArray: function(classNames) {
        // String - Trim and convert to Array
        if (typeof classNames === 'string') {
            classNames = classNames.trim().replace(/\s+/g, ' ').split(' ');
        }

        // Trim array items
        if (Array.isArray(classNames)) {
            classNames = classNames.map(function(name) {
                return name && name.length ? name.trim() : null;
            });

            // Filter out "falsey" values
            classNames = classNames.filter(Boolean);
        }

        return classNames;
    },
    // Returns true/false if "obj" is an Object and is iterable
    isIterableObj: function(obj) {
        var isIterable = obj ? typeof obj[Symbol.iterator] === 'function' : false;
        var isObject   = typeof obj === 'object';

        return (isObject && isIterable);
    },
    // Cross-browser wrapper for native "matches" method
    matchesSelector: function(elm, selector) {
        var matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
        return matches.call(elm, selector);
    }
};
