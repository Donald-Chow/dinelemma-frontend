<template>
  <div v-if="user">
    <h1>Profile!</h1>
    <h2>Username: {{ user.username }}</h2>
    <h2>Email: {{ user.email }}</h2>

    <div @click="handleLogout">
      <ButtonWarning text="Log out!" />
      <!-- Log out! <i class="fa-solid fa-arrow-right-from-bracket"></i> -->
    </div>
  </div>
</template>

<script>
import ButtonWarning from '@/components/Shared/ButtonWarning.vue';
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileView',
  computed: {
    ...mapGetters(['user'])
  },
  components: {
    ButtonWarning
  }
  ,
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
