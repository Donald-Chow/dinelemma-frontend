<template>
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="newGroupFormLabel">Create a group</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent="submitForm">

      <div class="modal-body">

        <div class="mb-3">
          <label for="name" class="form-label" required>Group Name</label>
          <input type="text" class="form-control" id="name" v-model="groupName" aria-describedby="inputGroupPrepend2"
            required>
        </div>

        <div class="form-check form-check-reverse" v-for="user in users" :key="user.id">
          <input class="form-check-input" type="checkbox" v-model="selectedUsers" :value="user.id"
            :id="'userCheckbox' + user.id">
          <label class="form-check-label" :for="'userCheckbox' + user.id">
            {{ user.name }}
          </label>
        </div>
      </div>

      <div class="modal-footer">
        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> -->
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GroupForm',
  props: ['users'],
  data() {
    return {
      groupName: '',
      selectedUsers: []
    }
  },
  methods: {
    async submitForm() {
      const groupData = {
        name: this.groupName,
        selectedUsers: this.selectedUsers // Include selected user IDs
      };
      try {
        const response = await axios.post('groups', groupData);
        console.log('Group created:', response.data);
      } catch (error) {
        console.error('Error creating group:', error);
      }
    }
  }
}
</script>
