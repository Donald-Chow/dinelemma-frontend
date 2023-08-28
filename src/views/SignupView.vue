<template>
  <div class="signup">
    <div class="d-flex justify-content-center py-3">
      <div class="d-flex flex-column justify-content-around">
        <div class="d-flex">
          <img
            src="https://cdn.discordapp.com/attachments/1112292984747204731/1143184403984568352/daforcez_logo_for_an_app_use_2_colors_only_use_ED7277_and_EAD2C_bea522cc-368c-4148-9da9-70dc115440f9.png"
            alt="" class="w-25" style="mix-blend-mode: screen;">
          <h3 class="d-flex flex-column justify-content-end p-3">Start using Dinelemma today</h3>
        </div>
        <h5>Decide on where to eat immediately</h5>
      </div>
    </div>
    <SignupForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from '@/components/SignupForm.vue'

export default {
  name: 'SignupView',
  components: {
    SignupForm
  }
}
</script>

<style>
</style>
