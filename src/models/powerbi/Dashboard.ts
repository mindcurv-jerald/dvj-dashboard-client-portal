/* [{   "id":"0584f29a-de80-4e41-8841-00f649ece819",
"displayName":"testdasb",
"isReadOnly":false,
"embedUrl":"https://app.powerbi.com/dashboardEmbed?dashboardId=0584f29a-de80-4e41-8841-00f649ece819&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlfX0%3d",
"tiles":null}]
*/ 
export interface Dashboard {
    id: String;
    displayName: String;
    isReadOnly: boolean;
    embedUrl: String;
    tiles: String;
}
