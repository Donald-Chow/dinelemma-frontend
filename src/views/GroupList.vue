<template>
  <div class="d-flex mt-3 justify-content-between">
    <h1>
      My Groups
    </h1>
    <div class="search-bar-wrapper">
      <form class="search-bar" @submit.prevent="filterGroups">
        <input class="search-bar" type="text" placeholder="Search" v-model="searchInput" @input="filterGroups">
      </form>
      <button type="button" @click.prevent="toggleNewGroup">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  </div>
  <div>
    <div v-for="group in showGroups" :key="group.id">
      <GroupCard :group="group" />
    </div>
  </div>

  <!-- Modal -->
  <GroupForm :users="users" @notice="emitNotice" v-if="showForm" @closeForm="toggleNewGroup" />
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
      showGroups: [],
      users: [],
      showForm: false,
      searchInput: ""
    }
  },
  components: {
    GroupCard,
    GroupForm
  },
  emits: ['alert', 'notice'],
  created() {
    this.getGroups();
  },
  methods: {
    async getGroups() {
      try {
        const response = await axios.get('groups')
        // console.log(response);
        this.groups = response.data.groups
        this.showGroups = this.groups
        this.users = response.data.users
      } catch (error) {
        console.error('An error occurred while fetching groups:', error);
      }
    },
    emitNotice(message) {
      this.$emit('notice', message)
    },
    toggleNewGroup() {
      this.showForm = !this.showForm
    },
    filterGroups() {
      if (this.searchInput == "") {
        this.showGroups = this.groups
      } else {
        this.showGroups = this.groups.filter((group) => {
          return group.name.toLowerCase().includes(this.searchInput.toLowerCase())
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search-bar-wrapper {
  display: flex;
  justify-content: space-between;

  .search-bar {
    flex-grow: 1;
    margin-right: 16px;

    input {
      border: none;
      background-color: $light-gray;
      box-shadow: 1px solid black;
      flex-grow: 1;
      border-radius: 4px;
      padding: 6px;
      width: 100%;
    }
  }
}
</style>
