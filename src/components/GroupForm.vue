<template>
  <!-- <div class="modal-background" @click="emitCloseForm"> -->
  <div class="modal-background">
    <div class="modal-content">
      <button type="button" @click="emitCloseForm"> X </button>
      <div class="modal-header">
        <h1>Create a group</h1>
      </div>

      <form @submit.prevent="submitForm">

        <div class="modal-body">

          <div>
            <label for="name" class="form-label" required>
              <h3>Group Name</h3>
            </label>
            <input type="text" class="form-control" id="name" v-model="groupName" aria-describedby="inputGroupPrepend2"
              required>
          </div>

          <div class="user-list" v-for="user in users" :key="user.id">
            <div class="user-list-user">
              <input type="checkbox" v-model="selectedUsers" :value="user.id" :id="'userCheckbox' + user.id">
              <label :for="'userCheckbox' + user.id">
                <i class="fa-solid fa-user-tie"></i> {{ user.username }}
                <div class="dot"></div>
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
        // const newGroupModal = new bootstrap.Modal(this.$refs.newGroupModal, { backdrop: false })
        // newGroupModal.hide()
        const backdrops = document.querySelectorAll('.modal-backdrop');
        if (backdrops) {
          backdrops.forEach(backdrop => { backdrop.remove(); })
        }
        this.$emit('notice', "Group Created")
        this.$router.push({ name: 'GroupDetails', params: { id: response.data.group.id } });
      } catch (error) {
        console.error('Error creating group:', error);
      }
    },
    emitCloseForm() {
      this.$emit('closeForm')
    }
  }
}
</script>

<style scoped lang="scss">
.modal-background {
  height: 100vh;
  width: 100vw;
  background-color: rgb(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-content {
  // background-color: purple;
  background-color: $gray;

  margin: 16px;
  border-radius: 8px;

  .modal-header {
    // background-color: green;
  }

  .modal-body {
    // background-color: blue;
  }

  .modal-footer {
    // background-color: pink;
  }
}

.user-list {
  height: 48px;
  background-color: $light-gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 18px;
  padding: 0px 8px 0px 8px;
  border-bottom: 1px solid $primary;
  color: $text-primary;

  .user-list-user {
    // padding: 32px;
    width: 100%;
    height: 100%;

    label {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .dot {
      display: inline-block;
      border-radius: 50%;
      background-color: $white;
      border: solid 1px $gray;
      width: 24px;
      height: 24px;
      transition: 0.2s;
    }

    input {
      display: none;
    }

    input[type="checkbox"]:checked+label {

      // background-color: red;
      .dot {
        background-color: $green;

        &::before {
          content: "✔";
        }
      }
    }
  }
}
</style>
