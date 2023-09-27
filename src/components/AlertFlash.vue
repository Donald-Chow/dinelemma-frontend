<template>
  <div class="alert">
    {{ alert }}
    <button @click="dismissAlert">
      X</button>
  </div>
</template>

<script>
export default {
  name: 'AlertFlash',
  props: ['alert'],
  methods: {
    dismissAlert() {
      this.$emit('dismissAlert');
    },
  },
}
</script>

<style scoped lang="scss">
.alert {
  background-color: $red;
  padding: 8px;
  border-radius: 6px;
  color: $white;

  button {
    background: none;
    border: none
  }
}
</style>
