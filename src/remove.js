// Modules
// =============================================================================
import { elementsToArray, classNamesToArray } from './util.js';


// Functions
// =============================================================================
/**
 * Remove class name(s) from target element(s)
 *
 * @param {(array|element|htmlcollection|nodelist|string)} target -
 *   Element(s) to remove class name(s) from
 * @param {(array|function|string)} classNames - Array, space-separated list,
 *  or function that returns array/string of class name(s)
 * @returns {(array|element)} - Target(s)
 */
function removeClass(target, classNames) {
    const elms = elementsToArray(target);

    elms.forEach(function(elm, i) {
        const classArray = classNamesToArray(classNames instanceof Function ? classNames(elm, i) : classNames);

        if (elm.className.trim().length && classArray && classArray.length) {
            const elmClassArray   = elm.className.split(' ');
            const finalClassArray = elmClassArray.filter(className => classArray.indexOf(className) === -1);

            // Standardize result of setting empty "class" attribute.
            // Internet Explorer and Edge automatically remove the "class"
            // attribute when it is set to "". Other browsers (Chrome, Firefox,
            // Safari) will set the attribute to "". The difference in these
            // behaviors throws off unit tests, so the following code emulates
            // IE/Edge behavior of removing the attribute when the value is "".
            if (finalClassArray.length) {
                elm.className = finalClassArray.join(' ');
            }
            else {
                elm.removeAttribute('class');
            }
        }
    });

    return elms.length === 1 ? elms[0] : elms;
}


// Exports
// =============================================================================
export default removeClass;
