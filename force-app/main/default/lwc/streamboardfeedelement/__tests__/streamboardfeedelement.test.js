/* eslint-disable no-console */
import {
    createElement
} from 'lwc';
import Streamboardfeedelement from 'c/streamboardfeedelement';

let FEEDELEMENTS = {
    "actor": {
        "additionalLabel": null,
        "communityNickname": "test-yuyowjqb6ypa",
        "companyName": "JA Streamboard Scratch Org",
        "displayName": "User User",
        "firstName": "User",
        "id": "0058A000004265DQAQ",
        "isActive": true,
        "isInThisCommunity": true,
        "lastName": "User",
        "motif": {
            "color": "65CAE4",
            "largeIconUrl": "/img/icon/profile64.png",
            "mediumIconUrl": "/img/icon/profile32.png",
            "smallIconUrl": "/img/icon/profile16.png",
            "svgIconUrl": null
        },
        "mySubscription": null,
        "name": "User User",
        "outOfOffice": {
            "message": ""
        },
        "photo": {
            "fullEmailPhotoUrl": "https://ability-energy-8996-dev-ed.cs45.my.salesforce.com/img/userprofile/default_profile_200_v2.png?fromEmail=1",
            "largePhotoUrl": "https://ability-energy-8996-dev-ed--c.documentforce.com/profilephoto/005/F",
            "mediumPhotoUrl": "https://ability-energy-8996-dev-ed--c.documentforce.com/profilephoto/005/M",
            "photoVersionId": null,
            "smallPhotoUrl": "https://ability-energy-8996-dev-ed--c.documentforce.com/profilephoto/005/T",
            "standardEmailPhotoUrl": "https://ability-energy-8996-dev-ed.cs45.my.salesforce.com/img/userprofile/default_profile_45_v2.png?fromEmail=1",
            "url": "/services/data/v48.0/connect/user-profiles/0058A000004265DQAQ/photo"
        },
        "reputation": null,
        "title": null,
        "type": "User",
        "url": "/services/data/v48.0/chatter/users/0058A000004265DQAQ",
        "userType": "Internal"
    },
    "body": {
        "isRichText": true,
        "messageSegments": [{
                "altText": null,
                "htmlTag": "b",
                "markupType": "Bold",
                "text": "",
                "type": "MarkupBegin",
                "url": null
            },
            {
                "text": "This text is RICH. I can hardly have another bite ",
                "type": "Text"
            },
            {
                "htmlTag": "b",
                "markupType": "Bold",
                "text": "",
                "type": "MarkupEnd"
            },
            {
                "accessible": true,
                "name": "User User",
                "record": {
                    "additionalLabel": null,
                    "communityNickname": "test-yuyowjqb6ypa",
                    "companyName": "JA Streamboard Scratch Org",
                    "displayName": "User User",
                    "firstName": "User",
                    "id": "0058A000004265DQAQ",
                    "isActive": true,
                    "isInThisCommunity": true,
                    "lastName": "User",
                    "motif": {
                        "color": "65CAE4",
                        "largeIconUrl": "/img/icon/profile64.png",
                        "mediumIconUrl": "/img/icon/profile32.png",
                        "smallIconUrl": "/img/icon/profile16.png",
                        "svgIconUrl": null
                    },
                    "mySubscription": null,
                    "name": "User User",
                    "outOfOffice": {
                        "message": ""
                    },
                    "photo": {
                        "fullEmailPhotoUrl": "https://ability-energy-8996-dev-ed.cs45.my.salesforce.com/img/userprofile/default_profile_200_v2.png?fromEmail=1",
                        "largePhotoUrl": "https://ability-energy-8996-dev-ed--c.documentforce.com/profilephoto/005/F",
                        "mediumPhotoUrl": "https://ability-energy-8996-dev-ed--c.documentforce.com/profilephoto/005/M",
                        "photoVersionId": null,
                        "smallPhotoUrl": "https://ability-energy-8996-dev-ed--c.documentforce.com/profilephoto/005/T",
                        "standardEmailPhotoUrl": "https://ability-energy-8996-dev-ed.cs45.my.salesforce.com/img/userprofile/default_profile_45_v2.png?fromEmail=1",
                        "url": "/services/data/v48.0/connect/user-profiles/0058A000004265DQAQ/photo"
                    },
                    "reputation": null,
                    "title": null,
                    "type": "User",
                    "url": "/services/data/v48.0/chatter/users/0058A000004265DQAQ",
                    "userType": "Internal"
                },
                "text": "@User User",
                "type": "Mention"
            }
        ],
        "text": "This text is RICH. I can hardly have another bite @User User"
    },
    "capabilities": {
        "associatedActions": {
            "platformActionGroups": []
        },
        "bookmarks": {
            "isBookmarkedByCurrentUser": false
        },
        "chatterLikes": {
            "isLikedByCurrentUser": false,
            "likesMessage": null,
            "myLike": null,
            "page": {
                "currentPageToken": 0,
                "currentPageUrl": "/services/data/v48.0/chatter/feed-elements/0D58A00000NyM4wSAF/capabilities/chatter-likes/items",
                "items": [],
                "nextPageToken": null,
                "nextPageUrl": null,
                "previousPageToken": null,
                "previousPageUrl": null,
                "total": 0
            }
        },
        "close": {
            "canContextUserUpdateIsClosed": true,
            "isClosed": false
        },
        "comments": {
            "page": {
                "currentPageToken": null,
                "currentPageUrl": "/services/data/v48.0/chatter/feed-elements/0D58A00000NyM4wSAF/capabilities/comments/items",
                "items": [],
                "nextPageToken": null,
                "nextPageUrl": null,
                "previousPageToken": null,
                "previousPageUrl": null,
                "total": 0
            }
        },
        "edit": {
            "isEditRestricted": false,
            "isEditableByMeUrl": "/services/data/v48.0/chatter/feed-elements/0D58A00000NyM4wSAF/capabilities/edit/is-editable-by-me",
            "lastEditedBy": null,
            "lastEditedDate": null,
            "latestRevision": 1,
            "relativeLastEditedDate": null
        },
        "interactions": {
            "count": 0
        },
        "mute": {
            "isMutedByMe": null
        },
        "readBy": {
            "isReadByMe": true,
            "lastReadDateByMe": "2020-04-24T01:38:38.000Z",
            "page": {
                "currentPageToken": null,
                "currentPageUrl": "/services/data/v48.0/chatter/feed-elements/0D58A00000NyM4wSAF/capabilities/read-by/items?pageSize=3",
                "items": [],
                "nextPageToken": null,
                "nextPageUrl": null,
                "previousPageToken": null,
                "previousPageUrl": null,
                "total": 0
            }
        },
        "status": {
            "feedEntityStatus": "Published",
            "isApprovableByMe": true
        },
        "topics": {
            "canAssignTopics": true,
            "items": []
        },
        "upDownVote": {
            "downVoteCount": 0,
            "myVote": "None",
            "upVoteCount": 0
        }
    },
    "clientInfo": {
        "applicationName": "Salesforce CLI",
        "applicationUrl": "https://developer.salesforce.com/tools/sfdxcli"
    },
    "createdDate": "2020-04-24T01:38:38.000Z",
    "event": false,
    "feedElementType": "FeedItem",
    "hasVerifiedComment": false,
    "header": {
        "isRichText": null,
        "messageSegments": [{
                "motif": {
                    "color": "7F8DE1",
                    "largeIconUrl": "/img/icon/accounts64.png",
                    "mediumIconUrl": "/img/icon/accounts32.png",
                    "smallIconUrl": "/img/icon/accounts16.png",
                    "svgIconUrl": null
                },
                "reference": {
                    "id": "0018A00000SW5JnQAL",
                    "url": "/services/data/v48.0/chatter/records/0018A00000SW5JnQAL"
                },
                "text": "Burlington Textiles Corp of America",
                "type": "EntityLink"
            },
            {
                "text": " — ",
                "type": "Text"
            },
            {
                "motif": {
                    "color": "65CAE4",
                    "largeIconUrl": "/img/icon/profile64.png",
                    "mediumIconUrl": "/img/icon/profile32.png",
                    "smallIconUrl": "/img/icon/profile16.png",
                    "svgIconUrl": null
                },
                "reference": {
                    "id": "0058A000004265DQAQ",
                    "url": "/services/data/v48.0/chatter/users/0058A000004265DQAQ"
                },
                "text": "User User",
                "type": "EntityLink"
            }
        ],
        "text": "Burlington Textiles Corp of America — User User"
    },
    "id": "0D58A00000NyM4wSAF",
    "isDeleteRestricted": false,
    "isSharable": false,
    "modifiedDate": "2020-04-24T01:38:38.000Z",
    "originalFeedItem": null,
    "originalFeedItemActor": null,
    "parent": {
        "entityLabel": {
            "label": "Account",
            "labelPlural": "Accounts"
        },
        "id": "0018A00000SW5JnQAL",
        "motif": {
            "color": "7F8DE1",
            "largeIconUrl": "/img/icon/accounts64.png",
            "mediumIconUrl": "/img/icon/accounts32.png",
            "smallIconUrl": "/img/icon/accounts16.png",
            "svgIconUrl": null
        },
        "mySubscription": null,
        "name": "Burlington Textiles Corp of America",
        "type": "Account",
        "url": "/services/data/v48.0/chatter/records/0018A00000SW5JnQAL"
    },
    "photoUrl": "https://ability-energy-8996-dev-ed--c.documentforce.com/profilephoto/005/T",
    "relativeCreatedDate": "3h ago",
    "type": "TextPost",
    "url": "/services/data/v48.0/chatter/feed-elements/0D58A00000NyM4wSAF",
    "visibility": "InternalUsers"
}

describe('c-streamboardfeedelement', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Check Render Logic', () => {
        const element = createElement('c-streamboardfeedelement', {
            is: Streamboardfeedelement
        });
        element.element = FEEDELEMENTS;
        document.body.appendChild(element);
        const content = element.shadowRoot.querySelectorAll('.slds-avatar');
        expect(content.length).toBe(1);
    });
});