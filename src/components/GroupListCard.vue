<template>
  <div class="group-card">
    <router-link :to="{ name: 'GroupDetails', params: { id: group.id } }">
      <h3>
        {{ group.name }}
      </h3>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'GroupCard',
  props: ['group']
}
</script>

<style scoped lang="scss">
.group-card {
  height: 50px;
  border-bottom: 1px solid $main1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
