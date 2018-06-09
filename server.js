// Modules
// =============================================================================
const browserSync = require('browser-sync').create();
const compression = require('compression');

browserSync.init({
    files: [
        'docs/**.*'
    ],
    ghostMode: {
        clicks: false,
        forms : false,
        scroll: false
    },
    open: false,
    notify: false,
    reloadOnRestart: false,
    server: {
        baseDir: [
            './docs/'
        ],
        middleware: [
            compression()
        ],
        routes: {
            '/dist': './dist'
        }
    }
});
