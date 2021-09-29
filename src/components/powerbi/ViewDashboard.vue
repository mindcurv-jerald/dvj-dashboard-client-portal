<template>
  <v-container
    id="dashboardContainer"
    fluid
    pa-0
    fill-height
  >
</v-container>
</template>

<script>
import axios from 'axios'
import * as pbi from 'powerbi-client';

 export default {
    name: "ViewDashboard",
    props: ['wid', 'did'],
    data: () => ({
      token: String
    }),
    async mounted () {
        var token = await this.$auth.getTokenSilently();
 
        axios
          .get(process.env.VUE_APP_ROOT_API + `/api/v1/powerbi/dashboards/embed?workspaceId=${this.wid}&dashboardId=${this.did}`, {headers: { Authorization: `Bearer ${token}`}})
          .then(response => {
            this.token = response.data.token;
            this.embedReport();
          });
    },
    methods: {
      embedReport: function(){
            let url = `https://app.powerbi.com/dashboardEmbed?dashboardId=${this.did}&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlfX0%3d`;

            var models = pbi.models;
            // Embed configuration used to describe the what and how to embed.
            // This object is used when calling powerbi.embed.
            // This also includes settings and options such as filters.
            // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
            var config = {
                type: 'dashboard',
                tokenType: models.TokenType.Embed,
                accessToken: this.token,
                embedUrl: url,
                id: this.did,
                pageView: 'fitToWidth'
            };

            // Get a reference to the embedded dashboard HTML element
            var dashboardContainer = document.getElementById('dashboardContainer');
            console.log(dashboardContainer);
            // Embed the dashboard and display it within the div container.
            
            const powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
            var dashboard = powerbi.embed(dashboardContainer, config);

            // Dashboard.off removes a given event handler if it exists.
            dashboard.off("loaded");

            // Dashboard.on will add an event handler which prints to Log window.
            dashboard.on("loaded", function () {
                console.log("Loaded");
            });

            dashboard.on("error", function (event) {
                console.log(event.detail);

                dashboard.off("error");
            });

            dashboard.off("visualClicked");
            dashboard.on("visualClicked", function (event) {
                console.log(event.detail);
            });
      }
    }
  }

</script>
