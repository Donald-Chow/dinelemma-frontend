<template>
  <form class="signup-form" @click.prevent="handleSubmit">
    <h2>Sign up now!</h2>
    <h3>No credit card required!.</h3>
    <div class="form-input">
      <label for="email">Your email</label>
      <input type="email" name="email" v-model="email" :class="{ invalid }">
    </div>
    <div class="form-input">
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password" :class="{ invalid }">
    </div>
    <ErrorAlert v-if="error" :error="error" />
    <p>By creating an account, you agree to the Dinelemma Privacy Policy and Terms of Service.</p>
    <div class="form-button">
      <ButtonPrimary type="submit" text="Start Now" />
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import ErrorAlert from './ErrorAlert.vue'
import ButtonPrimary from './Shared/ButtonPrimary.vue'

export default {
  name: 'SignupForm',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      invalid: false
    }
  },
  components: {
    ErrorAlert,
    ButtonPrimary
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('users', {
          user: {
            email: this.email,
            password: this.password
          }
        });
        console.log(response);
        localStorage.setItem('Authorization', response.headers.authorization);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');

        this.$router.push('/');
      } catch (error) {
        this.error = "Something went wrong while registering"
        this.invalid = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signup-form {
  .form-input {
    width: 100%;

    input {
      border: 0px;
      border-bottom: 1px solid $gray;
      width: 100%;
      color: inherit;
      background-color: inherit;
      padding: 2px 2px;
      font-size: 18px;

      &:focus {
        outline-color: $primary;
      }

      &.invalid {
        border-bottom: 1px solid $red;
      }
    }

    label {
      text-align: start;
      font-size: 12px;
      color: $medium-gray;

    }
  }
}

p {
  text-align: center;
}

h3 {
  margin-bottom: 12px;
}
</style>
