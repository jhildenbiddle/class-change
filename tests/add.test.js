// Modules
// =============================================================================
import add from '../src/add.js';
import { expect } from 'chai';


// Variables
// =============================================================================
const classChange    = { add };
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
describe('add.js', function() {
    describe('Targets', function() {
        describe('Single element', function() {
            sharedSetup({
                htmlBefore: '<p></p>',
                htmlAfter : `<p class="${testClass}"></p>`
            });

            it('Can add a class name to an element (element)', function() {
                classChange.add(document.querySelector('p'), testClass);
            });
            it('Can add a class name to an element (selector)', function() {
                classChange.add('p', testClass);
            });
        });

        describe('Multiple elements', function() {
            sharedSetup({
                htmlBefore: '<p></p><p></p>',
                htmlAfter : `<p class="${testClass}"></p><p class="${testClass}"></p>`
            });

            it('Can add a class name to multiple elements (array)', function() {
                const elmArray = Array.apply(null, document.getElementsByTagName('p'));

                classChange.add(elmArray, testClass);
            });
            it('Can add a class name to multiple elements (htmlcollection)', function() {
                classChange.add(document.getElementsByTagName('p'), testClass);
            });
            it('Can add a class name to multiple elements (nodelist)', function() {
                classChange.add(document.querySelectorAll('p'), testClass);
            });
            it('Can add a class name to multiple elements (selector)', function() {
                classChange.add('p', testClass);
            });
        });

        describe('Empty / Null', function() {
            sharedSetup({
                htmlBefore: '<p></p>',
                htmlAfter : '<p></p>'
            });

            it('Can handle target as null', function() {
                classChange.add(null, 'foo');
            });
            it('Can handle target as empty array', function() {
                classChange.add('div', 'foo');
            });
        });
    });

    describe('Class names', function() {
        describe('Single class name', function() {
            sharedSetup({
                htmlBefore: '<p class="foo"></p>',
                htmlAfter : `<p class="foo ${testClass}"></p>`
            });

            it('Can add a class name (string) to an element', function() {
                classChange.add('p', testClass);
            });
            it('Can add a class name (array) to an element', function() {
                classChange.add('p', [testClass]);
            });
            it('Can add a class name (function) to an element', function() {
                classChange.add('p', function() { return testClass; });
            });
        });

        describe('Multiple class names', function() {
            sharedSetup({
                htmlBefore: '<p class="foo"></p><p class="bar"></p>',
                htmlAfter : `<p class="foo ${testClassList}"></p><p class="bar ${testClassList}"></p>`
            });

            it('Can add multiple class names (string) to multiple elements', function() {
                classChange.add('p', testClassList);
            });
            it('Can add multiple class names (array) to multiple elements', function() {
                classChange.add('p', testClassArray);
            });
            it('Can add multiple class names (function) to multiple elements', function() {
                classChange.add('p', function() { return testClassList; });
            });
        });

        describe('Function index', function() {
            const testClassList0 = testClassArray.map(className => `${className}-0`).join(' ');
            const testClassList1 = testClassArray.map(className => `${className}-1`).join(' ');

            sharedSetup({
                htmlBefore: '<p class="foo"></p><p class="bar"></p>',
                htmlAfter : `<p class="foo ${testClassList0}"></p><p class="bar ${testClassList1}"></p>`
            });

            it('Can add multiple class names with index (function) to multiple elements', function() {
                classChange.add('p', function(elm, elmIndex) { return testClassArray.map(className => `${className}-${elmIndex}`).join(' '); });
            });
        });

        describe('Empty / Null', function() {
            sharedSetup({
                htmlBefore: '<p></p>',
                htmlAfter : '<p></p>'
            });

            it('Can handle classNames as null', function() {
                classChange.add('p', null);
            });
            it('Can handle classNames as empty array', function() {
                classChange.add('p', []);
            });
            it('Can handle classNames as empty string', function() {
                classChange.add('p', '');
            });
            it('Can handle classNames as function without return value', function() {
                classChange.add('p', function() {});
            });
        });
    });
});
