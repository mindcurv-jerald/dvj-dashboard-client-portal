import axios from 'axios'

import { getInstance } from '../auth';

// ...

const instance = getInstance();

/* Maybe use this, maybe not
instance.$watch("loading", async loading => {
    if (!loading && instance.isAuthenticated) {
        const token = await instance.getTokenSilently();
        console.log(token);
    }
});
*/
const apiClient = async () => {
    var token = await instance.getTokenSilently();
    console.log(token);
     axios.create({
        baseURL: process.env.VUE_APP_ROOT_API + '/api/v1',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}
const workspacesForAdmin = async () => await apiClient().get('/powerbi/all');

export {
    workspacesForAdmin
}
