<template>
  <router-link :to="{ name: 'GroupDetails', params: { id: group.id } }">
    <div class="group-card">
      <h3>
        {{ group.name }}
      </h3>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'GroupCard',
  props: ['group']
}
</script>

<style scoped lang="scss">
.group-card {
  height: 48px;
  border-bottom: 1px solid $primary;
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    color: $text-primary;
    text-decoration: none;
  }
}
</style>
