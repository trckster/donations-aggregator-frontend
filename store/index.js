import donationAdapter from '@/adapters/DonationAdapter'

function retrieveSortParameters(filters) {
  let sortField = 'amount'
  let sortOrder = 'desc'
  if (filters.sort === 'amount-asc') {
    sortOrder = 'asc'
  } else if (filters.sort === 'time-desc') {
    sortField = 'paid_at'
  } else if (filters.sort === 'time-asc') {
    sortField = 'paid_at'
    sortOrder = 'asc'
  }

  return [sortField, sortOrder]
}

export const state = () => ({
  isAuthenticated: false,
  donations: [],
})

export const getters = {
  donations: ({ donations }) => donations,
}

export const mutations = {
  setDonations(state, donations) {
    state.donations = donations
  },
  addDonations(state, newDonations) {
    newDonations.forEach((newDonation) => {
      if (state.donations.every((donation) => donation.id !== newDonation.id)) {
        state.donations.push(newDonation)
      }
    })
  },
  removeDonation(state, donationId) {
    state.donations = state.donations.filter(
      (donation) => donation.id !== donationId
    )
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    // Add auth
  },
  async loadDonations({ commit }, filters) {
    const [sortField, sortOrder] = retrieveSortParameters(filters)

    const data = await this.$axios
      .$get(
        `donations?sort-field=${sortField}&sort-order=${sortOrder}&is-hidden=${
          filters.is_hidden ? 1 : 0
        }`
      )
      .then((response) => {
        return response.map((donation) => donationAdapter(donation))
      })
      .catch(() => {})

    commit('setDonations', data)
  },
  async loadMoreDonations({ state, commit }, filters) {
    const [sortField, sortOrder] = retrieveSortParameters(filters)
    const currentCount = state.donations.length
    const data = await this.$axios
      .$get(
        `donations?sort-field=${sortField}&sort-order=${sortOrder}&is-hidden=${
          filters.is_hidden ? 1 : 0
        }&skip=${currentCount}`
      )
      .then((response) => {
        return response.map((donation) => donationAdapter(donation))
      })
      .catch(() => {})

    if (data.length === 0) {
      return false
    }

    commit('addDonations', data)

    return true
  },
  async update({ commit }, data) {
    await this.$axios
      .$put(`donations/${data.id}`, {
        'is-hidden': data.isHidden,
      })
      .then(() => {
        commit('removeDonation', data.id)
      })
  },
}
