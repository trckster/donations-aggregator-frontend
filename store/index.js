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
  darkModeEnabled: false,
  isAuthenticated: false,
  donations: [],
})

export const getters = {
  donations: ({ donations }) => donations,
  darkModeEnabled: ({ darkModeEnabled }) => darkModeEnabled,
}

export const mutations = {
  initStorage(state) {
    if (process.browser) {
      state.darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true'
    }
  },
  changeTheme(state) {
    state.darkModeEnabled = !state.darkModeEnabled
    localStorage.setItem('darkModeEnabled', state.darkModeEnabled)
  },
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
  setAuthenticated(state) {
    state.isAuthenticated = true
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('loadUser')
  },
  async loadUser({ commit }) {
    await this.$axios
      .$get('me')
      .then(() => {
        commit('setAuthenticated')
      })
      .catch(() => {})
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

    commit('addDonations', data)

    return data.length >= 25
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
