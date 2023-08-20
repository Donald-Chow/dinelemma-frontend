<template>
  <div class="signin">
    <h1>This is an Signin Page</h1>
    <SigninForm />
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
