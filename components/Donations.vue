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
import donationAdapter from '@/adapters/DonationAdapter'
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
      return this.$store.getters.donations
    },
  },
  created() {
    this.loadDonations()
  },
  mounted() {
    this.$echo
      .channel('private-donations')
      .listen('DonationCreated', (e) => {
        console.log('Created')
        console.log(e)
      })
      .listen('DonationUpdated', ({ donation }) => {
        this.$store.commit('setDonation', {
          newDonation: donationAdapter(donation),
          showHidden: this.filters.is_hidden,
        })
      })
  },
  methods: {
    loadDonations() {
      this.$store.dispatch('loadDonations', this.filters).then(() => {
        this.stopLoading = this.donations && this.donations.length < 25
      })
    },
    loadMoreDonations() {
      this.$store.dispatch('loadMoreDonations', this.filters).then((loaded) => {
        this.stopLoading = !loaded
      })
    },
    updateFilters(newValue) {
      Object.assign(this.filters, newValue)
      this.loadDonations()
    },
  },
}
</script>
