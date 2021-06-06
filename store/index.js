/* eslint-disable prettier/prettier */
import donationAdapter from '@/adapters/DonationAdapter'

const mockDonations = [{ // CHANGE ON PROD
  "id": 12,
  "is_hidden": false,
  "source": "donatepay",
  "external_id": 483950,
  "from": "Elvis Okuneva",
  "amount": 2698800,
  "commission": 404820,
  "text": "Qui quisquam laborum est alias quas omnis. Occaecati illo perferendis quas deserunt tempore molestiae et. Placeat aut velit et cupiditate cumque. Ea architecto magni labore.",
  "admin_comment": "",
  "status": "test",
  "additional_data": {
    "unde": "aperiam"
  },
  "paid_at": "2021-06-06 11:02:25",
  "created_at": "2021-06-06T13:10:37.000000Z",
  "updated_at": "2021-06-06T13:10:37.000000Z"
},
{
  "id": 42,
  "is_hidden": false,
  "source": "donatepay",
  "external_id": 889867,
  "from": "Mr. Sheldon Bosco",
  "amount": 2078600,
  "commission": 311790,
  "text": "Magnam et accusantium sit quaerat nulla perferendis minus. Voluptatem animi perferendis et.",
  "admin_comment": "Sunt cumque nihil maiores velit. Commodi assumenda illum est. Distinctio labore earum quam recusandae non. Occaecati libero aut cum labore ea dicta aut. Itaque earum quae ut sit repudiandae.",
  "status": "cancel",
  "additional_data": {
    "quia": "neque"
  },
  "paid_at": "2021-06-06 07:39:05",
  "created_at": "2021-06-06T13:10:37.000000Z",
  "updated_at": "2021-06-06T13:10:37.000000Z"

},
{
  "id": 95,
  "is_hidden": false,
  "source": "donatepay",
  "external_id": 485139,
  "from": "Darrel Kub",
  "amount": 2147000,
  "commission": 322050,
  "text": "Necessitatibus ex id et qui soluta laborum non. Iure qui corporis at aliquam ea. Quia odit eos quidem alias suscipit facilis dolores eaque. Aut illum voluptas voluptates fugiat quas eaque voluptatem.",
  "admin_comment": "",
  "status": "wait",
  "additional_data": {
    "sit": "iusto"
  },
  "paid_at": "2021-06-05 22:35:29",
  "created_at": "2021-06-06T13:10:37.000000Z",
  "updated_at": "2021-06-06T13:10:37.000000Z"
}]

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
  loadDonations({ commit }, filters) { // CHANGE ON PROD
    // const [sortField, sortOrder] = retrieveSortParameters(filters)

    // const data = await this.$axios
    //   .$get(
    //     `donations?sort-field=${sortField}&sort-order=${sortOrder}&is-hidden=${filters.is_hidden ? 1 : 0
    //     }`
    //   )
    //   .then((response) => {
    //     return response.map((donation) => donationAdapter(donation))
    //   })
    //   .catch(() => { })

    const data = mockDonations.map(donation => donationAdapter(donation));

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
