<template>
  <v-container
    fluid
  >
      <v-progress-circular v-if="!$store.state.workspacesLoaded"
          style="position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"
          indeterminate
          color="#FC0D1C"
        ></v-progress-circular>
      <h1 v-if="error"
        style="position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"> 
        {{ error }}</h1>
    <v-row class="ml-6">
      <v-col cols="12"
        v-for="workspace in $store.state.workspaces"
        :key="workspace.id"
      >
        <div class="text-h5 font-weight-bold mb-4">{{ workspace.name }}</div>
        <v-row
          class="grey lighten-5"
          style="height: 150px;"
          align="stretch"
        >
          <v-card
            v-for="dashboard in workspace.dashboards"
            :key="dashboard.id"
            :href="`/workspaces/${workspace.id}/dashboards/${dashboard.id}/`"
            target="_blank"
            min-width="250"
            class="ma-3 pa-3 text-center"
          >
              <v-icon large color="#FC0D1C">
                  mdi-poll-box
              </v-icon>

              <v-card-title>
                  {{ dashboard.displayName }}
              </v-card-title>

              <v-card-subtitle>
                  Dashboard
              </v-card-subtitle>

          </v-card>
          <v-card
            v-for="report in workspace.reports"
            :href="`/workspaces/${workspace.id}/reports/${report.id}/`"
            target="_blank"
            :key="report.id"
            class="ma-3 pa-3 text-center"
            min-width="250"
            >
            <v-icon large color="#FC0D1C">
                mdi-poll-box
            </v-icon>

            <v-card-title>
              {{ report.name }}
            </v-card-title>

            <v-card-subtitle>
              Report
            </v-card-subtitle>
       </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
    name: "DashboardOverview",
    data: () => ({
      error: ""
    }),
    methods: {
    },
    async mounted () {
        if(!this.$store.state.workspacesLoaded) {
            var token = await this.$auth.getTokenSilently();
            await this.$store.dispatch('getWorkspaces', token)
        }
    }
}

</script>

