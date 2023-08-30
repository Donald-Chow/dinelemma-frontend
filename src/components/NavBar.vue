<template>
  <nav>
    <div class="row" v-if="user">
      <router-link to="/lists" class="col"><i class="fa-solid fa-burger"></i></router-link> |
      <router-link to="/groups" class="col"><i class="fa-solid fa-users-line"></i></router-link> |
      <router-link to="/Profile" class="col"><i class="fa-solid fa-user"></i></router-link>
    </div>
    <div class="row" v-if="!user">
      <router-link to="/" class="col"><i class="fa-solid fa-house"></i></router-link> |
      <router-link to="/signin" class="col"><i class="fa-solid fa-arrow-right-to-bracket"></i></router-link>
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
