/********
* READ ME

* Ensure your project-scratch-def.json has "hasSampleData": "true"

* Creates:

** 2 Groups, 9 Posts

** -Public Group
** -Private Group
** -Plain Text Post
** -Plain Text Post with @ mention
** Plain Text Post with inline Image (TBD)
** -Rich Text Post 
** -Rich Text Post with @mention
** -Post with Poll
** -Post with Link
** Post with File Attachment (TBD)

* TBD:

** 3 Streams, More Posts?

*/

//////////////////////////////////////
// GROUP 1 - Test Chatter Group Public

CollaborationGroup groupOne = new CollaborationGroup();
groupOne.Name='Test Chatter Group Public';
groupOne.isBroadcast=False;
groupOne.CollaborationType='Public'; //can be 'Public' or 'Private'                   
insert groupOne;

/// ADD POST TO G1

ConnectApi.FeedItemInput feedItemInput = new ConnectApi.FeedItemInput();
ConnectApi.MentionSegmentInput mentionSegmentInput = new ConnectApi.MentionSegmentInput();
ConnectApi.MessageBodyInput messageBodyInput = new ConnectApi.MessageBodyInput();
ConnectApi.TextSegmentInput textSegmentInput = new ConnectApi.TextSegmentInput();

messageBodyInput.messageSegments = new List<ConnectApi.MessageSegmentInput>();

textSegmentInput.text = 'Test Post #1 for Test Chatter Group Public';
messageBodyInput.messageSegments.add(textSegmentInput);

feedItemInput.body = messageBodyInput;
feedItemInput.feedElementType = ConnectApi.FeedElementType.FeedItem;
feedItemInput.subjectId = groupOne.id;

ConnectApi.FeedElement feedElement = ConnectApi.ChatterFeeds.postFeedElement(Network.getNetworkId(), feedItemInput);

// ADD POLL TO G1

ConnectApi.PollCapabilityInput myPoll = new ConnectApi.PollCapabilityInput();
myPoll.choices = new List<String>{'Breath of the Wild','BMXXX','Halo 420'};

ConnectApi.FeedElementCapabilitiesInput itemCapabilities = new ConnectApi.FeedElementCapabilitiesInput();
itemCapabilities.poll = myPoll;

ConnectApi.FeedItemInput feedItem = new ConnectApi.FeedItemInput();

feedItem.feedElementType = ConnectApi.FeedElementType.FeedItem;
feedItem.capabilities = itemCapabilities;
feedItem.subjectId = groupOne.id;
// feedItem.subjectId = '0F98A00000014i9SAA';

// ConnectApi.MessageBodyInput messageBodyInput = new ConnectApi.MessageBodyInput();

messageBodyInput.messageSegments.clear();

ConnectApi.TextSegmentInput textSegment = new ConnectApi.TextSegmentInput();
textSegment.text = 'What is the best Video Game?';
messageBodyInput.messageSegments.add(textSegment);

feedItem.body = messageBodyInput;

feedElement = ConnectApi.ChatterFeeds.postFeedElement(null,feedItem);

///////////////////////////////////////
// GROUP 2 - Test Chatter Group Private

CollaborationGroup groupTwo = new CollaborationGroup();
groupTwo.Name='Test Chatter Group Private';
groupTwo.isBroadcast=False;
groupTwo.CollaborationType='Private'; //can be 'Public' or 'Private'                   
insert groupTwo;

/// ADD POST TO G2 - 1 GIF

// ConnectApi.FeedItemInput feedItemInput = new ConnectApi.FeedItemInput();
// ConnectApi.MentionSegmentInput mentionSegmentInput = new ConnectApi.MentionSegmentInput();
// ConnectApi.MessageBodyInput messageBodyInput = new ConnectApi.MessageBodyInput();
// ConnectApi.TextSegmentInput textSegmentInput = new ConnectApi.TextSegmentInput();

MessageBodyInput.messageSegments.clear();

textSegmentInput.text = 'Test Post #1 for Test Chatter Group Private /n [INSERT GIF]';
messageBodyInput.messageSegments.add(textSegmentInput);

feedItemInput.body = messageBodyInput;
feedItemInput.feedElementType = ConnectApi.FeedElementType.FeedItem;
feedItemInput.subjectId = groupTwo.id;

feedElement = ConnectApi.ChatterFeeds.postFeedElement(Network.getNetworkId(), feedItemInput);

/// ADD POST TO G2 - 2 MENTION

// ConnectApi.FeedItemInput feedItemInput = new ConnectApi.FeedItemInput();
// ConnectApi.MentionSegmentInput mentionSegmentInput = new ConnectApi.MentionSegmentInput();
// ConnectApi.MessageBodyInput messageBodyInput = new ConnectApi.MessageBodyInput();
// ConnectApi.TextSegmentInput textSegmentInput = new ConnectApi.TextSegmentInput();

MessageBodyInput.messageSegments.clear();

textSegmentInput.text = 'Test Post #2 for Test Chatter Group Private ';
messageBodyInput.messageSegments.add(textSegmentInput);

mentionSegmentInput.id = UserInfo.getUserId();
messageBodyInput.messageSegments.add(mentionSegmentInput);

feedItemInput.body = messageBodyInput;
feedItemInput.feedElementType = ConnectApi.FeedElementType.FeedItem;

feedItemInput.subjectId = groupTwo.id;
// feedItemInput.subjectId = '0F98A00000014iJSAQ';

feedElement = ConnectApi.ChatterFeeds.postFeedElement(Network.getNetworkId(), feedItemInput);

//////////////////
// POST TO ACCOUNT

Account IdVar = [SELECT ID FROM ACCOUNT WHERE NAME = 'Burlington Textiles Corp of America' LIMIT 1];

/// POST TO A1 - RICH TEXT

String communityId = null;
String targetUserOrGroupOrRecordId  = IdVar.id;
String codeSnippet = '<html>\n\t<body>\n\t\tHello, world!\n\t</body>\n</html>';

ConnectApi.FeedItemInput input = new ConnectApi.FeedItemInput();
input.subjectId = targetUserOrGroupOrRecordId;
input.feedElementType = ConnectApi.FeedElementType.FeedItem;

ConnectApi.MessageBodyInput messageInput = new ConnectApi.MessageBodyInput();
// ConnectApi.TextSegmentInput textSegment;
ConnectApi.MarkupBeginSegmentInput markupBeginSegment;
ConnectApi.MarkupEndSegmentInput markupEndSegment;

messageInput.messageSegments = new List<ConnectApi.MessageSegmentInput>();

markupBeginSegment = new ConnectApi.MarkupBeginSegmentInput();
markupBeginSegment.markupType = ConnectApi.MarkupType.Code;
messageInput.messageSegments.add(markupBeginSegment);

// textSegment = new ConnectApi.TextSegmentInput();
textSegment.text = codeSnippet;
messageInput.messageSegments.add(textSegment);

markupEndSegment = new ConnectApi.MarkupEndSegmentInput();
markupEndSegment.markupType = ConnectApi.MarkupType.Code;
messageInput.messageSegments.add(markupEndSegment);

input.body = messageInput;

ConnectApi.ChatterFeeds.postFeedElement(communityId, input);

/// POST TO A1 - RICH TEXT WITH MENTION

String boldSnippet = 'This text is RICH. I can hardly have another bite ';
input.subjectId = targetUserOrGroupOrRecordId;
input.feedElementType = ConnectApi.FeedElementType.FeedItem;

// ConnectApi.MessageBodyInput messageInput = new ConnectApi.MessageBodyInput();
// ConnectApi.TextSegmentInput textSegment;
// ConnectApi.MarkupBeginSegmentInput markupBeginSegment;
// ConnectApi.MarkupEndSegmentInput markupEndSegment;
// ConnectApi.MentionSegmentInput mentionSegmentInput = new ConnectApi.MentionSegmentInput();

// messageInput.messageSegments = new List<ConnectApi.MessageSegmentInput>();

messageInput.messageSegments.clear();

// markupBeginSegment = new ConnectApi.MarkupBeginSegmentInput();
markupBeginSegment.markupType = ConnectApi.MarkupType.Bold;
messageInput.messageSegments.add(markupBeginSegment);

// textSegment = new ConnectApi.TextSegmentInput();
textSegment.text = boldSnippet;
messageInput.messageSegments.add(textSegment);

// markupEndSegment = new ConnectApi.MarkupEndSegmentInput();
markupEndSegment.markupType = ConnectApi.MarkupType.Bold;
messageInput.messageSegments.add(markupEndSegment);

mentionSegmentInput.id = UserInfo.getUserId();
messageInput.messageSegments.add(mentionSegmentInput);

input.body = messageInput;

ConnectApi.ChatterFeeds.postFeedElement(communityId, input);

///////////////
// POST TO USER

// POST TO U1 - RICH TEXT

// ConnectApi.FeedItemInput input = new ConnectApi.FeedItemInput();
// String communityId = null;

String strikeSnippet = 'You are cool';
input.subjectId = UserInfo.getUserId();
input.feedElementType = ConnectApi.FeedElementType.FeedItem;

// ConnectApi.MessageBodyInput messageInput = new ConnectApi.MessageBodyInput();
// ConnectApi.TextSegmentInput textSegment;
// ConnectApi.MarkupBeginSegmentInput markupBeginSegment;
// ConnectApi.MarkupEndSegmentInput markupEndSegment;
// ConnectApi.MentionSegmentInput mentionSegmentInput = new ConnectApi.MentionSegmentInput();

// messageInput.messageSegments = new List<ConnectApi.MessageSegmentInput>();

messageInput.messageSegments.clear();

// markupBeginSegment = new ConnectApi.MarkupBeginSegmentInput();
markupBeginSegment.markupType = ConnectApi.MarkupType.Strikethrough;
messageInput.messageSegments.add(markupBeginSegment);

// textSegment = new ConnectApi.TextSegmentInput();
textSegment.text = strikeSnippet;
messageInput.messageSegments.add(textSegment);

// markupEndSegment = new ConnectApi.MarkupEndSegmentInput();
markupEndSegment.markupType = ConnectApi.MarkupType.Strikethrough;
messageInput.messageSegments.add(markupEndSegment);

input.body = messageInput;

ConnectApi.ChatterFeeds.postFeedElement(communityId, input);


/////////////////////////
// POST TO U1 - HYPERLINK

messageInput.messageSegments.clear();

String linkSnippet = 'https://www.google.com';
input.subjectId = UserInfo.getUserId();
input.feedElementType = ConnectApi.FeedElementType.FeedItem;

// textSegment = new ConnectApi.TextSegmentInput();
textSegment.text = linkSnippet;
messageInput.messageSegments.add(textSegment);

input.body = messageInput;

ConnectApi.ChatterFeeds.postFeedElement(communityId, input);
