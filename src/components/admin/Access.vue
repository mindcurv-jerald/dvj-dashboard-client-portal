<template>
    <v-card class="ma-6 pa-6">
        <v-progress-circular v-if="loading"
                             style="position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"
                             indeterminate
                             color="#FC0D1C"
                             />
        <v-row v-if="!loading">
            <v-col cols="4">
                <v-card-title>Workspaces</v-card-title>
                <v-list dense>
                    <v-list-group
                            v-for="workspace in workspaces"
                            :key="workspace.id"
                            v-model="workspace.active"
                            prepend-icon="mdi-folder-open"
                            no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title v-text="workspace.name" />
                            </v-list-item-content>
                        </template>

                        <v-list-item
                                v-for="dashboard in workspace.dashboards" :key="dashboard.id"
                                link
                                @click="select(workspace.id, dashboard.id, 1)"
                        >
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title v-text="workspace.name" />
                                </v-list-item-content>
                            </template>
                            <v-list-item-icon>
                                <v-icon>mdi-poll-box</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title v-text="dashboard.displayName + ' (Dashboard)'"></v-list-item-title>
                            <v-list-item-icon v-if="dashboard.id === activeObjectId">
                                <v-icon small>mdi-arrow-left-drop-circle-outline</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item
                                v-for="report in workspace.reports" :key="report.id"
                                link
                                @click="select(workspace.id, report.id, 2)"
                        >
                            <v-list-item-icon>
                                <v-icon>mdi-poll-box</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title v-text="report.name  + ' (Report)'"></v-list-item-title>
                            <v-list-item-icon v-if="report.id === activeObjectId">
                                <v-icon small>mdi-arrow-left-drop-circle-outline</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </v-col>
            <v-progress-circular v-if="accessLoading"
                                 style="position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"
                                 indeterminate
                                 color="#FC0D1C"
            />
            <v-col cols="4" v-if="!accessLoading">
                <v-card-title>Users without access
                    <v-progress-circular
                            v-if="addLoading"
                            indeterminate
                            color="#FC0D1C"
                    ></v-progress-circular>
                </v-card-title>

                <v-card
                        v-if="this.activeWorkspaceId"
                        elevation="4"
                        class="mx-auto"
                >

                    <v-data-table
                            :headers="headers"
                            :items="users"
                            :search="search"
                            hide-default-header
                    >
                        <template v-slot:top>
                            <v-text-field
                                    v-model="search"
                                    label="Search"
                                    class="mx-4"
                            ></v-text-field>
                        </template>

                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="add(item.userId)"
                            >
                                mdi-arrow-right-drop-circle-outline
                            </v-icon>
                        </template>

                    </v-data-table>
                </v-card>
            </v-col>
            <v-col cols="4"  v-if="!accessLoading">
                        <v-card-title>Users with access
                            <v-progress-circular
                                    v-if="removeLoading"
                                    indeterminate
                                    color="#FC0D1C"
                            ></v-progress-circular>
                        </v-card-title>

                        <v-card
                                v-if="this.activeWorkspaceId"
                                elevation="4"
                                class="mx-auto"
                        >
                            <v-data-table
                                    :headers="headers"
                                    :items="assignedUsers"
                                    :search="search"
                                    hide-default-header
                            >
                                <template v-slot:top>
                                    <v-text-field
                                            v-model="search"
                                            label="Search"
                                            class="mx-4"
                                    ></v-text-field>
                                </template>

                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-icon
                                            small
                                            class="mr-2"
                                            @click="remove(item.userId)"
                                    >
                                        mdi-arrow-left-drop-circle-outline
                                    </v-icon>
                                </template>

                            </v-data-table>
                        </v-card>
                </v-col>
        </v-row>
    </v-card>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Access",
    data: () => ({
      loading: false,
      accessLoading: false,
      workspaces: [],
      users: [],
      assignedUsers: [],
      addLoading: false,
      removeLoading: false,
      activeWorkspaceId: null,
      activeObjectId: null,
      headers: [
          { text: 'Name', align: 'start', value: 'fullName'},
          { text: 'Email', value: 'email' },
          { text: 'Actions', value: 'actions', sortable: false },
      ],
      search: '',

    }),

    async mounted() {
      this.loading = true;
      if(!this.$store.state.usersLoaded) {
          var token = await this.$auth.getTokenSilently();
          await this.$store.dispatch("getUsers", token);
          this.users = this.$store.state.users;
      }
      await this.getAllWorkspaces();
      this.loading = false;
    },
    methods: {
        async getAllWorkspaces() {
            var token = await this.$auth.getTokenSilently();
            await axios.get(process.env.VUE_APP_ROOT_API + '/api/v1/powerbi/all', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }})
            .then(result => this.workspaces = this.workspacesAsTree(result.data));
        },
        workspacesAsTree(data){
        var workspaces = [];
          data.forEach(w => {
              w.active = false;
              var workspace = {
                  id: w.id,
                  name: w.name,
                  active: false,
                  dashboards: w.dashboards,
                  reports: w.reports
              };
              workspaces.push(workspace)
          });
          return workspaces;
        },
        async add(id) {
          this.addLoading = true;
          let token = await this.$auth.getTokenSilently();
          axios.post(process.env.VUE_APP_ROOT_API + '/api/v1/access/add',
              {
                  userId: id,
                  workspaceId: this.activeWorkspaceId,
                  reportId: this.activeObjectId,
                  type: this.type
              },
              {
                  headers: { 'Authorization': 'Bearer ' + token }
              })
              .then(() => {
              var user = this.users.find(value => value.userId === id);
              this.assignedUsers.push(user)
              this.users = this.users.filter(e => e.userId !== id)
        }).finally(this.addLoading = false);
  },
        async remove(id) {
          this.removeLoading = true;
          let token = await this.$auth.getTokenSilently();
          axios.post(process.env.VUE_APP_ROOT_API + '/api/v1/access/remove',
                {
                userId: id,
                workspaceId: this.activeWorkspaceId,
                reportId: this.activeObjectId,
                type: this.type
            },{
                    headers: { 'Authorization': 'Bearer ' + token }
                }).then(() => {
              var user = this.assignedUsers.find(value => value.userId === id);
              this.users.push(user)
              this.assignedUsers = this.assignedUsers.filter(e => e.userId !== id)
          }).finally(this.removeLoading = false);

        },
        async select(workspaceId, dashboardId, powerBiType){
            this.accessLoading = true;
            this.users = this.$store.state.users;
            this.assignedUsers = [];
            var token = await this.$auth.getTokenSilently();
            await axios.get(process.env.VUE_APP_ROOT_API + '/api/v1/access', {
                params: {
                    workspaceId: workspaceId,
                    objectId: dashboardId,
                    type: powerBiType
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(result => {
                if(result.data.length == 0){
                    return;
                }
                this.assignedUsers = this.users.filter(u => result.data.includes(u.userId));
                this.users = this.users.filter(e => !result.data.includes(e.userId));
            }).finally(() => {
                this.activeWorkspaceId = workspaceId;
                this.activeObjectId = dashboardId;
                this.type = powerBiType;
            });
            this.accessLoading = false;
        }
    }
}

</script>
