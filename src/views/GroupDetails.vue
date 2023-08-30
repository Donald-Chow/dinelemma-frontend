<template>
  <div v-if="activeSession">
    <h1>There is an active session</h1>
    <div>{{ activeSession }}</div>
  </div>

  <div v-if="!activeSession">
    <div>

      <h1>Group</h1>
      <h2>name: {{ group.name }}</h2>
    </div>

    <div>
      <h2>Start a Session</h2>
      <form @submit.prevent="createSession">
        <label for="restaurantList" class="form-label">Select a List:</label>
        <select v-model="selectedList" id="restaurantList" class="form-select mb-3" required>
          <option value="" disabled>Select an option</option>
          <option v-for="list in lists" :key="list.id" :value="list.id">
            {{ list.name }}
          </option>
        </select>
        <div>
          <button type="submit" class="btn btn-primary btn-lg">START A SESSION</button>
        </div>
      </form>
    </div>

    <h2>Members</h2>
    <div v-for="member in members" :key="'member' + member.id">
      <h3>
        {{ member.name }}
      </h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GroupDetails',
  props: ['id'],
  data() {
    return {
      group: {},
      members: [],
      activeSession: {},
      lists: [],
      selectedList: ''
    }
  },
  mounted() {
    this.fetchGroupDetails();
  },
  methods: {
    async fetchGroupDetails() {
      try {
        const response = await axios.get(`groups/${this.id}`);
        this.group = response.data.group;
        this.members = response.data.members
        this.activeSession = response.data.active_session
        this.lists = response.data.lists
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    },
    async createSession() {
      const data = {
        group_id: this.id,
        restaurant_list_id: this.selectedList
      };
      console.log(data);
      try {
        const response = await axios.post('vote_sessions', data);
        console.log('Session created:', response.data);
        console.log(response.data.active_session)
        this.activeSession = response.data.active_session
      } catch (error) {
        console.error('Error creating group:', error);
      }
    }
  }
}

</script>
