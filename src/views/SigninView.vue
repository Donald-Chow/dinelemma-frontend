<template>
  <div class="signin-view">
    <div>
      <img
        src="https://cdn.discordapp.com/attachments/1112292984747204731/1143184403984568352/daforcez_logo_for_an_app_use_2_colors_only_use_ED7277_and_EAD2C_bea522cc-368c-4148-9da9-70dc115440f9.png"
        alt="" style="mix-blend-mode: screen;">
      <h3>Can decide where to eat? </h3>
      <h3>Let Dinelemma solve your Dilemma.</h3>
    </div>
    <SigninForm />
    <h4>New to dinelemma? <br> Sign up today.</h4>
    <router-link to="/signup">
      <ButtonPrimary text="Sign up" />
    </router-link>
  </div>
</template>

<script>
import SigninForm from '@/components/SigninForm.vue'
import ButtonPrimary from '@/components/Shared/ButtonPrimary.vue';

export default {
  name: 'SigninView',
  components: {
    SigninForm,
    ButtonPrimary
  }
}
</script>

<style scoped lang="scss">
.signin-view {
  img {
    width: 50%;
  }

  h3 {
    margin: 0px 0px 32px;
    text-align: center
  }

  h4 {
    margin-top: 32px;
    line-height: 24px;
  }


  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
  }
}

a {
  text-decoration: none;
}
</style>
