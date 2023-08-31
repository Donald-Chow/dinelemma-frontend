<template>
  <div class="border p-4 bg-light">
    <form class="h-100 d-flex flex-column justify-content-center" @submit.prevent="handleSubmit">
      <ErrorAlert v-if="error" :error="error" />
      <h1 class="mb-3">Login</h1>
      <div class="text-center mb-3">New to Dinelemma?<router-link to="/signup">Sign up today</router-link>.</div>
      <div class="mb-3">
        <input type="email" class="form-control" v-model="email" placeholder="Email">
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" v-model="password" placeholder="Password">
      </div>
      <div class="d-flex justify-content-end mb-3">
        <a href="" aria-disabled="true">Forgot Password?</a>
        <!-- <router-link to="/forget">Forgot Password?</router-link> -->
      </div>
      <div class="d-grid">
        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import ErrorAlert from './ErrorAlert.vue'

export default {
  name: 'SigninForm',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  components: {
    ErrorAlert
  },
  methods: {
    async handleSubmit() {
      try {
        await localStorage.removeItem('Authorization')
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');

        const response = await axios.post('users/sign_in', {
          user: {
            email: this.email,
            password: this.password
          }
        });
        // store jwt in localStorage
        await localStorage.setItem('Authorization', response.headers.authorization);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        // save current_user information in state
        this.$store.dispatch('user', response.data.status.data.user);
        // await this.storeCurrentUser();

        // redirect to home page as logged in user
        await this.$router.push('/');

      } catch (error) {
        console.error('An error occurred while logging in:', error)
        this.error = 'Invalid username/password'
      }
    },
    // async storeCurrentUser() {
    //   try {
    //     // Fetch the current user information
    //     const loginResponse = await axios.get('users/current_user');
    //     // Store the user information in your Vuex store
    //     this.$store.dispatch('user', loginResponse.data);
    //   } catch (error) {
    //     console.error('An error occurred while fetching current user:', error);
    //     // Handle error conditions here
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: $primary;
}
</style>
