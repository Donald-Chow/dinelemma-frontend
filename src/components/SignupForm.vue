<template>
  <div class="border p-4 bg-light">
    <form class="h-100 d-flex flex-column justify-content-center" @click.prevent="handleSubmit">
      <ErrorAlert v-if="error" :error="error" />
      <h1 class="mb-3">Sign up now!</h1>
      <div class="text-center mb-3">No credit card required!.</div>
      <div class="mb-3">
        <input type="email" class="form-control" v-model="email" placeholder="Email">
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" v-model="password" placeholder="Password">
      </div>
      <div class="d-flex justify-content-end mb-3">

        <p>By creating an account, you agree to the Dinelemma Privacy Policy and Terms of Service.</p>
      </div>
      <div class="d-grid">
        <button type="submit" class="btn btn-primary btn-lg">Start now</button>
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
        const response = await axios.post('users', {
          user: {
            email: this.email,
            password: this.password
          }
        });
        console.log(response);
        localStorage.setItem('Authorization', response.headers.authorization);
        this.$router.push('/');
      } catch (error) {
        this.error = "Something went wrong while registering"
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: $primary;
}
</style>
