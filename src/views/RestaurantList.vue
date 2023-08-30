<template>
  <div>
    Restaurant Lists
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GroupList',
  components: {

  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
