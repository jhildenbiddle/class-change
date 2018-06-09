// Modules
// =============================================================================
import toggle from '../src/toggle.js';
import { expect } from 'chai';


// Variables
// =============================================================================
const classChange    = { toggle };
const testClass      = 'test';
const testClassArray = ['test1', 'test2'];
const testClassList  = testClassArray.join(' ');


// Functions
// =============================================================================
function sharedSetup(options) {
    beforeEach(function() {
        document.body.innerHTML = options.htmlBefore;
    });

    afterEach(function() {
        expect(document.body.innerHTML).to.equal(options.htmlAfter);
    });
}


// Tests
// =============================================================================
describe('toggle.js', function() {
    describe('Targets', function() {
        describe('Single element', function() {
            sharedSetup({
                htmlBefore: '<p></p>',
                htmlAfter : `<p class="${testClassList}"></p>`
            });

            it('Can toggle class names on an element (element)', function() {
                classChange.toggle(document.querySelector('p'), testClassArray);
            });
            it('Can toggle class names on an element (selector)', function() {
                classChange.toggle('p', testClassArray);
            });
        });

        describe('Multiple elements', function() {
            sharedSetup({
                htmlBefore: '<p></p><p></p>',
                htmlAfter : `<p class="${testClassList}"></p><p class="${testClassList}"></p>`,
            });

            it('Can toggle class names on multiple elements (array)', function() {
                const elmArray = Array.apply(null, document.getElementsByTagName('p'));

                classChange.toggle(elmArray, testClassArray);
            });
            it('Can toggle class names on multiple elements (htmlcollection)', function() {
                classChange.toggle(document.getElementsByTagName('p'), testClassArray);
            });
            it('Can toggle class names on multiple elements (nodelist)', function() {
                classChange.toggle(document.querySelectorAll('p'), testClassArray);
            });
            it('Can toggle class names on multiple elements (selector)', function() {
                classChange.toggle('p', testClassArray);
            });
        });

        describe('Empty / Null', function() {
            sharedSetup({
                htmlBefore: '<p></p>',
                htmlAfter : '<p></p>'
            });

            it('Can handle target as null', function() {
                classChange.toggle(null, 'foo');
            });
            it('Can handle target as empty array', function() {
                classChange.toggle('div', 'foo');
            });
        });
    });

    describe('Class names', function() {
        describe('Add single class name:', function() {
            sharedSetup({
                htmlBefore: '<p class="foo"></p>',
                htmlAfter : `<p class="foo ${testClass}"></p>`
            });

            it('Can toggle (add) a class name (string) on an element', function() {
                classChange.toggle('p', testClass);
            });
            it('Can toggle (add) a class name (array) on an element', function() {
                classChange.toggle('p', [testClass]);
            });
            it('Can toggle (add) a class name (function) on an element', function() {
                classChange.toggle('p', function() { return testClass; });
            });
            it('Can toggle (add) a class name using forceTrueFalse (true)', function() {
                classChange.toggle('p', testClass, true);
            });
        });

        describe('Remove single class name', function() {
            sharedSetup({
                htmlBefore: `<p class="foo ${testClass}"></p>`,
                htmlAfter : '<p class="foo"></p>'
            });

            it('Can toggle (remove) a class name (string) on an element', function() {
                classChange.toggle('p', testClass);
            });
            it('Can toggle (remove) a class name (array) on an element', function() {
                classChange.toggle('p', [testClass]);
            });
            it('Can toggle (remove) a class name (function) on an element', function() {
                classChange.toggle('p', function() { return testClass; });
            });
            it('Can toggle (remove) a class name using forceTrueFalse (false)', function() {
                classChange.toggle('p', testClass, false);
            });
        });

        describe('Multiple class names', function() {
            sharedSetup({
                htmlBefore: `<p class="foo ${testClassArray[0]}"></p><p class="bar ${testClassArray[1]}"></p>`,
                htmlAfter : `<p class="foo ${testClassArray[1]}"></p><p class="bar ${testClassArray[0]}"></p>`,
            });

            it('Can toggle multiple class names (string) on multiple elements', function() {
                classChange.toggle('p', testClassList);
            });
            it('Can toggle multiple class names (array) on multiple elements', function() {
                classChange.toggle('p', testClassArray);
            });
            it('Can toggle multiple class names (function) on multiple elements', function() {
                classChange.toggle('p', function() { return testClassArray; });
            });
        });

        describe('Function index', function() {
            const testClassList0 = testClassArray.map(className => `${className}-0`).join(' ');
            const testClassList1 = testClassArray.map(className => `${className}-1`).join(' ');

            sharedSetup({
                htmlBefore: '<p class="foo"></p><p class="bar"></p>',
                htmlAfter : `<p class="foo ${testClassList0}"></p><p class="bar ${testClassList1}"></p>`
            });

            it('Can toggle multiple class names with index (function) on multiple elements', function() {
                classChange.toggle('p', function(elm, elmIndex) { return testClassArray.map(className => `${className}-${elmIndex}`).join(' '); });
            });
        });

        describe('Empty / Null', function() {
            sharedSetup({
                htmlBefore: '<p></p>',
                htmlAfter : '<p></p>'
            });

            it('Can handle classNames as null', function() {
                classChange.toggle('p', null);
            });
            it('Can handle classNames as empty array', function() {
                classChange.toggle('p', []);
            });
            it('Can handle classNames as empty string', function() {
                classChange.toggle('p', '');
            });
            it('Can handle classNames as function without return value', function() {
                classChange.toggle('p', function() {});
            });
        });
    });
});
