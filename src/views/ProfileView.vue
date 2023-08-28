<template>
  <h1>Profile!</h1>
  <h2>Name: {{ user.name }}</h2>
  <h2>Username: {{ user.username }}</h2>
  <h2>Email: {{ user.email }}</h2>
  <button @click="handleLogout" class="btn btn-primary btn-lg" v-if="user">Log out! <i
      class="fa-solid fa-arrow-right-from-bracket"></i></button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileView',
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
