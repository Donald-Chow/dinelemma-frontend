<template>
  <div class="carousel-caption">
    <h5>{{ restaurant.name }}</h5>
    <p v-if="restaurant.category">Category: {{ restaurant.category }}</p>
    <p class="m-0 text-start">Rating: {{ restaurant.rating }} <span v-for="index in Math.floor(restaurant.rating)"
        :key="index"><i class="fa-solid fa-star"></i></span><span
        v-if="(restaurant.rating - Math.floor(restaurant.rating)) >= 0.5"><i
          class="fa-solid fa-star-half-stroke"></i></span><span v-for="index in (5 - Math.round(restaurant.rating))"
        :key="index"><i class="fa-regular fa-star"></i></span>({{ restaurant.user_ratings_total }})</p>
    <p class="m-0 text-start">{{ restaurant.types[0] }} <span v-if="restaurant.price_level">-
      </span><span v-for="index in restaurant.price_level" :key="index"><i class="fa-solid fa-yen-sign"></i></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'VoteCardInfo',
  props: ['restaurant']
}
</script>

<style scoped lang="scss">
.carousel-caption {
  position: absolute;
  // background-color: red;
  display: block !important;
  right: 32px;
  bottom: 50px;
  left: 16px;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  color: #FCF1F2;
  text-align: start;

  h5 {
    font-size: 18px;
    margin: 8px 0px;
  }

  p {
    font-size: 14px;
    margin: 4px 0px;

  }

}
</style>
