// Modules
// =============================================================================
import listener from '../src/listener.js';
import { expect } from 'chai';


// Variables
// =============================================================================
const classChange = { listener };


// Tests
// =============================================================================
describe('listener.js', function() {
    it('Can detect non-match', function() {
        document.body.innerHTML = '<button class="foo"></button>';
        const clickElm = document.querySelector('button');
        const listener = classChange.listener({
            match: 'p',
            add  : 'bar'
        });
        clickElm.click();
        listener.remove();
        expect(clickElm.className).to.equal('foo');
    });

    it('Can add class names on self', function() {
        document.body.innerHTML = '<button class="foo"></button>';
        const clickElm = document.querySelector('button');
        const listener = classChange.listener({
            add: 'bar'
        });
        clickElm.click();
        listener.remove();
        expect(clickElm.className).to.equal('foo bar');
    });

    it('Can remove class names on self', function() {
        document.body.innerHTML = '<button class="foo bar"></button>';
        const clickElm = document.querySelector('button');
        const listener = classChange.listener({
            remove: 'bar'
        });
        clickElm.click();
        listener.remove();
        expect(clickElm.className).to.equal('foo');
    });

    it('Can toggle class names on self', function() {
        document.body.innerHTML = '<button class="foo"></button>';
        const clickElm = document.querySelector('button');
        const listener = classChange.listener({
            toggle: 'foo bar'
        });
        clickElm.click();
        listener.remove();
        expect(clickElm.className).to.equal('bar');
    });

    it('Can add, remove and toggle class names on self', function() {
        document.body.innerHTML = '<button class="foo"></button>';
        const clickElm = document.querySelector('button');
        const listener = classChange.listener({
            add   : 'bar',
            remove: 'foo',
            toggle: 'baz'
        });
        clickElm.click();
        listener.remove();
        expect(clickElm.className).to.equal('baz bar');
    });

    it('Can add, remove and toggle class names on "change" element', function() {
        document.body.innerHTML = '<p class="foo"></p><button class="foo"></button>';
        const clickElm = document.querySelector('button');
        const listener = classChange.listener({
            change: 'p',
            add   : 'bar',
            remove: 'foo',
            toggle: 'baz'
        });
        clickElm.click();
        listener.remove();
        expect(document.querySelector('p').className).to.equal('baz bar');
    });

    it('Can change class names using "target", "match" and "change" options (string)', function() {
        document.body.innerHTML = `
            <div>
                <p class="foo"></p>
                <button></button>
            </div>`;
        const clickElm = document.querySelector('button');
        const listener = classChange.listener({
            target: 'div',
            match : 'button',
            change: 'p',
            add   : 'bar'
        });
        clickElm.click();
        listener.remove();
        expect(document.querySelector('p').className).to.equal('foo bar');
    });

    it('Can change class names using "target", "match" and "change" options (element)', function() {
        document.body.innerHTML = `
            <div>
                <p class="foo"></p>
                <button></button>
            </div>`;
        const clickElm = document.querySelector('button');
        const listener = classChange.listener({
            target: document.querySelector('div'),
            match : document.querySelector('button'),
            change: document.querySelector('p'),
            add   : 'bar'
        });
        clickElm.click();
        listener.remove();
        expect(document.querySelector('p').className).to.equal('foo bar');
    });

    it('Can change class names using "target", "match" and "change" options (htmlcollection)', function() {
        document.body.innerHTML = `
            <div>
                <p class="foo"></p>
                <p class="baz"></p>
                <button></button>
            </div>`;
        const clickElm = document.querySelector('button');
        const listener = classChange.listener({
            target: document.getElementsByTagName('div'),
            match : document.getElementsByTagName('button'),
            change: document.getElementsByTagName('p'),
            add   : 'bar'
        });
        clickElm.click();
        listener.remove();
        expect(document.getElementsByTagName('p')[0].className).to.equal('foo bar');
        expect(document.getElementsByTagName('p')[1].className).to.equal('baz bar');
    });

    it('Can change class names using "target", "match" and "change" options (nodelist)', function() {
        document.body.innerHTML = `
            <div>
                <p class="foo"></p>
                <p class="baz"></p>
                <button></button>
            </div>`;
        const clickElm = document.querySelector('button');
        const listener = classChange.listener({
            target: document.querySelectorAll('div'),
            match : document.querySelectorAll('button'),
            change: document.querySelectorAll('p'),
            add   : 'bar'
        });
        clickElm.click();
        listener.remove();
        expect(document.querySelectorAll('p')[0].className).to.equal('foo bar');
        expect(document.querySelectorAll('p')[1].className).to.equal('baz bar');
    });

    it('Can change class names using emulated event bubbling', function() {
        document.body.innerHTML = `
            <p class="foo"></p>
            <button>
                <span>
                    <span>
                        <span></span>
                    </span>
                </span>
            </button>`;
        const clickElm = document.querySelector('button span span span');
        const listener = classChange.listener({
            match : 'button',
            change: 'p',
            add   : 'bar'
        });
        clickElm.click();
        listener.remove();
        expect(document.querySelector('p').className).to.equal('foo bar');
    });

    it('Can handle function return values', function() {
        document.body.innerHTML = '<p class="foo"></p><button></button>';
        const listener = classChange.listener({
            match : function() { return 'button'; },
            change: function() { return 'p'; },
            add   : function() { return 'bar'; },
            remove: function() { return 'foo'; },
            toggle: function() { return 'baz'; }
        });
        document.querySelector('button').click();
        listener.remove();
        expect(document.querySelector('p').className).to.equal('baz bar');
    });

    it('Can use function arguments to generate return values', function() {
        document.body.innerHTML = `
            <p class="foo"></p>
            <p class="bar"></p>
            <button class="baz"></button>
            <button class="buzz"></button>`;
        const listener = classChange.listener({
            match: function(evt) {
                return document.querySelectorAll('button');
            },
            change: function(evt, matchElm, matchElmIndex) {
                return document.querySelectorAll('p');
            },
            // This is a silly function, but the goal is to test each argument
            add: function(evt, matchElm, matchElmIndex, changeElm, changeElmIndex) {
                if (matchElmIndex === changeElmIndex) {
                    changeElm.className += ` ${matchElm.className} index-${matchElmIndex}`;
                }
            },
        });
        document.querySelectorAll('button')[0].click();
        document.querySelectorAll('button')[1].click();
        listener.remove();
        expect(document.querySelectorAll('p')[0].className).to.equal('foo baz index-0');
        expect(document.querySelectorAll('p')[1].className).to.equal('bar buzz index-1');
    });
});
