<template>
  <div>
    <Header :value="filters" @change="updateFilters" />
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
      filters: {
        sort: 'amount-desc',
        is_hidden: false,
      },
    }
  },
  computed: {
    donations() {
      return this.$store.state.donations
    },
  },
  created() {
    this.$store.dispatch('loadDonations', this.filters)
  },
  methods: {
    updateFilters(newValue) {
      this.filters = newValue
      this.$store.dispatch('loadDonations', this.filters)
    },
  },
}
</script>
