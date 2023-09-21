<template>
  <div class="home" v-if="!user">
    <img
      src="https://cdn.discordapp.com/attachments/1112292984747204731/1143184403984568352/daforcez_logo_for_an_app_use_2_colors_only_use_ED7277_and_EAD2C_bea522cc-368c-4148-9da9-70dc115440f9.png"
      style="mix-blend-mode: screen;">
    <h1> Do you have a Dinelemma?</h1>
    <h2> 3 easy step to decide on a place to eat</h2>
    <ol>
      <li>Add your friends to a group</li>
      <li>Select restaurant options</li>
      <li>Swipe until there is a match!</li>
    </ol>
    <div>
      <router-link to="/signin" class="col">
        <ButtonPrimary text="Log in" />
      </router-link>
    </div>
    <div>
      <h3>Don't have an account yet?</h3>
      <router-link to="/signup" class="col">
        <ButtonPrimary text="Sign up" />
      </router-link>
    </div>
  </div>

  <GroupList v-if="user" />
</template>

<script>
import { mapGetters } from 'vuex'
import GroupList from './GroupList.vue'
import ButtonPrimary from '@/components/Shared/ButtonPrimary.vue';

export default {
  name: 'HomeView',
  components: {
    GroupList,
    ButtonPrimary
  },
  emits: ['alert', 'notice'],
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped lang="scss">
img {
  width: 50%
}

h3 {
  margin: 64px 0px 32px;
}

h2 {
  margin-bottom: 64px;
}
</style>
