<template>
  <div>
    <h1>Voting Session {{ activeSession.id }}</h1>
  </div>

  <div if="votes">
    <div v-for="vote in votes" :key="vote.id" class="vote-wrapper">
      <div class="vote-card">
        <VotingCard :vote="vote" />
      </div>
    </div>
  </div>

  <div if="!votes">
    <h2>Voting Completed!</h2>
  </div>
</template>

<script>
import axios from 'axios';
import VotingCard from '@/components/VotingCard.vue';

export default {
  name: 'VotingSession',
  props: ['activeSession'],
  components: {
    VotingCard
  },
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

<style scoped>
.vote-wrapper {
  position: relative;
}

.vote-card {
  position: absolute;
}
</style>
