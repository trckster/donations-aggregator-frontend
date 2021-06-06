<template>
  <div class="icon-toggle" @click="$store.commit('changeTheme')" />
</template>

<script>
export default {
  name: 'ThemeToggle',
}
</script>

<style scoped></style>
