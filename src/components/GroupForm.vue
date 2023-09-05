<template>
  <div class="modal fade" id="newGroupForm" tabindex="-1" aria-labelledby="newGroupFormLabel" aria-hidden="true"
    ref="newGroupModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="newGroupFormLabel">Create a group</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="submitForm">

          <div class="modal-body">

            <div class="mb-3">
              <label for="name" class="form-label" required>
                <h3>Group Name</h3>
              </label>
              <input type="text" class="form-control" id="name" v-model="groupName" aria-describedby="inputGroupPrepend2"
                required>
            </div>

            <div class="user-list" v-for="user in users" :key="user.id">
              <div class="form-check form-check-reverse text-center">
                <input class="form-check-input" type="checkbox" v-model="selectedUsers" :value="user.id"
                  :id="'userCheckbox' + user.id">
                <label class="form-check-label" :for="'userCheckbox' + user.id">
                  <i class="fa-solid fa-user-tie"></i> {{ user.username }}
                </label>
              </div>
            </div>

          </div>

          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> -->
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import bootstrap from 'bootstrap';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

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
        const newGroupModal = new bootstrap.Modal(this.$refs.newGroupModal, { backdrop: false })
        newGroupModal.hide()
        const backdrops = document.querySelectorAll('.modal-backdrop');
        if (backdrops) {
          backdrops.forEach(backdrop => { backdrop.remove(); })
        }
        this.$router.push({ name: 'GroupDetails', params: { id: response.data.group.id } });
      } catch (error) {
        console.error('Error creating group:', error);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.user-list {
  height: 80px;
  background-color: $main2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 18px;
  padding: 0px 8px 0px 8px
}
</style>
