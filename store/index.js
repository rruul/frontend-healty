export const state = () => ({
  user: null,
  token: true
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}
