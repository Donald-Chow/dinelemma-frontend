<template>
  <header>
    <div class="row">
      <h3 class="col text-start">Dinelemma</h3>
      <div class="col">
        <h6 v-if="!user">Hi User</h6>
        <h6 v-if="user">Welcome Back {{ user.email }}</h6>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderBar',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss">
header {
  background-color: $main1;
  padding: 16px 8px 8px 16px;
  position: sticky;
  top: 0px;
}
</style>
