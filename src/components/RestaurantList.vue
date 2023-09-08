<template>
  <div>
    Restaurant Lists
    <div v-for="restaurant in restaurant_list" :key="'restaurant_' + restaurant.name"
      class="d-flex justify-content-around align-items-center bg-white">
      <div>
        <h2>{{ restaurant.name }}</h2>
        <p>{{ restaurant.address }}</p>
      </div>
      <div class="d-flex flex-column ">
        <div class="btn btn-primary">+</div>
        <div class="btn btn-primary">-</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RestaurantList',
  components: {

  },
  data() {
    return {
      restaurant_list: [{ name: "foo", address: "bar" }, { name: "Hello", address: "world" }],

    }
  }
}
</script>
