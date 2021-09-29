/* [{   "id":"2a184050-9054-459c-8c02-2ce2a2a9950b",
"name":"US Sales Analysis",
"webUrl":"https://app.powerbi.com/groups/f8e0f746-546e-4d83-ae49-c333d036b364/reports/2a184050-9054-459c-8c02-2ce2a2a9950b",
"embedUrl":"https://app.powerbi.com/reportEmbed?reportId=2a184050-9054-459c-8c02-2ce2a2a9950b&groupId=f8e0f746-546e-4d83-ae49-c333d036b364&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlfX0%3d",
"datasetId":"28b5c70b-86e2-4b32-ad03-f784d3a617a1"}]
*/
export interface Report {
    id: String;
    name: String;
    webUrl: String;
    embedUrl: String;
    datasetId: String;
}
