<template>
  <div
    class="hidden-toggle"
    :class="{ 'hidden-toggle-active': showHidden }"
    @click="handleToggle"
  />
</template>

<script>
export default {
  name: 'HiddenToggle',
  data() {
    return { showHidden: false }
  },
  methods: {
    handleToggle() {
      this.showHidden = !this.showHidden
      this.$emit('change', this.showHidden)
    },
  },
}
</script>
