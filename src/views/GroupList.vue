<template>
  <div class="d-flex mt-3 justify-content-between">
    <h1>
      My Groups
    </h1>
    <!-- Button trigger modal -->
    <div>
      <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#newGroupForm">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  </div>
  <div>
    <div style="border-bottom: 1px solid pink;background-color: gray;">
      This Is Search bar
    </div>
    <div v-for="group in groups" :key="group.id">
      <GroupCard :group="group" />
    </div>
  </div>

  <!-- Modal -->
  <GroupForm :users="users" @notice="emitNotice" />
</template>

<script>
import axios from 'axios'
import GroupCard from '@/components/GroupListCard.vue'
import GroupForm from '@/components/GroupForm.vue'

export default {
  name: 'GroupList',
  data() {
    return {
      groups: [],
      users: []
    }
  },
  components: {
    GroupCard,
    GroupForm
  },
  created() {
    this.getGroups();
  },
  methods: {
    async getGroups() {
      try {
        const response = await axios.get('groups')
        // console.log(response);
        this.groups = response.data.groups
        this.users = response.data.users
      } catch (error) {
        console.error('An error occurred while fetching groups:', error);
      }
    },
    emitNotice(message) {
      this.$emit('notice', message)
    }
  }
}
</script>
