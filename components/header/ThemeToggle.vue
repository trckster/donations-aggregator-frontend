<template>
  <div id="toggle-theme" @click="$store.commit('changeTheme')">
    <i class="icon-toggle"></i>
  </div>
</template>

<script>
export default {
  name: 'ThemeToggle',
}
</script>

<style scoped></style>
