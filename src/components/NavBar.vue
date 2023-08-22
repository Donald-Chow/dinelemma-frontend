<template>
  <nav>
    <div class="row">
      <h3 class="col text-start">Dinelemma</h3>

      <div class="col">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/signin">Sign In</router-link> |
      </div>
      <div class="col">
        <h4 v-if="!user">Hi User</h4>
        <h4 v-if="user">Welcome Back {{ user.email }}</h4>
      </div>
      <div class="btn btn-primary" @click="logUser">Log User</div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $pink3;

    &.router-link-exact-active {
      color: $pink1;
    }
  }
}
</style>
