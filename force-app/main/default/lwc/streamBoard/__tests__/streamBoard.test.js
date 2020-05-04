import { createElement } from 'lwc';
import StreamBoard from 'c/streamBoard';
import getStreamsWrapped from '@salesforce/apex/streamboardUtil.getStreamsWrapped';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

const streamsData = require('./data/getStreams.json');

const getStreamData = registerLdsTestWireAdapter(getStreamsWrapped);

describe('c-stream-board', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    describe('getStreams data', () => {
        it('renders 1 title', () => {
            const element = createElement('c-stream-board', {
                is: StreamBoard
            });

            document.body.appendChild(element);
            getStreamData.emit(streamsData);

            return Promise.resolve().then(() => {
                // always going to render as 1 because data is an array
                // and currentWidth is always going to result in 0 width
                // because it is not running in the browser.
                const content = element.shadowRoot.querySelectorAll('.header-sitcky');
                expect(content.length).toBe(1);
            });
        });
    });
});