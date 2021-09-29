import axios from "axios";
import Vue from 'vue';
import Vuex from 'vuex'


Vue.use(Vuex);

const state = {
    workspaces: [],
    workspacesLoaded: false,
    users: [],
    usersLoaded: false,
}

const mutations = {
    SET_LOADING_WORKSPACE(state, status){
        state.workspacesLoaded = status;
    },
    SET_WORKSPACES(state, workspaces){
        state.workspaces = workspaces
    },
    SET_LOADING_USERS(state, status){
        state.usersLoaded = status;
    },
    SET_USERS(state, users){
        state.users = state.users.concat(users);
    },
    SORT_USERS(state){
        state.users = state.users.sort(function(a, b){
            const aFullname = a.fullName.trim().toLowerCase();
            const bFullname = b.fullName.trim().toLowerCase();
            if(aFullname < bFullname) { return -1; }
            if(aFullname > bFullname) { return 1; }
            return 0;
        })

    }
}

const actions = {
    async getWorkspaces({ commit }, token) {
        await axios
            .get(process.env.VUE_APP_ROOT_API + '/api/v1/powerbi/get', {headers: {Authorization: `Bearer ${token}`}})
            .then(result => {
                commit("SET_WORKSPACES", result.data)
                commit('SET_LOADING_WORKSPACE', true)
            });
    },
    async getUsers({commit}, token) {
        var amount = 100;
        var amountRetrieved = 100;
        var page = 0;
        while(amount == amountRetrieved){
            await axios
                .get(process.env.VUE_APP_ROOT_API + '/api/v1/auth/users',
                    {
                        headers: {Authorization: `Bearer ${token}`},
                        params: {
                            page: page,
                            amount: amount
                        }
                    })
                .then(result => {
                    commit("SET_USERS", result.data);
                    amountRetrieved = result.data.length;
                    page++;
                })
                .catch(this.result = 0);
        }
        commit('SORT_USERS');
        commit('SET_LOADING_USERS', true);
    }
}

const getters = {
    workspaces: (state) => state.workspaces,
    users: (state) => state.users,
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
