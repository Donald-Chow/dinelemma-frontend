<template>
  <h1>SEARCH</h1>
  <form @submit.prevent="handleSearch" class="mb-3">
    <input type="text" v-model="query" class="rounded">
    <button type="submit" class="rounded">Search</button>
  </form>
  <RestaurantCard v-for="restaurant in  results " :key="restaurant.place_id" :restaurant="restaurant" :lists="lists"
    @notice="emitNotice" />
</template>

<script >
import axios from 'axios'
import googleMapsApi from '@/google-map-api';
import RestaurantCard from '@/components/RestaurantCard.vue';

export default {
  name: 'ExploreRestaurant',
  data() {
    return {
      query: '',
      results: [],
      lists: []
    }
  },
  mounted() {
    this.fetchLists()
  },
  components: {
    RestaurantCard
  },
  emits: ['alert', 'notice'],
  methods: {
    async handleSearch() {
      console.log("searching");
      const response = await googleMapsApi.get('', {
        params: {
          query: this.query,
        },
      })
      this.results = response.data.results
    },
    async fetchLists() {
      const response = await axios.get('restaurant_lists')
      this.lists = response.data.lists
    },
    emitNotice(message) {
      this.$emit('notice', message)
    }
  }
}
</script>
