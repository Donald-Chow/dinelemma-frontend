<template>
  <div class="signup">
    <div>
      <img
        src="https://cdn.discordapp.com/attachments/1112292984747204731/1143184403984568352/daforcez_logo_for_an_app_use_2_colors_only_use_ED7277_and_EAD2C_bea522cc-368c-4148-9da9-70dc115440f9.png"
        alt="" class="w-25" style="mix-blend-mode: screen;">
      <h3>Start using Dinelemma today</h3>
      <h3>Decide on where to eat immediately</h3>
    </div>
    <SignupForm class="form" />
    <div>
      <h4>Already have an account?</h4>
      <router-link to="/signin" class="col">
        <ButtonPrimary text="Log in" />
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from '@/components/SignupForm.vue'
import ButtonPrimary from '@/components/Shared/ButtonPrimary.vue';

export default {
  name: 'SignupView',
  components: {
    SignupForm,
    ButtonPrimary
  }
}
</script>

<style scoped lang="scss">
.signup {
  img {
    width: 50%
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.form {
  margin: 32px 0px;
}

h3 {
  margin-bottom: 12px
}

a {
  text-decoration: none;
}
</style>
