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
  async loadDonations({ commit }) {
    const donations = [
      {
        id: 1,
      },
    ]

    // Temproray fix
    await new Promise((resolve) => setTimeout(resolve, 1))

    commit('setDonations', donations)
  },
}
