<template>
  <NavBar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  async created() {
    const response = await axios.get('users/current_user')
    // set user state to Current_user upon creating App
    this.$store.dispatch('user', response.data)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  min-height: 90vh;
}
</style>
