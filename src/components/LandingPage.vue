<template>
  <v-main class="grey lighten-5">
    <tool-bar name="Power BI - Embedded .nl" />
          <!-- If using vue-router -->
          <router-view />
  </v-main>
</template>

<script>

import ToolBar from '@/components/layout/ToolBar'

  export default {
    name: "LandingPage",
    components: {
      ToolBar,
    },
  }
</script>
