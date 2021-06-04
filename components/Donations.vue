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
    <client-only>
      <scroll-loader
        :loader-method="loadMoreDonations"
        :loader-disable="stopLoading"
      />
    </client-only>
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
      stopLoading: false,
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
    this.loadDonations()
  },
  methods: {
    loadDonations() {
      this.$store.dispatch('loadDonations', this.filters).then(() => {
        this.stopLoading = this.donations && this.donations.length === 0
      })
    },
    loadMoreDonations() {
      this.$store.dispatch('loadMoreDonations', this.filters).then((loaded) => {
        this.stopLoading = !loaded
      })
    },
    updateFilters(newValue) {
      this.filters = newValue
      this.loadDonations()
    },
  },
}
</script>
