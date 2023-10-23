<template>
  <div class="heading">
    <h1><i class="fa-solid fa-users"></i> {{ group.name }}</h1>
  </div>

  <ButtonPrimary text="Start a Session" @click="toggleNewSession"></ButtonPrimary>
  <!-- <div class="card" v-if="sessionFormShow">
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
  </div> -->
  <div style="margin-top:16px;" class="border-bottom"></div>
  <div class="category" @click="toggleMemberExpand">
    <h4>Members ({{ members.length }})</h4>
    <p v-if="memberExpand"><i class="fa-solid fa-angle-down"></i></p>
    <p v-else><i class="fa-solid fa-angle-left"></i></p>
  </div>
  <div v-if="memberExpand" class="border-bottom">
    <div v-for="member in members " :key="'member' + member.id" class="info">
      <h4>
        <i class="fa-solid fa-circle-user"></i> {{ member.username }}
      </h4>
    </div>
  </div>
  <div class="category" @click="toggleHistoryExpand">
    <h4>Vote History</h4>
    <p v-if="historyExpand"><i class="fa-solid fa-angle-down"></i></p>
    <p v-else><i class="fa-solid fa-angle-left"></i></p>
  </div>
  <div v-if="historyExpand" class="border-bottom">
    <div v-for="vote_session in history" :key="'vote_session' + vote_session.id" class="info">
      <router-link :to="{ name: 'VoteSessionDetail', params: { id: vote_session.id } }">
        <h4>
          <i class="fa-solid fa-utensils"></i> {{ vote_session.name }}
        </h4>
      </router-link>

      <h4>
        {{ vote_session.restaurant?.name }}
      </h4>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { createConsumer } from '@rails/actioncable'
import ButtonPrimary from '@/components/Shared/ButtonPrimary.vue'

export default {
  name: 'GroupDetails',
  props: ['id'],
  data() {
    return {
      group: {},
      members: [],
      lists: [],
      history: [],
      selectedList: '',
      memberExpand: false,
      historyExpand: false,
      sessionFormShow: false,
      channel: null
    }
  },
  components: {
    ButtonPrimary
  },
  async mounted() {
    await this.fetchGroupDetails();
    this.subscribeToChannel();
  },
  beforeRouteLeave() {
    if (this.channel) {
      console.log("Trigger Route Leave");
      this.channel.unsubscribe()
    }
  },
  methods: {
    async fetchGroupDetails() {
      try {
        const response = await axios.get(`groups/${this.id}`);
        if (response.data.active_session) {
          this.$router.push({ name: 'VoteSessionDetail', params: { id: response.data.active_session.id } });
        }
        this.group = response.data.group;
        this.members = response.data.members
        this.lists = response.data.lists
        this.history = response.data.history
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    },
    async subscribeToChannel() {
      const url = process.env.NODE_ENV === 'production'
        ? 'wss://dinelemma-backend-8c6da2f0be62.herokuapp.com/cable'
        : 'ws://localhost:3000/cable';
      const cable = createConsumer(url)
      this.channel = cable.subscriptions.create(
        { channel: "GroupChannel", id: this.group.id },
        {
          received: (data) => {
            if (data.message === "Session Started")
              // start animation
              this.$router.push({ name: 'VoteSessionDetail', params: { id: data.vote_session.id } });
          },
          connected: () => { console.log(`Subscribed to the Group with the id ${this.group.id}.`) },
          disconnected: () => {
            console.log('WebSocket disconnected');
          }
        }
      )
    },
    async createSession() {
      const data = {
        group_id: this.id,
        restaurant_list_id: this.selectedList
      };
      try {
        const response = await axios.post('vote_sessions', data);
        this.activeSession = response.data.active_session
      } catch (error) {
        console.error('Error creating group:', error);
      }
    },
    toggleMemberExpand() {
      this.memberExpand = !this.memberExpand
    },
    toggleHistoryExpand() {
      this.historyExpand = !this.historyExpand
    },
    toggleNewSession() {
      this.sessionFormShow = !this.sessionFormShow
    }
  }
}

</script>

<style scoped lang="scss">
.heading {
  margin: 16px;
}

.category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px $light-gray;
}

.border-bottom {
  border-bottom: solid 1px $light-gray;
}

.info {
  text-align: start;
  margin: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h4 {
  margin: 8px 0px;
}

p {
  margin: 8px 4px;
}
</style>
