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
import { createConsumer } from '@rails/actioncable';

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
    this.subscribeToChannel
  },
  watch: {
    activeSession: {
      handler: function () {
        this.getVotes();
        this.subscribeToChannel();
      },
      immediate: true
    },
  },
  methods: {
    async subscribeToChannel() {
      if (this.activeSession.id) {

        const cable = createConsumer('ws://localhost:3000/cable')
        cable.subscriptions.create(
          { channel: "VoteSessionChannel", id: this.activeSession.id },
          {
            received: (data) => {
              console.log(data);
            },
            connected: () => { console.log(`Subscribed to the voteSession with the id ${this.activeSession.id}.`) },
            disconnected: () => {
              console.log('WebSocket disconnected');
            }
          }
        )
      }
    },
    async getVotes() {
      if (this.activeSession.id) {

        try {
          if (this.activeSession) {
            const response = await axios.get(`vote_sessions/${this.activeSession.id}`)
            this.votes = response.data.votes
          }
        } catch (error) {
          console.error('An error occurred while fetching votes:', error);
        }
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
