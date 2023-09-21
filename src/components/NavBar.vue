<template>
  <nav>
    <div class="nav-wrapper" v-if="user">
      <router-link to="/lists" class="nav-item"><i class="fa-solid fa-burger"></i></router-link> |
      <router-link to="/groups" class="nav-item"><i class="fa-solid fa-users-line"></i></router-link> |
      <router-link to="/Profile" class="nav-item"><i class="fa-solid fa-user"></i></router-link>
    </div>
    <div class="nav-wrapper" v-if="!user">
      <router-link to="/" class="nav-item"><i class="fa-solid fa-house"></i></router-link> |
      <router-link to="/signin" class="nav-item"><i class="fa-solid fa-arrow-right-to-bracket"></i></router-link>
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
  // padding: 16px 0px;
  position: fixed;
  bottom: 0;
  width: 100%;

  a {
    font-weight: bold;
    color: $main3;

    &.router-link-exact-active {
      color: $main0;
    }
  }
}

.nav-wrapper {
  width: 100%;
  display: flex;
  align-items: center;

  .nav-item {
    flex-grow: 1;
    padding: 16px 0px;
  }
}
</style>
