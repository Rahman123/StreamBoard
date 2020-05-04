public class streamboardUtil
{
     // getStreamsWrapped method 
     // creates a list of streamwrappers to join 
     // stream data and feedElement Data in one JSON object
    @AuraEnabled(cacheable=true)
    public static List<StreamsWrapper> getStreamsWrapped(String communityId)
    {
        communityId=Network.getNetworkId();
        String orgUrl = URL.getOrgDomainUrl().toExternalForm() + '/lightning/page/chatter/streams/';
        List<StreamsWrapper> streamWrapperList = new List<StreamsWrapper>();
        
        // pull all streams
        ConnectApi.ChatterStreamPage streams = ConnectApi.ChatterFeeds.getStreams(communityId);

        // pull a certain number of streams
        //ConnectApi.ChatterStreamPage streams = ConnectApi.ChatterFeeds.getStreams(communityId, pageParam, pageSize)

        // pull a certain number of streams with a set sort order
        //ConnectApi.ChatterStreamPage streams = ConnectApi.ChatterFeeds.getStreams(communityId, pageParam, pageSize, sortParam)

        List<ConnectApi.ChatterStream> streamsList = new List<ConnectApi.ChatterStream>();
        streamsList = streams.items;

        for( ConnectApi.ChatterStream cs : streamsList )
        {
            String subjectId = cs.id;
            communityId = null;

            StreamsWrapper streamWrapper = new StreamsWrapper();
            streamWrapper.name = cs.name;
            streamWrapper.id = cs.id;
            streamWrapper.description = cs.description;
            streamWrapper.orgUrl = orgUrl + cs.id;
            
            ConnectApi.FeedElementPage page = ConnectApi.ChatterFeeds.getFeedElementsFromFeed(communityId, ConnectApi.FeedType.Streams, subjectId, 3, ConnectApi.FeedDensity.ALLUPDATES, null, 25, ConnectApi.FeedSortOrder.CreatedDateDesc );
            //ConnectApi.FeedElementPage page = ConnectApi.ChatterFeeds.getFeedElementsFromFeed(communityId, ConnectApi.FeedType.Streams, subjectId);
            streamWrapper.feedElementsList  = page.elements;
            
            //streamsWrapper.totalRecords = feedElementsList.size();
            streamWrapper.message = 'Stream Feed Elements are loaded';
            streamWrapper.success = true;
                        
            streamWrapperList.add(streamWrapper);
        }
        return streamWrapperList;
    }
    
    public class StreamsWrapper
    {
        @AuraEnabled
        public Integer totalRecords = 0;
        @AuraEnabled
        public String name;
        @AuraEnabled
        public String id;
        @AuraEnabled
        public String description;
        @AuraEnabled
        public String orgUrl;
        @AuraEnabled
        public List<ConnectApi.FeedElement> feedElementsList = new List<ConnectApi.FeedElement>();
        @AuraEnabled
        public String message;
        @AuraEnabled
        public Boolean success;
	}

    // call the connect api for updateLikeForFeedElement(communityId, feedElementId, isLikedByCurrentUser)
    @AuraEnabled
    public static void likeStreamFeedElement(String feedElementId, Boolean isLiked)
    {
        String communityId = Network.getNetworkId();
        ConnectApi.ChatterLikePage clp = ConnectApi.ChatterFeeds.updateLikeForFeedElement(communityId, feedElementId, isLiked);
    }
}
