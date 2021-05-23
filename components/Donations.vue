<template>
  <div>
    <Header />
    <div id="js-col_to-display" class="container donates-wrap">
      <Card
        v-for="donation in donations"
        :key="donation.id"
        :donation="donation"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card'
import Header from './header/Header'

export default {
  name: 'Donations',
  components: { Header, Card },
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
