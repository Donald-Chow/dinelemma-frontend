<template>
  <div class="home" v-if="!user">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1> Do you have a Dinelemma?</h1>
    <h2> 3 easy step to decide on a place to eat</h2>
    <ol>
      <li>Add your friends to a group</li>
      <li>Select restaurant options</li>
      <li>Swipe until there is a match!</li>
    </ol>
  </div>
  <DashboardView v-if="user" />
</template>

<script>
import { mapGetters } from 'vuex'
import DashboardView from './DashboardView.vue'

export default {
  name: 'HomeView',
  components: {
    DashboardView
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
