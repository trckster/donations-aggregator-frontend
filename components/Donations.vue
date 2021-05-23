<template>
  <div>
    <Header />
    <div id="js-col_to-display" class="container donates-wrap">
      <Card
        v-for="donation in donations"
        :key="donation.id"
        :donation="donation"
      />
      Here: {{ donations }}
    </div>
  </div>
</template>

<script>
import Card from './Card'
import Header from './header/Header'

export default {
  name: 'Donations',
  components: { Header, Card },
  computed: {
    donations() {
      return this.$store.state.donations
    },
  },
  created() {
    this.$store.dispatch('loadDonations')
  },
}
</script>

<style scoped></style>
