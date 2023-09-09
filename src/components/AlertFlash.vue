<template>
  <div class="alert alert-danger alert-dismissible fade show m-1" role="alert">
    {{ alert }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="dismissNotice">
    </button>
  </div>
</template>

<script>
export default {
  name: 'AlertFlash',
  props: ['alert'],
  methods: {
    dismissNotice() {
      this.$emit('dismissAlert');
    },
  },
}
</script>
