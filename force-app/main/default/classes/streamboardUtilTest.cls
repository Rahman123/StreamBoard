/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@IsTest
private class streamboardUtilTest
{
    @IsTest(SeeAllData=true)
    static void getStreamsWrappedTest()
    {
        String communityId = Network.getNetworkId();
        
        // Create list of StreamsWrappers
        List<streamboardUtil.StreamsWrapper> testWrapperList = new List<streamboardUtil.StreamsWrapper>();
        
        // Get list of streams
        ConnectApi.ChatterStreamPage csp = ConnectApi.ChatterFeeds.getStreams(communityId);
        List<ConnectApi.ChatterStream> streamsList = new List<ConnectApi.ChatterStream>();
        streamsList = csp.items;
        
        // Store number of streams returned in integer variable
        Integer streamCount = csp.items.size();
        
        // Build test feed element page
        ConnectApi.FeedElementPage testPage = new ConnectApi.FeedElementPage();
        List<ConnectApi.FeedItem> testItemList = new List<ConnectApi.FeedItem>();
        testItemList.add(new ConnectApi.FeedItem());
        testItemList.add(new ConnectApi.FeedItem());
        testPage.elements = testItemList;
        
        for( ConnectApi.ChatterStream cs : streamsList )
        {
            // Store returned stream id in string variable
            String subjectId = cs.id;
            
            // Build test streams wrapper
            streamboardUtil.StreamsWrapper testWrapper = new streamboardUtil.StreamsWrapper();
            testWrapper.id = cs.id;
            testWrapper.name = cs.name;
            testWrapper.description = cs.description;
            
            
            // Set the test data
            //ConnectApi.ChatterFeeds.setTestGetFeedElementsFromFeed(communityId, ConnectApi.FeedType.Streams, subjectId, testpage);
            ConnectApi.ChatterFeeds.setTestGetFeedElementsFromFeed(communityId, ConnectApi.FeedType.Streams, subjectId, 3, ConnectApi.FeedDensity.ALLUPDATES, null, 25, ConnectApi.FeedSortOrder.CreatedDateDesc, testpage);
            
            // Add test page to streams wrapper
            testWrapper.feedelementslist = testpage.elements;
            testwrapper.message = 'Stream Feed Elements are loaded';
            testWrapper.success = true;
          
            // Add test wrapper to list of StreamsWrappers
            testWrapperList.add(testWrapper);
        }
        
        // Run tests
        Test.startTest();
        System.assert(testWrapperList[0].success);
        System.assertEquals(testWrapperList.size(), streamboardUtil.getStreamsWrapped(communityId).size());
        Test.stopTest();
    }
    

    @IsTest(SeeAllData=true)
    static void likeStreamFeedElementTest()
    {
        String communityId = Network.getNetworkId();
        
        // build test group - Test Group X
        CollaborationGroup groupOne = new CollaborationGroup();
        groupOne.Name='Test Group X';
        groupOne.isBroadcast=False;
        groupOne.CollaborationType='Public'; //can be 'Public' or 'Private'                   
        insert groupOne;
        
        // build test post input   
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
        
        // add test post to group
        ConnectApi.FeedElement feedElement = ConnectApi.ChatterFeeds.postFeedElement(communityId, feedItemInput);
        
        // store id of feed element as string variable
        String elementId = feedElement.id;
        
        // call likeStreamFeedElement class
        streamBoardUtil.likeStreamFeedElement(elementId, true);
        
        // get likes for feed element
        ConnectApi.ChatterLikePage clp = ConnectApi.ChatterFeeds.getLikesForFeedElement(communityId, elementId);
        
        // run test to ensure feed element has at least one like
        Test.startTest();
        System.assert(clp.items.size() > 0);
        Test.stopTest();
    }
}
