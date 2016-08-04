// Modules
// =============================================================================
var deepcopy = require('deepcopy');
var webpack  = require('webpack');

// Configuration
// =============================================================================
// Unminified
 var unminified = {
    entry: {
        library: __dirname + '/src/index.js'
    },
    output: {
        library      : 'classChange',
        path         : __dirname + '/dist',
        filename     : 'class-change.js',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true)
    ]
};

// Minified
var minified = deepcopy(unminified);
minified.devtool = 'source-map';
minified.plugins.push(new webpack.optimize.UglifyJsPlugin());
minified.output.filename = minified.output.filename.replace(/(\.[\w\d_-]+)$/i, '.min$1');

// Exports
// =============================================================================
module.exports = [ unminified, minified ];
