<template>
  <div class="border p-4 bg-light col-6">
    <form class="h-100 d-flex flex-column justify-content-center">
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
export default {
  name: 'SigninForm',
  data() {
    return {
      email: '',
      password: ''
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
