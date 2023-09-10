<template>
  <div class="restaurant-card">
    <!-- <img
      :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + restaurant.photos[0].photo_reference + '&key=' + googleApiKey"
      alt="" v-if="restaurant.photos"> -->
    <img :src="restaurant.photos[0].getUrl({ maxWidth: 1080, maxHeight: 1080 })" alt="" v-if="restaurant.photos">
    <img :src="'https://source.unsplash.com/featured/?' + restaurant.name + Math.floor(Math.random() * 1000)" alt=""
      v-if="!restaurant.photos">
    <div class="d-flex justify-content-between mb-3">
      <div class="flex-grow-1 me-2">
        <h4 class="m-0 text-start">{{ restaurant.name }}</h4>
        <p class="m-0 text-start">Rating: {{ restaurant.rating }} <span v-for=" index  in  Math.floor(restaurant.rating) "
            :key="index"><i class="fa-solid fa-star"></i></span><span
            v-if="(restaurant.rating - Math.floor(restaurant.rating)) >= 0.5"><i
              class="fa-solid fa-star-half-stroke"></i></span><span
            v-for=" index  in  (5 - Math.round(restaurant.rating)) " :key="index"><i
              class="fa-regular fa-star"></i></span>({{ restaurant.user_ratings_total }})</p>
        <p class="m-0 text-start">{{ category }} <span v-if="restaurant.price_level">- </span><span
            v-for=" index  in  restaurant.price_level " :key="index"><i class="fa-solid fa-yen-sign"></i></span>
        </p>
      </div>
      <div v-if="listShow" class="restaurant-list">
        <RestaurantList :restaurant="restaurant" :lists="lists" @closeList="listShow = false" @notice="emitNotice" />
      </div>
      <div>
        <button class="btn btn-primary" @click="this.listShow = !this.listShow">+</button>
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantList from './RestaurantList.vue';

export default {
  name: 'RestaurantCard',
  props: ['restaurant', 'lists'],
  components: { RestaurantList },
  data() {
    return {
      // googleApiKey: process.env.VUE_APP_GOOGLE_API_KEY,
      category: this.restaurant.types[0].charAt(0).toUpperCase() + this.restaurant.types[0].slice(1),
      listShow: false
    };
  },
  methods: {
    emitNotice(message) {
      this.$emit('notice', message)
    }
  }
}
</script>

<style scoped lang="scss" >
.restaurant-card {
  background-color: $main4;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
  position: relative;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 300px;
    object-position: center;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
  }

  .restaurant-list {
    position: absolute;
    top: 360px;
    right: 10px;
    background-color: white;
    padding: 8px;
    width: 250px;
    max-height: 400px;
    overflow-y: scroll;
    z-index: 1;
  }
}
</style>
