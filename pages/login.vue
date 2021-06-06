<template>
  <div>Here will be login form</div>
</template>

<script>
export default {
  layout: 'empty',
  beforeCreate() {
    if (this.$store.state.isAuthenticated) {
      this.$router.push('/')
    }
  },
}
</script>
