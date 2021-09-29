<template><div>
  <v-card
      class="d-flex justify-space-between mb-6"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      flat
      tile
  >
    <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
    >
      justify-space-between
    </v-card>
  </v-card></div></template>


<script>
  export default {
    name: "Groups",
  }

</script>
