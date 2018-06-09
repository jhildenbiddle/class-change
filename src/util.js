// Exports
// =============================================================================
/**
 * Converts space-separates list of class names to an array (if necessary) then
 * trims each array item.
 *
 * @export
 * @param {(array|string)} classNames
 * @returns {array}
 */
export function classNamesToArray(classNames) {
    // String - Trim and convert to Array
    if (typeof classNames === 'string') {
        classNames = classNames.trim().replace(/\s+/g, ' ').split(' ');
    }

    if (Array.isArray(classNames)) {
        // Trim items
        classNames = classNames.map(name => name && name.length ? name.trim() : null);

        // Filter out "falsey" values
        classNames = classNames.filter(Boolean);
    }

    return classNames;
}

/**
 * Converts a CSS selector (string), Element, HTMLCollection or NodeList to an
 * array (returns array as-is).
 * - Array: [Element, Element, ...]
 * - Element: document.body
 * - HTMLCollection: document.getElementsByTagName('p')
 * - NodeList: document.querySelectorAll('p')
 * - String (CSS selector): 'p'
 *
 * @export
 * @param {(array|element|htmlcollection|nodelist|string)} elements
 * @param {boolean} [removeDuplicates=true]
 * @returns {array}
 */
export function elementsToArray(elements) {
    // CSS Selector
    if (typeof elements === 'string') {
        elements = Array.apply(null, document.querySelectorAll(elements));
    }
    // HTMLCollection / NodeList
    else if (elements instanceof window.HTMLCollection || elements instanceof window.NodeList) {
        elements = Array.apply(null, elements);
    }
    // Node/Element (assumed)
    else if (elements && !Array.isArray(elements)) {
        elements = [elements];
    }

    if (Array.isArray(elements)) {
        // Remove duplicate
        return elements.filter((value, index, self) => self.indexOf(value) === index);
    }
    else {
        return [];
    }
}

/**
 * Matches self or finds closest ancestor (excluding document) node that match a
 * CSS selector
 *
 * @export
 * @param {element} elm
 * @param {sting} matchSelector
 * @returns {array}
 */
export function getClosest(elm, matchSelector) {
    /* istanbul ignore next */
    const matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;

    let matchedElm = null;
    let testElm    = elm;

    while (testElm && testElm !== document) {
        if (matches.call(testElm, matchSelector)) {
            matchedElm = testElm;
            break;
        }

        testElm = testElm.parentNode;
    }

    return matchedElm;
}

/**
 * Finds all parent nodes (excluding document), optionally limited to only those
 * that match a CSS selector
 *
 * @export
 * @param {element} elm
 * @param {sting} matchSelector
 * @returns {array}
 */
export function getParents(elm, matchSelector) {
    /* istanbul ignore next */
    const matches    = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
    const parentElms = [];

    let testElm = elm.parentNode;

    while (testElm && testElm !== document) {
        if (!matchSelector || matchSelector && matches.call(testElm, matchSelector)) {
            parentElms.push(testElm);
        }

        testElm = testElm.parentNode;
    }

    return parentElms;
}

/**
 * Cross-browser wrapper for native "matches" method
 *
 * @export
 * @param {element} elm
 * @param {string} selector
 * @returns {boolean}
 */
export function matchesSelector(elm, selector) {
    /* istanbul ignore next */
    const matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;

    return matches.call(elm, selector);
}
