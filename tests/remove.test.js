// Modules
// =============================================================================
import remove from '../src/remove.js';
import { expect } from 'chai';


// Variables
// =============================================================================
const classChange    = { remove };
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
describe('remove.js', function() {
    describe('Targets', function() {
        describe('Single element', function() {
            sharedSetup({
                htmlBefore: `<p class="${testClass}"></p>`,
                htmlAfter : '<p></p>'
            });

            it('Can remove a class name from an element (element)', function() {
                classChange.remove(document.querySelector('p'), testClass);
            });
            it('Can remove a class name from an element (selector)', function() {
                classChange.remove('p', testClass);
            });
        });

        describe('Multiple elements', function() {
            sharedSetup({
                htmlBefore: `<p class="${testClass}"></p><p class="${testClass}"></p>`,
                htmlAfter : '<p></p><p></p>'
            });

            it('Can remove a class name from multiple elements (array)', function() {
                const elmArray = Array.apply(null, document.getElementsByTagName('p'));

                classChange.remove(elmArray, testClass);
            });
            it('Can remove a class name from multiple elements (htmlcollection)', function() {
                classChange.remove(document.getElementsByTagName('p'), testClass);
            });
            it('Can remove a class name from multiple elements (nodelist)', function() {
                classChange.remove(document.querySelectorAll('p'), testClass);
            });
            it('Can remove a class name from multiple elements (selector)', function() {
                classChange.remove('p', testClass);
            });
        });

        describe('Empty / Null', function() {
            sharedSetup({
                htmlBefore: '<p></p>',
                htmlAfter : '<p></p>'
            });

            it('Can handle target as null', function() {
                classChange.remove(null, 'foo');
            });
            it('Can handle target as empty array', function() {
                classChange.remove('div', 'foo');
            });
        });
    });

    describe('Class names', function() {
        describe('Single class name', function() {
            sharedSetup({
                htmlBefore: `<p class="foo ${testClass}"></p>`,
                htmlAfter : '<p class="foo"></p>'
            });

            it('Can remove a class name (string) from an element', function() {
                classChange.remove('p', testClass);
            });
            it('Can remove a class name (array) from an element', function() {
                classChange.remove('p', [testClass]);
            });
            it('Can remove a class name (function) from an element', function() {
                classChange.remove('p', function() { return testClass; });
            });
        });

        describe('Multiple class names', function() {
            sharedSetup({
                htmlBefore: `<p class="foo ${testClassList}"></p><p class="bar ${testClassList}"></p>`,
                htmlAfter : '<p class="foo"></p><p class="bar"></p>'
            });

            it('Can remove multiple class names (string) from multiple elements', function() {
                classChange.remove('p', testClassList);
            });
            it('Can remove multiple class names (array) from multiple elements', function() {
                classChange.remove('p', testClassArray);
            });
            it('Can remove multiple class names (function) from multiple elements', function() {
                classChange.remove('p', function() { return testClassList; });
            });
        });

        describe('Function index', function() {
            const testClassList0 = testClassArray.map(className => `${className}-0`).join(' ');
            const testClassList1 = testClassArray.map(className => `${className}-1`).join(' ');

            sharedSetup({
                htmlBefore: `<p class="foo ${testClassList0}"></p><p class="bar ${testClassList1}"></p>`,
                htmlAfter : '<p class="foo"></p><p class="bar"></p>'
            });

            it('Can remove multiple class names with index (function) from multiple elements', function() {
                classChange.remove('p', function(elm, elmIndex) { return testClassArray.map(className => `${className}-${elmIndex}`).join(' '); });
            });
        });

        describe('Empty / Null', function() {
            sharedSetup({
                htmlBefore: '<p></p>',
                htmlAfter : '<p></p>'
            });

            it('Can handle classNames as null', function() {
                classChange.remove('p', null);
            });
            it('Can handle classNames as empty array', function() {
                classChange.remove('p', []);
            });
            it('Can handle classNames as empty string', function() {
                classChange.remove('p', '');
            });
            it('Can handle classNames as function without return value', function() {
                classChange.remove('p', function() {});
            });
        });
    });
});