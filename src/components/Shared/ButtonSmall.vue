<template>
  <div>
    <button class="btn-primary">
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonPrimary',
  props: ['text']
}
</script>

<style scoped lang="scss">
.btn-primary {
  background-color: $primary;
  color: $white;
  border-radius: 50px;
  height: 36px;
  width: 200px;
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  border: none;
  margin: 12px;

  transition: background-color .15s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    background-color: $primary-darken
  }
}
</style>
