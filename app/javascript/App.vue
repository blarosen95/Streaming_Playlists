<template>
<div id="app">
  <v-app>
    <Episodes/>
  </v-app>
</div>
</template>

<script>
import Episodes from "./packs/components/Episodes";
export default {
  // name: "App",
  // components: {Episodes}
  data: function () {
    return {

    };
  },
  components: {
    Episodes,
  },

}
</script>

<style scoped>

</style>