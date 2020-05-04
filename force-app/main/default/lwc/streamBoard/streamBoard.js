/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {
    LightningElement,
    wire,
    track
} from 'lwc';
import getStreamsWrapped from '@salesforce/apex/streamboardUtil.getStreamsWrapped';

export default class StreamBoard extends LightningElement {

    @track page = 1; // this is initialize for 1st page
    @track allStreams = []; // contains all streams
    @track data = []; // data to show
    @track startingStream = 1; // first stream position per page
    @track endingStream = 0; // end stream position per page
    @track pageSize = 3; // default page size
    @track totalStreamCount = 0; // total stream count received from all retrieved streams
    @track totalPage = 0; // total number of pages is needed to display all streams
    @track currentWidth = document.body.clientWidth;
    @track noData = null;

    connectedCallback() {
        window.addEventListener('resize', () => {
            this.checkCurrentWidth(document.body.clientWidth);
        })
    }

    @wire(getStreamsWrapped)
    streams({
        error,
        data
    }) {
        if (data) {
            this.allStreams = data;
            this.totalStreamCount = data.length;
            if (!this.totalStreamCount) {
                this.noData = true;
            }
            this.checkCurrentWidth(this.currentWidth);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    getUrl(id) {
        return `${this.orgUrlFormatted}${id}`;
    }

    checkCurrentWidth(width) {
        if (width <= 767) {
            this.pageSize = 1;
        } else if (width >= 768 && width <= 1023) {
            this.pageSize = 2;
        } else {
            this.pageSize = 3;
        }
        this.updateValues();
    }

    updateValues() {
        this.totalPage = Math.ceil(this.totalStreamCount / this.pageSize);
        this.data = this.allStreams.slice(0, this.pageSize);
        this.endingStream = this.pageSize;
    }

    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1;
            this.displayStreamPerPage(this.page);
        }
    }

    nextHandler() {
        if ((this.page < this.totalPage) && this.page !== this.totalPage) {
            this.page = this.page + 1;
            this.displayStreamPerPage(this.page);
        }
    }

    displayStreamPerPage(page) {
        this.startingStream = ((page - 1) * this.pageSize);
        this.endingStream = (this.pageSize * page);
        this.endingStream = (this.endingStream > this.totalStreamCount) ? this.totalStreamCount : this.endingStream;
        this.data = this.allStreams.slice(this.startingStream, this.endingStream);
        this.startingStream = this.startingStream + 1;
    }
}
