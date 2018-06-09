// Modules
// =============================================================================
import add    from './add.js';
import remove from './remove.js';
import toggle from './toggle.js';
import { elementsToArray, matchesSelector, getClosest, getParents } from './util.js';


// Variables
// =============================================================================
const classChange = { add, remove, toggle };


// Functions
// =============================================================================
/**
 * Adds or removes click/tap event listener(s) on elements that have
 * data-class-* attributes and trigger associated method(s).
 *
 * @param {(array|element|htmlcollection|nodelist|string)} [listenerTarget=document]
 * @param {boolean} [addTrueRemoveFalse=true]
 */
function addRemoveAttrListener(listenerTarget = document, addTrueRemoveFalse = true) {
    // Allow boolean for listenerTarget
    // true = add default listener, false = remove default listener
    addTrueRemoveFalse = typeof(listenerTarget) === 'boolean' ? listenerTarget : addTrueRemoveFalse;
    listenerTarget = typeof(listenerTarget) === 'boolean' ? document : listenerTarget;

    const elms   = elementsToArray(listenerTarget);
    const method = listenerTarget === false || addTrueRemoveFalse === false ? 'removeEventListener' : 'addEventListener';

    elms.forEach(function(elm) {
        elm[method]('click', handleAttrEvent);
    });

    // Return object containing remove method
    return {
        remove() {
            elms.forEach(function(elm) {
                elm.removeEventListener('click', handleAttrEvent);
            });
        }
    };
}

/**
 * Handles click/tap events triggered via data-class-* attributes.
 *
 * @param {object} evt
 */
function handleAttrEvent(evt) {
    const elms          = [evt.target].concat(getParents(evt.target));
    const matchSelector = '[data-class-add],[data-class-remove],[data-class-toggle]';
    const methods       = ['add', 'remove', 'toggle'];

    elms.forEach(function(elm) {
        const hasAttr = matchesSelector(elm, matchSelector);

        if (hasAttr) {
            const changeTasks = {};

            methods.forEach(function(method) {
                const classNames = elm.getAttribute(`data-class-${method}`);

                if (classNames && classNames.length) {
                    const closestAttr  = elm.getAttribute(`data-class-${method}-closest`) || elm.getAttribute('data-class-closest');
                    const parentsAttr  = elm.getAttribute(`data-class-${method}-parents`) || elm.getAttribute('data-class-parents');
                    const siblingsAttr = elm.getAttribute(`data-class-${method}-siblings`) || elm.getAttribute('data-class-siblings');
                    const targetAttr   = elm.getAttribute(`data-class-${method}-target`) || elm.getAttribute('data-class-target');

                    let changeElms = [];

                    if (closestAttr) {
                        const elms = getClosest(elm, closestAttr);
                        changeElms = changeElms.concat(elms);
                    }
                    if (parentsAttr) {
                        const elms = getParents(elm, parentsAttr);
                        changeElms = changeElms.concat(elms);
                    }
                    if (siblingsAttr) {
                        const siblingElms = elementsToArray(elm.parentNode.children);

                        siblingElms.forEach(function(siblingElm) {
                            const isSibling = siblingElm !== elm;
                            const isMatch   = matchesSelector(siblingElm, siblingsAttr);

                            if (isSibling && isMatch) {
                                changeElms.push(siblingElm);
                            }
                        });
                    }
                    if (targetAttr) {
                        const elms = elementsToArray(document.querySelectorAll(targetAttr));
                        changeElms = changeElms.concat(elms);
                    }

                    changeTasks[method] = {
                        target: changeElms.length ? changeElms : elm,
                        classNames
                    };
                }
            });

            methods.forEach(function(method) {
                if (changeTasks[method]) {
                    classChange[method](changeTasks[method].target, changeTasks[method].classNames);
                }
            });
        }
    });
}


// Exports
// =============================================================================
export default addRemoveAttrListener;
