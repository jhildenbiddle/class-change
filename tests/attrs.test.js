// Modules
// =============================================================================
import attrs from '../src/attrs.js';
import { expect } from 'chai';


// Variables
// =============================================================================
const classChange = { attrs };


// Tests
// =============================================================================
describe('attrs.js', function() {
    describe('Add/remove listeners', function() {
        it('Can remove listener using arguments', function() {
            document.body.innerHTML = '<button class="foo" data-class-add="bar"></button>';
            const clickElm = document.querySelector('button');
            classChange.attrs();
            classChange.attrs(false);
            clickElm.click();
            expect(clickElm.className).to.equal('foo');
        });

        it('Can remove listener using remove() method', function() {
            document.body.innerHTML = '<button class="foo" data-class-add="bar"></button>';
            const clickElm = document.querySelector('button');
            const listener = classChange.attrs();
            listener.remove();
            clickElm.click();
            expect(clickElm.className).to.equal('foo');
        });
    });

    describe('Apply class changes', function() {
        before(function() {
            // Add event listener
            classChange.attrs();
        });

        after(function() {
            // Remove event listener
            classChange.attrs(false);
        });

        it('Can add class name to self', function() {
            document.body.innerHTML = '<button class="foo" data-class-add="bar"></button>';
            const clickElm = document.querySelector('button');
            clickElm.click();
            expect(clickElm.className).to.equal('foo bar');
        });

        it('Can remove class name from self', function() {
            document.body.innerHTML = '<button class="foo bar" data-class-remove="bar"></button>';
            const clickElm = document.querySelector('button');
            clickElm.click();
            expect(clickElm.className).to.equal('foo');
        });

        it('Can toggle class names on self', function() {
            document.body.innerHTML = '<button class="foo" data-class-toggle="foo bar"></button>';
            const clickElm = document.querySelector('button');
            clickElm.click();
            expect(clickElm.className).to.equal('bar');
        });

        it('Can add, remove and toggle class names on self', function() {
            document.body.innerHTML = '<button class="foo" data-class-add="bar" data-class-remove="foo" data-class-toggle="baz"></button>';
            const clickElm = document.querySelector('button');
            clickElm.click();
            expect(clickElm.className).to.equal('bar baz');
        });

        it('Can add, remove and toggle class names on closest ancestor', function() {
            document.body.innerHTML = `
                <div>
                    <p class="foo">
                        <span class="foo">
                            <button data-class-add="bar" data-class-remove="foo" data-class-toggle="baz" data-class-closest=".foo"></button>
                        </span>
                    </p>
                </div>
            `;
            const clickElm = document.querySelector('button');
            clickElm.click();
            expect(document.querySelector('div').className).to.equal('');
            expect(document.querySelector('p').className).to.equal('foo');
            expect(document.querySelector('span').className).to.equal('bar baz');
            expect(clickElm.className).to.equal('');
        });

        it('Can add, remove and toggle class names on parents', function() {
            document.body.innerHTML = `
                <div>
                    <p class="foo">
                        <span class="foo">
                            <button data-class-add="bar" data-class-remove="foo" data-class-toggle="baz" data-class-parents=".foo"></button>
                        </span>
                    </p>
                </div>
            `;
            const clickElm = document.querySelector('button');
            clickElm.click();
            expect(document.querySelector('div').className).to.equal('');
            expect(document.querySelector('p').className).to.equal('bar baz');
            expect(document.querySelector('span').className).to.equal('bar baz');
            expect(clickElm.className).to.equal('');
        });

        it('Can add, remove and toggle class names on siblings', function() {
            document.body.innerHTML = `
                <div></div>
                <p class="foo"></p>
                <span class="foo"></span>
                <button data-class-add="bar" data-class-remove="foo" data-class-toggle="baz" data-class-siblings=".foo"></button>
            `;
            const clickElm = document.querySelector('button');
            clickElm.click();
            expect(document.querySelector('div').className).to.equal('');
            expect(document.querySelector('p').className).to.equal('bar baz');
            expect(document.querySelector('span').className).to.equal('bar baz');
            expect(clickElm.className).to.equal('');
        });

        it('Can add, remove and toggle class names on target', function() {
            document.body.innerHTML = `
                <div class="foo"></div>
                <p>
                    <span class="foo">
                        <button data-class-add="bar" data-class-remove="foo" data-class-toggle="baz" data-class-target=".foo"></button>
                    </span>
                </p>
            `;
            const clickElm = document.querySelector('button');
            clickElm.click();
            expect(document.querySelector('div').className).to.equal('bar baz');
            expect(document.querySelector('p').className).to.equal('');
            expect(document.querySelector('span').className).to.equal('bar baz');
            expect(clickElm.className).to.equal('');
        });

        it('Can bubble add, remove and toggle class change events', function() {
            document.body.innerHTML = `
                <p class="foo"></p>
                <button>
                    <span data-class-add="bar" data-class-target="p">
                        <span data-class-remove="foo" data-class-target="p">
                            <span data-class-toggle="baz" data-class-target="p"></span>
                        </span>
                    </span>
                </button>
            `;
            const clickElm  = document.querySelector('button span span span');
            const targetElm = document.querySelector('p');
            clickElm.click();
            expect(targetElm.className).to.equal('baz bar');
        });
    });
});
