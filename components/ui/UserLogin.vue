<template>
  <v-card rounded color="#EC9143" class="pa-7">
    <v-card-title>
      <v-row class="rowCard fontTitle">
        Welcome
      </v-row>
      <v-row class="rowCard fontTitle">
        Back
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-text-field v-model="email" rounded label="E-mail" outlined />
      </v-row>
      <v-row>
        <v-text-field v-model="password" rounded label="Password" outlined type="password" />
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-col cols="12">
        <v-row class="rowCard">
          <v-btn block class="pa-2" color="#134700" @click="login">
            <span style="text-transform: none; color:white;">Log-In</span>
          </v-btn>
        </v-row>
        <v-row class="rowCard">
          <span>if you didn’t have account</span>
          <a @click="showDialog=true">Sign-Up</a>
        </v-row>
      </v-col>
    </v-card-actions>
    <v-dialog
      v-model="showDialog"
      persitent
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>Agregar Usuario</v-card-title>
        <v-card-text>
          <v-row width="100%">
            <v-text-field
              v-model="nombre"
              class="pa-2 ma-2"
              label="Nombre"
              placeholder="Escribe tu nombre"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="apaterno"
              class="pa-2 ma-2"
              label="Apellido Paterno"
              placeholder="Escribe tu apellido paterno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="amaterno"
              class="pa-2 ma-2"
              label="Apellido Materno"
              placeholder="Escribe tu apellido materno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="direccion"
              class="pa-2 ma-2"
              label="Direccion"
              placeholder="Escribe tu direccion"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="telefono"
              class="pa-2 ma-2"
              label="Telefono"
              placeholder="Escribe tu telefono"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="emailNuevo"
              class="pa-2 ma-2"
              label="correo"
              placeholder="Escribe tu correo"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="passwordNuevo"
              class="pa-2 ma-2"
              label="Password"
              placeholder="Escribe tu Password"
              outlined
              type="password"
            />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="registrarUsuario">
              <span style="text-transform: none; color:white;">Registrar</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showDialog = false">
              <span style="text-transform: none; color:white;">Cancelar</span>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      password: null,
      showDialog: false,
      emailNuevo: null,
      passwordNuevo: null,
      nombre: null,
      apaterno: null,
      amaterno: null,
      direccion: null,
      telefono: null
    }
  },
  methods: {
    async login () {
      const sendData = {
        email: this.email,
        password: this.password
      }
      await this.$auth.loginWith('local', {
        data: sendData
      }).then(async (res) => {
        const result = await res.data
        if (result.message === 'success') {
          this.$store.commit('setToken', result.token)
          console.log('Success: ', result)
          this.$router.push('/dashboard')
        }
      }).catch((err) => {
        console.log('Error: ', err)
      })
    },
    registrarUsuario () {
      const url = '/register'
      const data = {
        nombre: this.nombre,
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        direccion: this.direccion,
        telefono: this.telefono,
        email: this.emailNuevo,
        password: this.passwordNuevo,
        userToUpdate: this.userToUpdate
      }
      this.$axios.post(url, data)
        .then((res) => {
          console.log('res =>', res)
          if (res.data.message === 'User registered successfully') {
            this.showDialog = false
          }
        })
        .catch((err) => {
          console.log('err =>', err)
        })
    }
  }
}
</script>

<style scoped>
.rowCard {
  width: 100%;
  display: flex;
  justify-content: center;
}

.fontTitle {
  font-size: 52px!important;
  line-height: 78px!important;
}
</style>
