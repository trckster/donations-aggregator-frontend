<template>
  <div>Card {{ donation.id }}</div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    donation: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
