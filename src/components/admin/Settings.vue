<template>
      <v-container
        fill-height
        fluid
      >
      <v-row align="center" justify="center">
        <v-col>
          <p class="display-1 text--primary">Settings</p> 
        </v-col>
      </v-row>
      <v-row>
        <v-card
            v-for="setting in settings" :key="setting.Id"
            max-width="344"
          >
          <v-card-text>
            <p class="display-1 text--primary">
              {{ setting.Name }}
            </p>
            <p>ondertitel</p>
            <div class="text--primary">
              TenantId
              ApplicationId (app Registration)
              
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Learn More
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      </v-container>
</template>

<script>
  export default {
    name: "Settings",
    data: () => ({
      settings: [
        {
          Id: "213423",
          Name: "FirstPowerBiSetting",
          AppId: "",
        },
      ]
    }),
  }

</script>