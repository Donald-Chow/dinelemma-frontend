<template>
  <div class="dashboard">
    <h1>This is the dashboard</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardView',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
