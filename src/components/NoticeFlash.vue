<template>
  <div class="alert alert-warning alert-dismissible fade show m-1" role="alert">
    {{ notice }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="dismissNotice">
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
