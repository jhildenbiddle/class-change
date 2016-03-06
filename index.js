// Modules
// =============================================================================
var add      = require('./src/add');
var delegate = require('./src/delegate');
var remove   = require('./src/remove');
var toggle   = require('./src/toggle');

// Exports
// =============================================================================
module.exports = {
    add     : add,
    delegate: delegate,
    remove  : remove,
    toggle  : toggle
};
