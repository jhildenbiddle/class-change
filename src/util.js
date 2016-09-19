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
    // Returns true/false if "obj" is an Array or NodeList
    isIterableList: function(obj) {
        return this.isType(obj, 'array|nodelist');
    },
    // Returns true/false if type match
    // Test multiple types using "|" as separator (Ex: "type1|type2")
    isType: function(val, type) {
        var re = new RegExp(type.toLowerCase());

        return re.test(this.getType(val).toLowerCase());
    },
    // Returns specific JavaScript type (more specific than typeof)
    getType: function(val) {
        return Object.prototype.toString.call(val).slice(8,-1);
    },
    // Cross-browser wrapper for native "matches" method
    matchesSelector: function(elm, selector) {
        var matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
        return matches.call(elm, selector);
    }
};
