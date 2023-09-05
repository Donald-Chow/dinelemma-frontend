<template>
  <div v-if="user">
    <h1>Profile!</h1>
    <h2>Name: {{ user.name }}</h2>
    <h2>Username: {{ user.username }}</h2>
    <h2>Email: {{ user.email }}</h2>
    <button @click="handleLogout" class="btn btn-primary btn-lg">Log out! <i
        class="fa-solid fa-arrow-right-from-bracket"></i></button>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileView',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async handleLogout() {
      await localStorage.removeItem('Authorization');
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');

      await this.$store.dispatch('user', null)
      this.$router.push('/')
    }
  }
}
</script>
