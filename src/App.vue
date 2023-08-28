<template>
  <HeaderBar />
  <div class="container">
    <router-view />
  </div>
  <NavBar />
</template>

<script>
import axios from 'axios'
import NavBar from './components/NavBar.vue'
import HeaderBar from './components/HeaderBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    HeaderBar
  },
  async created() {
    try {
      const response = await axios.get('users/current_user')
      // set user state to Current_user upon creating App
      console.log(response);
      this.$store.dispatch('user', response.data)
    } catch (error) {
      console.error('An error occurred while logging in:', error);
    }
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
