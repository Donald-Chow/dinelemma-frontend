<template>
  <nav>
    <div class="row">
      <h3 class="col text-start">Dinelemma</h3>

      <div class="col">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/signin">Sign In</router-link> |
      </div>
      <div class="col"></div>
    </div>

  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  min-height: 90vh;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $pink3;

    &.router-link-exact-active {
      color: $pink1;
    }
  }
}
</style>
