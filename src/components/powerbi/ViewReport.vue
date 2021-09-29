<template>
  <v-container
    id="reportContainer"
    pa-0
    fluid
    fill-height
  >
</v-container>
</template>

<script>
import axios from 'axios'
import * as pbi from 'powerbi-client';

 export default {
    name: "ViewReport",
    props: ['wid', 'rid'],
    data: () => ({
      token: String,
      embedUrl: String,
      type: String
    }),
    async mounted () {
      var token = await this.$auth.getTokenSilently();
      console.log('at the correct component');
        axios
          .get(process.env.VUE_APP_ROOT_API + `/api/v1/powerbi/reports/embed?workspaceId=${this.wid}&reportId=${this.rid}`, {headers: { Authorization: `Bearer ${token}`}})
          .then(response => {
            this.token = response.data.token;
            this.embedUrl = response.data.embedUrl;
            this.type = response.data.type;
            this.embedReport();
          });
    },
    methods: {
      embedReport: function(){

            var models = pbi.models;
            // Embed configuration used to describe the what and how to embed.
            // This object is used when calling powerbi.embed.
            // This also includes settings and options such as filters.
            // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
            var config = {
                type: 'report',
                tokenType: models.TokenType.Embed,
                accessToken: this.token,
                embedUrl: this.embedUrl,
                id: this.rid,
                settings: {
                    filterPaneEnabled: false,
                    navContentPaneEnabled: false
                }

            };

            // Get a reference to the embedded report HTML element
            var reportContainer = document.getElementById('reportContainer');
            console.log(reportContainer);
            // Embed the report and display it within the div container.
            
            const powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
            var report = powerbi.embed(reportContainer, config);

            // Dashboard.off removes a given event handler if it exists.
            report.off("loaded");

            // Dashboard.on will add an event handler which prints to Log window.
            report.on("loaded", function () {
                console.log("Loaded");
            });

            report.on("error", function (event) {
                console.log(event.detail);

                report.off("error");
            });

            report.off("visualClicked");
            report.on("visualClicked", function (event) {
                console.log(event.detail);
            });
      }
    }
  }

</script>
