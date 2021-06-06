<template>
  <div id="page" :class="{ dark: $store.getters.darkModeEnabled }">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: 'auth',
  mounted() {
    this.$store.commit('initStorage')
  },
}
</script>
