<template>
    <v-row>
      Aqui va la tabla
    </v-row>
  </template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'dashboard',
  auth: false,
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {
    this.obtenerUsuarios()
  },
  methods: {
    obtenerUsuarios () {
      const url = process.env.URL_BASE + '/get-all-users'
      const config = {
        Headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
      this.$axios.get(url, config)
        .then((res) => {
          console.log('Usuarios: ', res.data)
        })
        .catch((err) => {
          console.log('Error: ', err)
        })
    }
  }
}
</script>
