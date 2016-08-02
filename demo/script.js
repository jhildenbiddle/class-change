document.addEventListener("DOMContentLoaded", function(event) {
    // Each classChange.listener call returns an object with a remove() method
    // for removing the event listener. By calling classChange.listener within
    // an Array, a list of these objects is created that can be iterated over
    // to easily remove all event listeners.
    var listenerReferences = [
        // Add
        classChange.listener({
            match : '.listener .add button',
            change: '.listener .add',
            add   : 'active'
        }),
        // Remove
        classChange.listener({
            match : '.listener .remove button',
            change: '.listener .remove',
            remove: 'active'
        }),
        // Toggle
        classChange.listener({
            match : '.listener .toggle button',
            change: '.listener .toggle',
            toggle: 'active'
        }),
        // Match Function
        classChange.listener({
            target: '.functions .match',
            match : function(eventTarget, eventObject) {
                console.log(arguments);
                return 'button';
            },
            change: '.functions .match',
            toggle: 'active'
        }),
        // Change Function
        classChange.listener({
            target: '.functions',
            match : '.change button',
            change: function(eventTarget, eventObject, matchNodeIndex) {
                console.log(arguments);
                return eventTarget.parentNode;
            },
            toggle: 'active'
        }),
        // Toggle Function
        classChange.listener({
            target: '.functions',
            match : '.toggle button',
            change: '.functions .toggle',
            toggle: function(eventTarget, eventObject, changeNode, changeNodeIndex) {
                console.log(arguments);
                return eventTarget.getAttribute('data-classnames') || null;
            }
        })
    ];

    // Add event listener for remove method demo
    document.querySelector('a[data-method="remove"]').addEventListener('click', function(e) {
        listenerReferences.forEach(function(obj) {
            obj.remove();
        });

        console.log('Removed ' + listenerReferences.length + ' event listeners');
    });
});
