<template>
  <div class="home" v-if="!user">
    <img
      src="https://cdn.discordapp.com/attachments/1112292984747204731/1143184403984568352/daforcez_logo_for_an_app_use_2_colors_only_use_ED7277_and_EAD2C_bea522cc-368c-4148-9da9-70dc115440f9.png"
      alt="" class="w-75 m-auto" style="mix-blend-mode: screen;">
    <h1> Do you have a Dinelemma?</h1>
    <h2> 3 easy step to decide on a place to eat</h2>
    <ol>
      <li>Add your friends to a group</li>
      <li>Select restaurant options</li>
      <li>Swipe until there is a match!</li>
    </ol>
    <div>
      <router-link to="/signin" class="col">
        <div class="btn btn-primary btn-lg">Log in</div>
      </router-link>
      <div class="mt-5">
        Don't have an account yet?
        <router-link to="/signup" class="col">
          <div class="btn btn-primary btn-lg">Sign up</div>
        </router-link>
      </div>
    </div>
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
