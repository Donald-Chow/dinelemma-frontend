<template>
  <nav>
    <div class="row">
      <router-link to="/about" class="col"><i class="fa-solid fa-users-line"></i></router-link> |
      <router-link to="/about" class="col"><i class="fa-solid fa-burger"></i></router-link> |
      <router-link to="/" class="col"><i class="fa-solid fa-house"></i></router-link> |
      <router-link to="/signin" class="col" v-if="!user">Sign In</router-link>
      <router-link to="/Profile" class="col" v-if="user"><i class="fa-solid fa-user"></i></router-link>

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
