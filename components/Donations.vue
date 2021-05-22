<template>
  <div>
    <Card
      v-for="donation in donations"
      :key="donation.id"
      :donation="donation"
    />
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Donations',
  components: { Card },
  data() {
    return {
      donations: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
