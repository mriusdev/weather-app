<template>
  <v-sheet v-if="this.error !== ''" color="red lighten-4" class="rounded-xl px-2 py-2 d-flex justify-center align-center" style="width: 100%;">
    <span class="subtitle-2 red--text text--darken-3 text-capitalize" >{{this.error}}</span>
  </v-sheet>
</template>

<script>
export default {
  props: {
    error: String
  }
}
</script>

<style>

</style>