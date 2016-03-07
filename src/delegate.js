// Modules
// =============================================================================
var classChange = {
    add   : require('./add'),
    remove: require('./remove'),
    toggle: require('./toggle')
};

// Exports
// =============================================================================
module.exports = function(options) {
    var settings  = {
        // Element to apply listener to
        target : options.target  || document.body,
        // Type of event
        event  : options.event   || 'click',
        // CSS selector to test against event
        matches: options.matches || null,
        // List of class names to add (String or Array)
        add    : options.add     || null,
        // List of class names to remove (String or Array)
        remove : options.remove  || null,
        // List of class names to remove (String or Array)
        toggle : options.toggle  || null,
        // Element, Array, Node List, CSS selector or Function
        // If null, change is applied to event target element
        change : options.change  || null
    };

    // Target: CSS Selector
    if (typeof settings.target === 'string') {
        settings.target = document.querySelector(settings.target);
    }

    // Functions
    // -------------------------------------------------------------------------
    // Add event listener
    function addListener(changeType) {
        var listener = function(e) {
            var eventElm = e.target;
            var i;

            // Ensure event element matches
            if (matchesSelector(eventElm, settings.matches)) {
                var changeElms = settings.change || eventElm;

                // Change: Function
                if (changeElms instanceof Function) {
                    var index = null;

                    // Get index of elements within matched nodes
                    if (settings.matches) {
                        var matchElms = settings.target.querySelectorAll(settings.matches);

                        for (i = 0; i < matchElms.length; i++) {
                            if (eventElm == matchElms[i]) {
                                index = i;
                                break;
                            }
                        }
                    }

                    // Call change function
                    changeElms = changeElms(eventElm, index);
                }

                // Change: CSS Selector
                if (typeof changeElms === 'string') {
                    changeElms = settings.target.querySelectorAll(changeElms);
                }

                // Ensure changeElm(s) exist
                if (changeElms) {
                    // Convert single element to array
                    if (!changeElms.length) {
                        changeElms = [changeElms];
                    }

                    // Loop through elements and change classes
                    for (i = 0; i < changeElms.length; i++) {
                        // Call change method
                        classChange[changeType](changeElms[i], settings[changeType]);
                    }
                }
            }
        };

        // Add event listener
        settings.target.addEventListener(settings.event, listener);

        // Store target, event type and listener reference
        var data = {
            target  : settings.target,
            event   : settings.event,
            matches : settings.matches,
            change  : settings.change,
            listener: listener
        };

        data[changeType] = settings[changeType];

        // Return stored reference
        return data;
    }

    // Cross-browser wrapper for native "matches" method
    function matchesSelector(elm, selector) {
        var matchesSelector = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
        return matchesSelector.call(elm, selector);
    }

    // Data & Methods
    // -------------------------------------------------------------------------
    var ctx = {
        listeners: [],
        remove: function destroy() {
            for (var i = 0; i < this.listeners.length; i++) {
                var listener = this.listeners[i];

                listener.target.removeEventListener(listener.event, listener.listener);
            }
        }
    };

    // Main
    // -------------------------------------------------------------------------
    // Loop through class lists
    ['toggle', 'remove', 'add'].forEach(function(changeType) {
        var list = settings[changeType];

        if (list) {
            // Convert values to arrays
            if (typeof list === 'string') {
                // Trim class names and create array of class names
                settings[changeType] = list.trim().replace(/\s+/g, ' ').split(' ');
            }
            else {
                // Trim class names
                settings[changeType] = settings[changeType].map(function(className) {
                    return className.trim();
                });
            }

            // Add event listener
            var listener = addListener(changeType);

            // Push listener reference
            ctx.listeners.push(listener);
        }
    });

    // Return Data & Methods
    // -------------------------------------------------------------------------
    return ctx;
};
