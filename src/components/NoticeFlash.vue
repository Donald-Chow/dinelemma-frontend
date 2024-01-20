<template>
  <div class="alert alert-warning alert-dismissible fade show m-1" role="alert">
    {{ notice }}
    <button @click="dismissNotice">
      X
    </button>
  </div>
</template>

<script>
export default {
  name: 'NoticeFlash',
  props: ['notice'],
  methods: {
    dismissNotice() {
      this.$emit('dismissNotice');
    },
  },
}
</script>

<style scoped lang="scss">
.alert {
  background-color: $yellow;
  padding: 8px;
  border-radius: 6px;
  color: $white;

  button {
    background: none;
    border: none
  }
}
</style>
