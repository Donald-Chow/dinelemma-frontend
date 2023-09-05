<template>
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
  <h2>History</h2>
  <div v-for="vote_session in history" :key="'vote_session' + vote_session.id">
    <router-link :to="{ name: 'VoteSessionDetail', params: { id: vote_session.id } }">
      <h3>
        {{ vote_session.name }}
      </h3>
    </router-link>

    <h3>
      {{ vote_session.restaurant?.name }}
    </h3>
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
      lists: [],
      history: [],
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
        if (response.data.active_session) {
          this.$router.push({ name: 'VoteSessionDetail', params: { id: response.data.active_session.id } });
        }

        console.log(response);
        this.group = response.data.group;
        this.members = response.data.members
        this.lists = response.data.lists
        this.history = response.data.history
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
