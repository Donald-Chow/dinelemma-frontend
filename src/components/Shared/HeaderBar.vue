<template>
  <header>
    <div>
      <router-link to="/" class="logo">
        <!-- <img
          src="https://cdn.discordapp.com/attachments/1112292984747204731/1143184403984568352/daforcez_logo_for_an_app_use_2_colors_only_use_ED7277_and_EAD2C_bea522cc-368c-4148-9da9-70dc115440f9.png"
          alt=""> -->
        <h3 class="logo">Dinelemma</h3>
      </router-link>
    </div>
    <div>
      <h6 v-if="!user">Hi User</h6>
      <div v-if="user">
        <h6> Welcome Back</h6>
        <h6> {{ user.username }}</h6>
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
h3 {
  color: $dark-gray;
}

.logo {
  font-family: $title-font;
  color: rgb(146, 20, 22);
  text-shadow: 1px 1px 2px pink;
}

header {
  background-color: $white;
  padding: 16px 0px 8px;
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 6px rgb(180, 180, 180, 0.4);

  div {
    padding: 0px 16px
  }
}

img {
  mix-blend-mode: screen;
  height: 36px;
  width: 36px;
}

.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
