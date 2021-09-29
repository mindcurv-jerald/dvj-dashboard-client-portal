<template>
    <v-container fluid>
        <v-layout child-flex>

            <v-data-table
                    :headers="headers"
                    :items="$store.state.users"
                    item-key="item.userId"
                    class="elevation-1"
                    :search="search"
                    :custom-filter="filterOnlyCapsText"
                    :loading="!$store.state.usersLoaded"
                    loading-text="Gebruikers ophalen.."

            >
                <template v-slot:top>
                    <v-row class="d-flex justify-space-between mb-6 pl-6 pr-6 pt-2">
                        <v-card-title>Gebruikers</v-card-title>
                        <v-btn class="pa-2" color="primary">Gebruiker toevoegen</v-btn>
                    </v-row>
                </template>

                <template v-slot:[`item.lastLogin`]="{ item }">
                    <span>{{ new Date(item.lastLogin).toLocaleString() }}</span>
                </template>

                <template v-slot:[`item`]="{ item }">
                    <img :src="item.picture" style="width: 50px; height: 50px" />
                </template>

                <template v-slot:[`item.action`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                    <v-icon small @click="deleteItem(item)">delete</v-icon>
                </template>

            </v-data-table>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: "Users",
    data: () => ({
        headers: [
            {text: "Afbeelding", align: "center", sortable: false, value: "picture"},
            {text: 'Naam', align: 'center', value: 'nickName'},
            {text: 'Email', align: 'center', value: 'email'},
            {text: 'Geverifieerd', align: 'center', value: 'emailVerified'},
            {text: 'Aantal logins', align: 'center', value: 'loginsCount'},
            {text: 'Laatste login', align: 'center', value: 'lastLogin'},
        ],
        search: '',
        loading: false,
    }),
    async mounted() {
        if(!this.$store.state.usersLoaded){
            var token = await this.$auth.getTokenSilently();
            await this.$store.dispatch("getUsers", token);
        }
    },
    methods: {
        filterOnlyCapsText(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1
        },
    }
}

</script>
