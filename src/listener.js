// Modules
// =============================================================================
var classChange = {
        add   : require('./add'),
        remove: require('./remove'),
        toggle: require('./toggle')
    };
var util = require('./util');

// Exports
// =============================================================================
module.exports = function(options) {
    var settings  = {
        target : options.target  || document.body,
        event  : options.event   || 'click',
        match  : options.match   || null,
        change : options.change  || null,
        add    : options.add     || null,
        remove : options.remove  || null,
        toggle : options.toggle  || null
    };

    // Convert settings.target CSS selector to NodeList
    if (typeof settings.target === 'string') {
        settings.target = document.querySelectorAll(settings.target);
    }

    // Convert single element listener target to an array
    // Allows for iterating over targets and adding event listeners
    if (!util.isIterableList(settings.target)) {
        settings.target = [settings.target];
    }

    // Functions
    // -------------------------------------------------------------------------
    // Add event listener
    function addListener(listenerTarget, changeType) {
        var listener = function(evt) {
            var eventElm  = evt.target;
            var matchElms = settings.match;
            var triggerChange, i, len;

            // If matchElms is a function, call the function and set matchElms
            // to the return value.
            if (matchElms instanceof Function) {
                matchElms = matchElms(eventElm, evt);
            }

            // If matchElms is a CSS selector, trigger the class change event
            // if the event.target matches the selector.
            if (typeof matchElms === 'string') {
                triggerChange = util.matchesSelector(eventElm, matchElms);

                // If it's a match, convert the CSS selector to a NodeList.
                if (triggerChange) {
                    matchElms = listenerTarget.querySelectorAll(matchElms);
                }
            }

            // If matchElms has not been specified, set matchElms to the
            // event.target and trigger the change.
            if (matchElms === null) {
                matchElms = eventElm;
                triggerChange = true;
            }
            // If matchElms is an iterable object, loop over the items
            // and check if the event.target trigger the event if it is part of
            // the collection.
            else if (util.isIterableList(matchElms)) {
                for (i = 0, len = matchElms.length; i < len; i++) {
                    if (eventElm === matchElms[i]) {
                        triggerChange = true;
                        break;
                    }
                }
            }
            // If matchElms is an non-iterable object, trigger the
            // class change event if the event.target is the object.
            else if (typeof matchElms === 'object') {
                triggerChange = eventElm === matchElms;
            }

            // Trigger the class change event
            if (triggerChange) {
                // Set the elements to receive the class change to either
                // those specified by settings.change or the event.target
                var changeElms = settings.change || eventElm;

                // If changeElms is a function, call the function and set
                // changeElms to the return value.
                if (changeElms instanceof Function) {
                    var index = null;

                    // Get index of the event.target within the collection of
                    // matched elements to pass to function as argument.
                    if (matchElms) {
                        if (util.isIterableList(matchElms)) {
                            for (i = 0, len = matchElms.length; i < len; i++) {
                                if (eventElm === matchElms[i]) {
                                    index = i;
                                    break;
                                }
                            }
                        }
                    }

                    // Call change function
                    // Pass the event.target, the event object and the index
                    // of the matched element within the matchElms collection.
                    changeElms = changeElms(eventElm, evt, index);
                }

                // If changeElms is a CSS selector convert it to a NodeList
                if (typeof changeElms === 'string') {
                    changeElms = document.querySelectorAll(changeElms);
                }

                // Convert changeElms to an iterable object if necessary
                if (!util.isIterableList(changeElms)) {
                    changeElms = [changeElms];
                }

                // If the [add/remove/toggle] value is a function, call the
                // function once for every item in changeElms.
                if (settings[changeType] instanceof Function) {
                    for (i = 0, len = changeElms.length; i < len; i++) {
                        // Each time the function is called, pass the
                        // event.target, a changeElms item, and the index of
                        // the item within the changeElms collection.
                        var classNames = settings[changeType](eventElm, evt, changeElms[i], i);

                        // Now that we have the return value of the
                        // [add/remove/toggle] function, pass the class names
                        // to corresponding classChange method.
                        classChange[changeType](changeElms[i], classNames);
                    }
                }
                else {
                    // Change class names (add/remove/toggle)
                    classChange[changeType](changeElms, settings[changeType]);
                }
            }
        };

        // Add event listener
        listenerTarget.addEventListener(settings.event, listener);

        // Store target, event type and listener reference
        var data = {
            target  : listenerTarget,
            event   : settings.event,
            match   : settings.match,
            change  : settings.change,
            listener: listener
        };

        data[changeType] = settings[changeType];

        // Return stored reference
        return data;
    }

    // Data & Methods
    // -------------------------------------------------------------------------
    var ctx = {
        listeners: [],
        remove: function remove() {
            for (var i = 0, len = this.listeners.length; i < len; i++) {
                var settings = this.listeners[i];

                settings.target.removeEventListener(settings.event, settings.listener);
            }
        }
    };

    // Main
    // -------------------------------------------------------------------------
    // Loop through event listener targets
    for (var i = 0, len = settings.target.length; i < len; i++) {
        var currentTarget = settings.target[i];

        // Loop through class lists
        ['toggle', 'remove', 'add'].forEach(function(changeType) {
            if (settings[changeType]) {
                // Add event listener
                var listener = addListener(currentTarget, changeType);

                // Push listener reference
                ctx.listeners.push(listener);
            }
        });
    }

    // Return Data & Methods
    // -------------------------------------------------------------------------
    return ctx;
};
