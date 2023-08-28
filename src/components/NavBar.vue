<template>
  <nav>
    <div class="row">
      <router-link to="/" class="col">Home</router-link> |
      <router-link to="/about" class="col">About</router-link> |
      <router-link to="/signin" class="col" v-if="!user">Sign In</router-link>
      <a @click="handleLogout" class="col" v-if="user">Sign Out</a>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('Authorization');
      this.$store.dispatch('user', null)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
nav {
  background-color: $main1;
  padding: 16px;
  position: sticky;
  bottom: 0px;

  a {
    font-weight: bold;
    color: $main3;

    &.router-link-exact-active {
      color: $main0;
    }
  }
}
</style>
