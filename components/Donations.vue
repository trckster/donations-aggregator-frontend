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

const DonationsComponent = {
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

    if (process.client) {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
          this.hideFirst()
        }
      })
    }
  },
  mounted() {
    this.$echo
      .channel('private-donations')
      .listen('DonationCreated', ({ donation }) => {
        if (this.filters.is_hidden) {
          return
        }
        this.$store.commit('addDonation', {
          newDonation: donationAdapter(donation),
          filters: this.filters,
        })
      })
      .listen('DonationUpdated', ({ donation }) => {
        this.$store.commit('setDonation', {
          newDonation: donationAdapter(donation),
          showHidden: this.filters.is_hidden,
        })
      })
  },
  methods: {
    hideFirst() {
      if (!this.filters.is_hidden) {
        this.$store.dispatch('updateHidden', {
          id: this.donations[0].id,
          isHidden: !this.donations[0].isHidden,
        })
      }
    },
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

export default DonationsComponent
</script>
