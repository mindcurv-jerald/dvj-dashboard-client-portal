/* [{   "id":"f8e0f746-546e-4d83-ae49-c333d036b364",
        "name":"testworkspace",
        "isReadOnly":false,
        "isOnDedicatedCapacity":false,
        "capacityId":null,
        "description":null,
        "type":null,
        "state":null,
        "users":null,
        "reports":null,
        "dashboards":null,
        "datasets":null,
        "dataflows":null,
        "dataflowStorageId":null,
        "workbooks":null}]
*/
export interface Workspace{
    id: String;
    name: String;
    isReadOnly: boolean;
    isOnDedicatedCapacity: boolean;   
}


