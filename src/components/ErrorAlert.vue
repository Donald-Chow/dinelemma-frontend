<template>
  <div class="error-alert" role="alert">{{ error }}</div>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: ['error']
}
</script>

<style scoped lang="scss">
.error-alert {
  color: $red;
  font-size: 12px;
}
</style>
