<template>
  <header>
    <div class="row">
      <div class="col">
        <router-link to="/" class="d-flex align-items-center">
          <img
            src="https://cdn.discordapp.com/attachments/1112292984747204731/1143184403984568352/daforcez_logo_for_an_app_use_2_colors_only_use_ED7277_and_EAD2C_bea522cc-368c-4148-9da9-70dc115440f9.png"
            alt="">
          <h3 class="text-start ps-2 mb-0">Dinelemma</h3>
        </router-link>
      </div>
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

<style scoped lang="scss">
h6 {
  margin: 0px;
}

h3 {
  color: $dark-gray;
}

header {
  background-color: $main1;
  padding: 16px 16px 8px 16px;
  position: sticky;
  top: 0px;
}

img {
  mix-blend-mode: screen;
  height: 36px;
  width: 36px;
}
</style>
