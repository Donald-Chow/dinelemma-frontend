<template>
  <div>
    <h1>Voting Session {{ session.id }}</h1>
  </div>

  <div v-if="!session.restaurant_id">
    <div class="vote-wrapper">
      <VotingCard class="vote-card" v-for="vote in votes" :key="vote.id" :vote="vote" @remove-vote="removeVote" />
    </div>

    <div v-if="votes.length === 0">
      <h2>Voting Completed!</h2>
    </div>
  </div>

  <div v-if="session.restaurant_id">
    <router-link :to="{ name: 'GroupDetails', params: { id: session.group_id } }">
      <div class="btn btn-warning">BACK</div>
    </router-link>
    <h3>Chosen Restaurant: <strong>{{ restaurant.name }}</strong></h3>
    <img
      :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photo_reference=' + restaurant.photos[0].photo_reference + '&key=' + googleApiKey"
      class="d-block w-100" v-if="restaurant.photos.length != 0">
    <img
      :src="'https://source.unsplash.com/featured/?' + restaurant.category + '&food&' + Math.floor(Math.random() * 1000)"
      alt="" class="w-100" v-else>
    <!-- <img :src="restaurant.photos[0].getUrl({ maxWidth: 1080, maxHeight: 1080 })" alt=""> -->
  </div>
</template>

<script>
import axios from 'axios';
import VotingCard from '@/components/VotingCard.vue';
import { createConsumer } from '@rails/actioncable';

export default {
  name: 'VotingSession',
  props: ['id'],
  components: {
    VotingCard
  },
  data() {
    return {
      session: {},
      restaurant: {},
      votes: [],
      googleApiKey: process.env.VUE_APP_GOOGLE_API_KEY
    }
  },
  async mounted() {
    await this.getSession();
    // this.getVotes()
    this.subscribeToChannel();
  },
  methods: {
    async getSession() {
      try {
        const response = await axios.get(`vote_sessions/${this.id}`)
        this.session = response.data.vote_session
        if (this.session.restaurant) {
          this.restaurant = this.session.restaurant
        }
        this.votes = response.data.votes
        console.log(this.votes);
      } catch (error) {
        console.error('An error occurred while fetching session:', error);
      }
    },
    async subscribeToChannel() {
      if (!this.session.restaurant) {
        const url = process.env.NODE_ENV === 'production'
          ? 'wss://dinelemma-backend-8c6da2f0be62.herokuapp.com/cable'
          : 'ws://localhost:3000/cable';
        const cable = createConsumer(url)
        cable.subscriptions.create(
          { channel: "VoteSessionChannel", id: this.session.id },
          {
            received: (data) => {
              console.log(data);
              if (data.message === "Vote Concluded") {
                // trigger animation
                // remove all votes
                this.votes = []
                // update page
                this.session = data.vote_session
                this.restaurant = data.vote_session.restaurant
              }
            },
            connected: () => { console.log(`Subscribed to the voteSession with the id ${this.session.id}.`) },
            disconnected: () => {
              console.log('WebSocket disconnected');
            }
          }
        )
      }
    },
    removeVote(voteToRemove) {
      const index = this.votes.findIndex(vote => vote.id === voteToRemove.id);

      if (index !== -1) {
        // Remove the vote from the array
        this.votes.splice(index, 1);
      }
    },
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
