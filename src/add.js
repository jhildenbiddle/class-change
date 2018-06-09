// Modules
// =============================================================================
import { elementsToArray, classNamesToArray } from './util.js';


// Functions
// =============================================================================
/**
 * Add class name(s) to target element(s)
 *
 * @param {(array|element|htmlcollection|nodelist|string)} target -
 *   Element(s) to add class name(s) to
 * @param {(array|function|string)} classNames - Array, space-separated list,
 *  or function that returns array/string of class name(s)
 * @returns {(array|element)} - Target(s)
 */
function addClass(target, classNames) {
    const elms = elementsToArray(target);

    elms.forEach(function(elm, i) {
        const classArray = classNamesToArray(classNames instanceof Function ? classNames(elm, i) : classNames);

        if (classArray && classArray.length) {
            const elmClassArray   = elm.className.length ? elm.className.split(' ') : [];
            const newClassArray   = classArray.filter(className => elmClassArray.indexOf(className) === -1);
            const finalClassArray = elmClassArray.concat(newClassArray);

            elm.className = finalClassArray.join(' ');
        }
    });

    return elms.length === 1 ? elms[0] : elms;
}


// Exports
// =============================================================================
export default addClass;
