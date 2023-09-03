<template>
  <div>
    <h1>Voting Session</h1>
    <h3>{{ activeSession }}</h3>
  </div>
  <div v-for="vote in votes" :key="vote.id">
    {{ vote.restaurant.name }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VotingSession',
  props: ['activeSession'],
  data() {
    return {
      votes: []
    }
  },
  mounted() {
    this.getVotes()
  }, watch: {
    activeSession: 'getVotes'
  },
  methods: {
    async getVotes() {
      try {
        if (this.activeSession) {
          console.log(this.activeSession.id);
          const response = await axios.get(`vote_sessions/${this.activeSession.id}`)
          console.log(response);
          this.votes = response.data.votes
        }
      } catch (error) {
        console.error('An error occurred while fetching votes:', error);
      }
    }
  }
}
</script>
