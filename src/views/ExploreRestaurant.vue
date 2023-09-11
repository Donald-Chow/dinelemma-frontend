<template>
  <h1>SEARCH</h1>
  <form @submit.prevent="handleSearch" class="mb-3">
    <input type="text" v-model="query" class="rounded">
    <button type="submit" class="rounded">Search</button>
  </form>
  <RestaurantCard v-for="restaurant in  results " :key="restaurant.place_id" :restaurant="restaurant" :lists="lists"
    @notice="emitNotice" />
  <div id="google"></div>
</template>

<script >
import axios from 'axios'
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
      const request = {
        query: this.query,
        fields: ['name', 'formatted_address', 'photos', 'rating', 'user_ratings_total', 'price_level', 'types', 'place_id']
      }
      // eslint-disable-next-line no-undef
      const placesService = new google.maps.places.PlacesService(document.getElementById('google'))

      placesService.textSearch(request, (results, status) => {
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
          this.results = results
        } else {
          console.error('Places search failed with status:', status);
        }
      })
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
