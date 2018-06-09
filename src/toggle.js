// Modules
// =============================================================================
import add    from './add.js';
import remove from './remove.js';
import { elementsToArray, classNamesToArray } from './util.js';


// Variables
// =============================================================================
const classChange = { add, remove };


// Functions
// =============================================================================
/**
 * Toggle class name(s) on target element(s)
 *
 * @param {(array|element|htmlcollection|nodelist|string)} target -
 *   Element(s) to toggle class name(s) on
 * @param {(array|function|string)} classNames - Array, space-separated list, or
 *   function that returns array/string of class name(s)
 * @param {boolean} [forceTrueFalse] - Force add when true, remove when false
 * @returns {(array|element)} - Target(s)
 */
function toggleClass(target, classNames, forceTrueFalse) {
    if (forceTrueFalse === true) {
        return classChange.add(target, classNames);
    }
    else if (forceTrueFalse === false) {
        return classChange.remove(target, classNames);
    }
    else {
        const elms = elementsToArray(target);

        elms.forEach(function(elm, i) {
            const classArray = classNamesToArray(classNames instanceof Function ? classNames(elm, i) : classNames);

            if (classArray && classArray.length) {
                const elmClassArray   = elm.className.length ? elm.className.split(' ') : [];
                const keepClassArray  = elmClassArray.filter(className => classArray.indexOf(className) === -1);
                const newClassArray   = classArray.filter(className => elmClassArray.indexOf(className) === -1);
                const finalClassArray = keepClassArray.concat(newClassArray);

                elm.className = finalClassArray.join(' ');
            }
        });

        return elms.length === 1 ? elms[0] : elms;
    }
}


// Exports
// =============================================================================
export default toggleClass;
