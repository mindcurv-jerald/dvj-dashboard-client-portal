<template>
    <v-container name="toolbar" >
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="white" hide-on-scroll>
            <v-app-bar-nav-icon @click="drawer = true" v-if="isAdmin"></v-app-bar-nav-icon>
            <v-img
                    src="../../assets/logo.png"
                    max-height="44px"
                    max-width="140px"
                    contain
            />
            <v-spacer/>
            <v-toolbar-title class="ml-0 pl-4 pa-6">
                <!-- span class="font-weight-bold">{{ name }}</span -->
            </v-toolbar-title>
            <v-spacer/>
            <div v-if="!$auth.loading">
                <!-- show login when not authenticated -->
                <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
                <!-- show login when not authenticated -->
                <button v-if="!$auth.isAuthenticated" @click="signup">Sign up</button>
                <!-- show logout when authenticated -->
                <button v-if="$auth.isAuthenticated" @click="logout">Log out ({{ $auth.user.email }})</button>
            </div>
        </v-app-bar>
        <v-navigation-drawer  v-model="drawer" v-if="isAdmin" absolute temporary >
            <v-list nav dense>
                <template v-for="item in items">
                    <v-list-item :key="item.text" link :to="item.url">
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>
    </v-container>
</template>


<script>
export default {
    name: 'ToolBar',
    props: {
        name: String,
    },
    data: () => ({
        isAdmin: null,
        dialog: false,
        drawer: false,
        items: [
            {icon: 'mdi-chart-bar', text: 'Dashboards', url: '/'},
            // {icon: 'mdi-account', text: 'Users', url: '/gebruikers'},
            {icon: 'mdi-account-key', text: 'Access', url: '/access'},
            // {icon: 'mdi-cog', text: 'Settings', url: '/instellingen'},
        ],
    }),
    created: function () {
        this.$auth
            .isAdmin()
            .then(x => this.isAdmin = x);
    },
    methods: {
        // Log the user in
        login() {
            this.$auth.loginWithRedirect();
        },
        // Log the user out
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin
            });
        },
        signup() {
            this.$auth.signup();
        },
        isAdminPath() {
            return this.$route.path.includes('admin');
        },
        toggleAdmin() {
            if (this.isAdminPath()) {
                this.$router.push({path: '/'})
            } else {
                this.$router.push({path: '/admin'});
            }
        }
    },


}
</script>
