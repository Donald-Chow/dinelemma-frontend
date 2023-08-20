<template>
  <div class="border p-4 bg-light col-4 m-auto">
    <form>
      <div class="mb-3">
        <input type="email" class="form-control" v-model="email" placeholder="Email">
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" v-model="password" placeholder="Password">
      </div>
      <div class="d-flex justify-content-between mb-3">
        <router-link to="/signup">Signup</router-link>
        <router-link to="/forget">Forgot Password?</router-link>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
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
