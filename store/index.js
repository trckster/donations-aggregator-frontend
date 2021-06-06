/* eslint-disable prettier/prettier */
import donationAdapter from '@/adapters/DonationAdapter'

function retrieveSortParameters(filters) {
  let sortField = 'amount'
  let sortOrder = 'desc'
  if (filters.sort === 'amount-asc') {
    sortOrder = 'asc'
  } else if (filters.sort === 'time-desc') {
    sortField = 'paid_at'
  }

  return [sortField, sortOrder]
}

export const state = () => ({
  darkModeEnabled: false,
  isAuthenticated: false,
  isFilterOpen: false,
  donations: [],
})

export const getters = {
  donations: ({ donations }) => donations,
  darkModeEnabled: ({ darkModeEnabled }) => darkModeEnabled,
  isFilterOpen: ({ isFilterOpen }) => isFilterOpen,
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
  toggleFilter(state) {
    state.isFilterOpen = !state.isFilterOpen
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
  setDonation(state, newDonationData) {
    const { id, ...newData } = newDonationData;
    const donation = state.donations.find(dontaion => dontaion.id === id);
    Object.assign(donation, newData);
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
        `donations?sort-field=${sortField}&sort-order=${sortOrder}&is-hidden=${filters.is_hidden ? 1 : 0
        }`
      )
      .then((response) => {
        return response.map((donation) => donationAdapter(donation))
      })
      .catch(() => { })

    commit('setDonations', data)
  },
  async loadMoreDonations({ state, commit }, filters) {
    const [sortField, sortOrder] = retrieveSortParameters(filters)
    const currentCount = state.donations.length
    const data = await this.$axios
      .$get(
        `donations?sort-field=${sortField}&sort-order=${sortOrder}&is-hidden=${filters.is_hidden ? 1 : 0
        }&skip=${currentCount}`
      )
      .then((response) => {
        return response.map((donation) => donationAdapter(donation))
      })
      .catch(() => { })

    commit('addDonations', data)

    return data.length >= 25
  },
  async updateHidden({ commit }, data) {
    await this.$axios
      .$put(`donations/${data.id}`, {
        'is-hidden': data.isHidden,
      })
      .then(() => {
        commit('removeDonation', data.id)
      })
  },
  async updateComment({ commit }, data) {
    await this.$axios
      .$put(`donations/${data.id}`, {
        'admin-message': data.adminComment,
      })
      .then(() => {
        commit('setDonation', data)
      })
  },
}
