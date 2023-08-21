<template>
  <div class="signin">

    <div class="row">
      <div class="col-6 d-flex flex-column justify-content-around">
        <img
          src="https://cdn.discordapp.com/attachments/1112292984747204731/1143184403984568352/daforcez_logo_for_an_app_use_2_colors_only_use_ED7277_and_EAD2C_bea522cc-368c-4148-9da9-70dc115440f9.png"
          alt="" class="w-100" style="mix-blend-mode: screen;">
        <h4>Can decide where to eat? Let Dinelemma solve your Dilemma.</h4>
      </div>
      <SigninForm />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SigninForm from '@/components/SigninForm.vue'

export default {
  name: 'SigninView',
  components: {
    SigninForm
  }
}
</script>

<style>
</style>
