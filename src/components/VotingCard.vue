<template>
  <div class="voting-card carousel slide" data-bs-ride="false">

    <div class="carousel-indicators">
      <button v-for="(photo, index) in vote.restaurant.photos.slice(0, 5)" :key="index" type="button"
        :class="{ 'active': index === activePhotoIndex }" :aria-current="{ 'true': index === activePhotoIndex }"
        :aria-label="'Slide ' + index" @click="setPhoto(index)"></button>
    </div>

    <div class="carousel-inner">
      <div v-for="(photo, index) in vote.restaurant.photos.slice(0, 5)" :key="index"
        :class="['carousel-item', { 'active': index === activePhotoIndex }]">
        <!-- <img
          :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photo_reference=' + photo.photo_reference + '&key=' + googleApiKey"
          class="d-block w-100"> -->
        <img :src="photos[0].getUrl({ maxWidth: 1080, maxHeight: 1080 })" alt="">

        <div class="img-filter"></div>
        <div class="carousel-caption d-md-block">
          <h5>{{ vote.restaurant.name }}</h5>
          <p v-if="vote.restaurant.category">Category: {{ vote.restaurant.category }}</p>
          <p class="m-0 text-start">Rating: {{ vote.restaurant.rating }} <span
              v-for="index in Math.floor(vote.restaurant.rating)" :key="index"><i
                class="fa-solid fa-star"></i></span><span
              v-if="(vote.restaurant.rating - Math.floor(vote.restaurant.rating)) >= 0.5"><i
                class="fa-solid fa-star-half-stroke"></i></span><span
              v-for="index in (5 - Math.round(vote.restaurant.rating))" :key="index"><i
                class="fa-regular fa-star"></i></span>({{ vote.restaurant.user_ratings_total }})</p>
          <p class="m-0 text-start">{{ vote.restaurant.types[0] }} <span v-if="vote.restaurant.price_level">- </span><span
              v-for="index in vote.restaurant.price_level" :key="index"><i class="fa-solid fa-yen-sign"></i></span>
          </p>
        </div>
      </div>

    </div>

    <div>
      <button class="carousel-control-prev" type="button" @click="prev">
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" @click="prev">
        <span class="visually-hidden">Next</span>
      </button>

      <div class="voting-bar">
        <button class='btn btn-lg btn-outline-danger' @click.prevent="handleVote(1)">NO</button>
        <button class='btn btn-lg btn-outline-warning' @click.prevent="handleVote(2)">Super</button>
        <button class='btn btn-lg btn-outline-success' @click.prevent="handleVote(0)">Yes</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'VotingCard',
  props: {
    vote: {}
  },
  data() {
    return {
      // googleApiKey: process.env.VUE_APP_GOOGLE_API_KEY,
      activePhotoIndex: 0
    }
  },
  methods: {
    async handleVote(result) {
      try {
        const response = await axios.patch(`votes/${this.vote.id}`, {
          vote: {
            result: result
          }
        })
        console.log('Vote success:', response);
        this.$emit('remove-vote', this.vote)
        document.getElementById(`voting-card${this.vote.id}`).classList.add('fade-out')
      } catch (error) {
        console.error(error)
      }
    },
    prev() {
      if (this.activePhotoIndex === 0) {
        this.activePhotoIndex = 4
      } else {
        this.activePhotoIndex--
      }
    },
    next() {
      if (this.activePhotoIndex === 4) {
        this.activePhotoIndex = 0
      } else {
        this.activePhotoIndex++
      }
    },
    setPhoto(index) {
      this.activePhotoIndex = index
    }
  }
}
</script>

<style scoped lang="scss">
.fade-out {
  animation: fadeinout 1s linear forwards;
}

.voting-bar {
  display: flex;
  justify-content: space-around;
  position: absolute;
  width: 100%;
  bottom: 16px;
}

.carousel-indicators {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 0;
  margin-bottom: 1rem;
  top: 0;
  margin-right: 8px;
  margin-left: 8px;
  height: fit-content;

  button {
    flex: 1 !important;
    box-sizing: content-box;
    width: 30px;
    height: 3px;
    padding: 0;
    margin-right: 3px;
    margin-left: 3px;
    text-indent: -999px;
    cursor: pointer;
    background-color: #FCF1F2;
    background-clip: padding-box;
    border: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.5;
    transition: opacity 0.6s ease;
  }
}

.carousel-control-prev {
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // z-index: 1;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // padding: 0;
  // color: #FCF1F2;
  // text-align: center;
  // background: none;
  // border: 0;
  // opacity: 0.5;
  // transition: opacity 0.15s ease;
  width: 50%;
  height: 75%;
}

.carousel-control-next {
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // z-index: 1;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // padding: 0;
  // color: #FCF1F2;
  // text-align: center;
  // background: none;
  // border: 0;
  // opacity: 0.5;
  // transition: opacity 0.15s ease;
  width: 50%;
  height: 75%;
}


.carousel-item {
  height: 80vh;
  position: relative;
  display: none;
  float: left;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
  transition: transform 0.6s ease-in-out;

  &+.active {
    display: block
  }

  .img-filter {
    position: absolute;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    height: 50%;
    width: 100%;
    bottom: 0;
    left: 0;
  }

  img {
    height: 100%;
    object-fit: cover;
  }
}

.carousel-caption {
  position: absolute;
  right: 32px;
  bottom: 88px;
  left: 16px;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  color: #FCF1F2;
  text-align: start;
}

@keyframes fadeinout {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    display: none;
  }
}
</style>
