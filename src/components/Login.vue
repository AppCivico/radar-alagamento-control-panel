<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo-radar.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="checkCreds">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="username" placeholder="E-mail" type="text" v-model="username">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="Senha" type="password" v-model="password">
              </div>
              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Entrar</button>
            </form>

            <!-- errors -->
            <div v-if=response class="text-red"><p>{{response}}</p></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      response: ''
    }
  },
  methods: {
    checkCreds () {
      const {username, password} = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      api.request('post', '/login', {email: username, password})
      .then(response => {
        this.toggleLoading()

        const data = response.data
        /* Checking if error object was returned from the server */
        if (data.error) {
          const errorName = data.error.name
          if (errorName) {
            this.response = errorName === 'InvalidCredentialsError'
            ? 'Username/Password incorrect. Please try again.'
            : errorName
          } else {
            this.response = data.error
          }

          return
        }

        /* Setting user in the state and caching record to the localStorage */
        if (data.api_key) {
          const user = { name: data.name, email: data.email }

          this.$store.commit('SET_USER', user)
          this.$store.commit('SET_TOKEN', data.api_key)

          if (window.localStorage) {
            window.localStorage.setItem('user', JSON.stringify(user))
            window.localStorage.setItem('token', data.api_key)
          }

          this.$router.push('/')
        }
      })
      .catch(error => {
        this.$store.commit('TOGGLE_LOADING')
        console.log(error)

        this.response = 'E-mail ou senha inválidos. Tente novamente.'
        this.toggleLoading()
      })
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  }
}
</script>

<style scoped>
.container-table {
  display: table;
  color: white;
  background-color: #fff;
  background-image: url('/static/img/bg.png');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 100%;
  height: 100%;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>
