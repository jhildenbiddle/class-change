// Modules
// =============================================================================
import add    from './add.js';
import remove from './remove.js';
import toggle from './toggle.js';
import * as util from './util.js';


// Variables
// =============================================================================
const classChange = { add, remove, toggle };


// Functions
// =============================================================================
/**
 * Adds classChange event listener(s) and returns a remove() method
 *
 * @param {object} options
 * @param {(array|element|htmlcollection|nodelist|string)} [options.target=document]
 * @param {string} [options.event="click"]
 * @param {(array|boolean|element|function|htmlcollection|nodelist|string)} [options.match=true]
 * @param {(array|boolean|element|function|htmlcollection|nodelist|string)} [options.change=true]
 * @param {(array|function|string)} [options.add]
 * @param {(array|function|string)} [options.remove]
 * @param {(array|function|string)} [options.toggle]
 * @returns {object} Remove method
 */
function addChangeListener(options) {
    const settings = {
        target: util.elementsToArray(options.target || document.body),
        event : options.event  || 'click',
        match : options.match  || true,
        change: options.change || true,
        add   : options.add    || null,
        remove: options.remove || null,
        toggle: options.toggle || null
    };

    function triggerChangeEvent(evt) {
        handleChangeEvent(evt, settings);
    }

    settings.target.forEach(function(target) {
        target.addEventListener(settings.event, triggerChangeEvent);
    });

    // Return object containing remove method
    return {
        remove() {
            settings.target.forEach(function(target) {
                target.removeEventListener(settings.event, triggerChangeEvent);
            });
        }
    };
}

/**
 * Detects if an event matches the one defined in settings and changes class
 * names on elements accordingly
 *
 * @param {object} evt - Event object
 * @param {object} settings - Listener settings
 */
function handleChangeEvent(evt, settings) {
    let matchElms = settings.match instanceof Function ? settings.match(evt) : settings.match;
    let matchedElm;

    // Match: Event target
    /* istanbul ignore else */
    if (matchElms === true) {
        matchElms  = [evt.target];
        matchedElm = evt.target;
    }
    // Match: CSS selector
    else if (typeof matchElms === 'string') {
        const isMatch = util.matchesSelector(evt.target, matchElms);

        matchedElm = isMatch ? evt.target : util.getParents(evt.target).filter(elm => util.matchesSelector(elm, matchElms))[0] || null;
        matchElms  = util.elementsToArray(matchElms);
    }
    // Match: Array, Element, HTMLCollection, NodeList
    else if (typeof matchElms === 'object') {
        const isMatch = evt.target === matchElms;

        matchElms  = util.elementsToArray(matchElms);
        matchedElm = isMatch ? evt.target : matchElms[matchElms.indexOf(evt.target)] || util.getParents(evt.target).filter(elm => matchElms.indexOf(elm) !== -1)[0] || null;
    }

    // Change
    if (matchedElm) {
        const matchedElmIndex = matchElms.indexOf(matchedElm);
        let   changeElms      = settings.change instanceof Function ? settings.change(evt, matchedElm, matchedElmIndex) : settings.change;

        changeElms = changeElms === true ? [evt.target] : util.elementsToArray(changeElms);

        ['toggle', 'remove', 'add'].forEach(changeType => {
            // If settings value is a function, call for each element with args
            if (settings[changeType] instanceof Function) {
                changeElms.forEach((changeElm, changeElmIndex) => {
                    const classNames = settings[changeType](evt, matchedElm, matchedElmIndex, changeElm, changeElmIndex);

                    classChange[changeType](changeElm, classNames);
                });
            }
            else {
                const classNames = settings[changeType];

                classChange[changeType](changeElms, classNames);
            }
        });
    }
}


// Exports
// =============================================================================
export default addChangeListener;
