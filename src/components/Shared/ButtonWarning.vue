<template>
  <div>
    <button class="btn-warning">
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonWarning',
  props: ['text']
}
</script>

<style scoped lang="scss">
.btn-warning {
  background-color: $red;
  color: $white;
  border-radius: 50px;
  height: 48px;
  width: 270px;
  text-align: center;
  font-family: inherit;
  font-size: 18px;
  border: none;

  transition: background-color .15s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    background-color: $primary-darken
  }
}
</style>
