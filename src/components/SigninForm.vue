<template>
  <form @submit.prevent="handleSubmit" class="signin-form">
    <h2>Login</h2>
    <div class="form-input">
      <label for="email" style="text-align: start;"> Your email</label><br>
      <input name="email" type="email" v-model="email" :class="{ invalid }">
    </div>
    <div class="form-input">
      <label for="password">Password</label><br>
      <input name="password" type="password" v-model="password" :class="{ invalid }">
    </div>
    <ErrorAlert v-if="error" :error="error" />
    <div class="form-button">
      <ButtonPrimary type="submit" text="Submit" />
    </div>
    <div class="center">
      <a href="" aria-disabled="true">Forgot Password?</a>
      <!-- <router-link to="/forget">Forgot Password?</router-link> -->
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import ErrorAlert from './ErrorAlert.vue'
import ButtonPrimary from '@/components/Shared/ButtonPrimary.vue'

export default {
  name: 'SigninForm',
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
        await localStorage.removeItem('Authorization')
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');

        const response = await axios.post('users/sign_in', {
          user: {
            email: this.email,
            password: this.password
          }
        });
        // store jwt in localStorage
        await localStorage.setItem('Authorization', response.headers.authorization);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        // save current_user information in state
        this.$store.dispatch('user', response.data.status.data.user);
        // await this.storeCurrentUser();

        // redirect to home page as logged in user
        await this.$router.push('/');

      } catch (error) {
        console.error('An error occurred while logging in:', error)
        this.error = 'Invalid username/password'
        this.invalid = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signin-form {
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

  .form-button {
    margin: 8px 0px;
  }
}

.center {
  text-align: center;
}

a {
  color: $primary;
  font-size: 12px;
}

h2 {
  text-align: start;
  margin-bottom: 24px;
}
</style>
