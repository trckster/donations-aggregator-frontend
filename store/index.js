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
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    // Add auth
  },
  async loadDonations({ commit }, filters) {
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

    const data = await this.$axios.$get(
      `donations?sort-field=${sortField}&sort-order=${sortOrder}&is-hidden=${
        filters.is_hidden ? 1 : 0
      }`
    )

    commit('setDonations', data)
  },
}
