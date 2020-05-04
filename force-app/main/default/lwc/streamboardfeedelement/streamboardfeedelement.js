/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { LightningElement,api,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import likeStreamFeedElement from '@salesforce/apex/streamboardUtil.likeStreamFeedElement';

export default class Streamboardfeedelement extends LightningElement {
    @api element;
    @api feedElementHyperLink;
    @api isLikedByCurrentUser;
    @api feedElementActorHyperLink;
    @api feedElementParentHyperLink;
    @api feedElementHasComments;
    @api feedElementHasViews;
    
    postInitialized = false;

    renderedCallback() {
      if (this.postInitialized) {
        return;
      }
      this.postInitialized = true;
      this.initializePost();
    }

    initializePost() {
        let SFBaseURL = window.location.origin;
        this.feedElementHyperLink =  SFBaseURL + '/' + this.element.id;
        this.isLikedByCurrentUser = this.element.capabilities.chatterLikes.isLikedByCurrentUser;
        this.feedElementActorHyperLink = SFBaseURL + '/' + this.element.actor.id;
        this.feedElementParentHyperLink = SFBaseURL + '/' + this.element.parent.id;
        
        if( this.element.capabilities.comments.page.total > 0) {
            this.feedElementHasComments = true;    
        } else {
            this.feedElementHasComments = false;
        }
        
        if( this.element.capabilities.readBy.page.total > 0) {
            this.feedElementHasViews = true;    
        } else {
            this.feedElementHasViews = false;
        }
        
        let SFDcocumentURL = SFBaseURL.replace('.lightning.force.com','--c.documentforce.com');

        // pull in feed and convert to usable object 
        const feedElementObject = JSON.parse(JSON.stringify(this.element));

        let formattedHTMLMessage = '';

        let postContainsQuestionAnswer = false;
        //if post contains a question answer
        if(feedElementObject.type == 'QuestionPost') {
            if(feedElementObject.capabilities.questionAndAnswers) {
                postContainsQuestionAnswer = true;
                formattedHTMLMessage += '<b>'+feedElementObject.capabilities.questionAndAnswers.questionTitle+'</b>';
            }
        }

        //if post contains announcement
        if(feedElementObject.capabilities.banner) {
            if(feedElementObject.capabilities.banner.style == 'Announcement') {
                if(feedElementObject.capabilities.banner.motif.smallIconUrl) {
                    formattedHTMLMessage += '<img src="'+feedElementObject.capabilities.banner.motif.smallIconUrl+'"/> '; 
                }
            }
        }

        // iterate over message segments
        formattedHTMLMessage += parseJSONIntoHTML(formattedHTMLMessage,feedElementObject);
        
        // if post contains attachments
        if(feedElementObject.capabilities.files) {
            let itemArray = feedElementObject.capabilities.files.items;
            for(let i = 0; i < itemArray.length; i++) {
                formattedHTMLMessage += '<div class="attachment_container">'+
                                            '<a href="/lightning/r/ContentDocument/'+itemArray[i].id+'/view" title="View File">';
                                                if(itemArray[i].fileType === 'Zip'){
                                                    formattedHTMLMessage += '<div class="zip_container">'+
                                                                                '<lightning-icon class="slds-icon-doctype-zip slds-icon_container">'+
                                                                                    '<lightning-primitive-icon lightning-primitiveicon_primitiveicon-host="">'+
                                                                                        '<svg lightning-primitiveIcon_primitiveIcon="" focusable="false" data-key="zip" aria-hidden="true" class="slds-icon slds-icon_large">'+
                                                                                            '<use lightning-primitiveIcon_primitiveIcon="" xlink:href="/_slds/icons/doctype-sprite/svg/symbols.svg?cache=9.31.2-1#zip"></use>'+
                                                                                        '</svg>'+
                                                                                    '</lightning-primitive-icon>'+
                                                                                    '<span class="slds-assistive-text">Zip</span>'+
                                                                                '</lightning-icon>'+
                                                                            '</div>';
                                                } else {
                                                    formattedHTMLMessage += '<div>'+
                                                                                '<span>';
                                                                                    if(itemArray[i].renditionUrl){
                                                                                        formattedHTMLMessage += '<img src="'+SFDcocumentURL+'/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB120BY90&versionId='+itemArray[i].versionId+'" alt="'+itemArray[i].title+'">';
                                                                                    } else if(itemArray[i].renditionUrl240By180){
                                                                                        formattedHTMLMessage += '<img src="'+SFDcocumentURL+'/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB240BY180&versionId='+itemArray[i].versionId+'" alt="'+itemArray[i].title+'">';
                                                                                    } else if(itemArray[i].renditionUrl720By480){
                                                                                        formattedHTMLMessage += '<img src="'+SFDcocumentURL+'/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB720BY480&versionId='+itemArray[i].versionId+'" alt="'+itemArray[i].title+'">';
                                                                                    }
                                                                                formattedHTMLMessage += '</span>'+
                                                                            '</div>';
                                                }
                                            formattedHTMLMessage += '</a>'+
                                            '<div class="downlaod_subbar">'+
                                                
                                                // place holder for file type image and download icons
                                                /*'<lightning-icon class="slds-icon-doctype-pdf slds-icon_container">'+
                                                    '<lightning-primitive-icon lightning-primitiveicon_primitiveicon-host="">'+
                                                        '<svg lightning-primitiveIcon_primitiveIcon="" focusable="false" data-key="pdf" aria-hidden="true" class="slds-icon slds-icon_x-small">'+
                                                            '<use lightning-primitiveIcon_primitiveIcon="" xlink:href="/_slds/icons/doctype-sprite/svg/symbols.svg?cache=9.31.2-1#pdf"></use>'+
                                                        '</svg>'+
                                                    '</lightning-primitive-icon>'+
                                                    '<span class="slds-assistive-text">Adobe PDF</span>'+
                                                '</lightning-icon>'*/
                                                '<span data-aura-rendered-by="164:758;a" class="uiOutputText" data-aura-class="uiOutputText">'+itemArray[i].title+'</span>'+
                                            '</div>'+
                                        '</div>';
            }
        }

        // if post contains a poll
        if(feedElementObject.type == 'PollPost') {
            let segmentedRecordURL = feedElementObject.url.split("/");
            if(feedElementObject.capabilities.poll) {
                let myChoiceId = feedElementObject.capabilities.poll.myChoiceId;
                let totalVoteCount = feedElementObject.capabilities.poll.totalVoteCount;
                let buttonTitle = 'Vote';

                if(myChoiceId != null) {
                    buttonTitle = 'Change Vote';
                }

                formattedHTMLMessage += '<article class="poll_container">'
                                        '<fieldset class="slds-form-element">'+
                                        '<div class="slds-form-element__control">';

                for(let i = 0; i < feedElementObject.capabilities.poll.choices.length; i++) {
                    formattedHTMLMessage += '<span class="slds-radio">';

                    if(myChoiceId == feedElementObject.capabilities.poll.choices[i].id) {
                        formattedHTMLMessage += '<input type="radio" id="'+feedElementObject.capabilities.poll.choices[i].id+'" value="'+feedElementObject.capabilities.poll.choices[i].id+'" name="'+segmentedRecordURL[segmentedRecordURL.length-1]+'" checked />';
                    } else {
                        formattedHTMLMessage += '<input type="radio" id="'+feedElementObject.capabilities.poll.choices[i].id+'" value="'+feedElementObject.capabilities.poll.choices[i].id+'" name="'+segmentedRecordURL[segmentedRecordURL.length-1]+'"/>';
                    }
                    
                    formattedHTMLMessage += '<label class="slds-radio__label" for="'+feedElementObject.capabilities.poll.choices[i].id+'">'+
                                                 '<span class="slds-radio_faux"></span>'+
                                                 '<span class="slds-form-element__label">'+feedElementObject.capabilities.poll.choices[i].text+' ('+feedElementObject.capabilities.poll.choices[i].voteCount+')'+'</span>'+
                                            '</label>'+
                                            '</span>';
                }
                formattedHTMLMessage += '</div>'+
                                        '</fieldset>'+
                                        '<div class="vote_button_container"><a class="slds-button slds-button_brand" href="'+SFBaseURL+'/'+segmentedRecordURL[segmentedRecordURL.length-1]+'">'+buttonTitle+'</a></div>'+
                                        '</article>';
            }
        }

        // get div container
        const div = this.template.querySelector('div.message_segment');

        // update container html
        div.innerHTML = formattedHTMLMessage;

        // if post contains comments
        if(feedElementObject.capabilities.comments.page.total > 0) {
            // iterate over comments
            let commentArray = feedElementObject.capabilities.comments.page.items;
            for(let i = 0; i < commentArray.length; i++) {
                let comment = commentArray[i];
                
                let formattedHTMLComment = parseJSONIntoHTML('',comment);

                // test
                const commentDiv = this.template.querySelector('div[class="'+comment.id+'"]');

                if(commentDiv) {
                    commentDiv.innerHTML = formattedHTMLComment;
                }
            }
        }

        function parseJSONIntoHTML(html,JSON) {
            for(let i = 0; i < JSON.body.messageSegments.length; i++) {
                // define message segment
                let messageSegment = JSON.body.messageSegments[i];
                if(messageSegment.type == 'MarkupBegin'){
                    if(messageSegment.markupType == 'Hyperlink') {
                        html += '<'+messageSegment.htmlTag+' href="'+messageSegment.url+'">';
                    } else {
                        html += '<'+messageSegment.htmlTag+'>';
                    }
                } else if(messageSegment.type == 'MarkupEnd') {
                    html += '</'+messageSegment.htmlTag+'>';
                } else if(messageSegment.type == 'Text') {
                    if(postContainsQuestionAnswer){
                        html += '<p>'+messageSegment.text+'</p>';
                        postContainsQuestionAnswer = false;
                    } else {
                        html += messageSegment.text;
                    }
                } else if(messageSegment.type == 'InlineImage') {
                    if(messageSegment.thumbnails) {
                        html = '<img src="'+SFDcocumentURL+'/sfc/servlet.shepherd/document/download/'+messageSegment.thumbnails.fileId+'"/>';
                    } 
                } else if(messageSegment.type == 'Mention') {
                    let segmentedRecordURL = messageSegment.record.url.split("/");
                    html += '<a href="'+SFBaseURL+'/'+segmentedRecordURL[segmentedRecordURL.length-1]+'">'+messageSegment.text+'</a>';
                } else if(messageSegment.type == 'Hashtag') {
                    if(JSON.capabilities.topics){
                        for(let j = 0; j < JSON.capabilities.topics.items.length; j++) {
                            if(JSON.capabilities.topics.items[j].name == messageSegment.tag) {
                                html += '<a href="'+SFBaseURL+'/lightning/r/Topic/'+JSON.capabilities.topics.items[j].id+'/view">'+messageSegment.text+'</a>';
                            }
                        }
                    }
                }
            }

            return html;
        }
    }

    handleLikeFeedElememt(event) {
        const feedElementId = event.currentTarget.dataset.id;
        const isLiked = !this.isLikedByCurrentUser;

        likeStreamFeedElement({feedElementId: feedElementId ,isLiked: isLiked })
            .then(result => { 
                this.isLikedByCurrentUser = isLiked;
            })
            .catch(error => { 
                // need to add some code here for a toast message of some kind
                // console.log('Like Error: ' + error.message);}
            );
    }
}
