<template>
  <div class="voting-card">

    <div class="carousel-inner">
      <!-- <div v-if="photosUrls.length != 0">
        <div v-for="(photo, index) in photosUrls" :key="index"
          :class="['carousel-item', { 'active': index === activePhotoIndex }]">
          <img :src="photo" class="d-block w-100" :alt="'photo-slide' + index">
          <div class="img-filter"></div>
          <VoteCardInfo :restaurant="vote.restaurant" />
        </div>
      </div> -->
      <div>
        <!-- v-else -->
        <div class="carousel-item active">
          <img
            :src="'https://source.unsplash.com/featured/?' + vote.restaurant.category + '&' + Math.floor(Math.random() * 1000)">
          <div class="img-filter"></div>
          <VoteCardInfo :restaurant="vote.restaurant" />
        </div>
      </div>
      <!-- <img
            :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photo_reference=' + photo.photo_reference + '&key=' + googleApiKey"
            class="d-block w-100"> -->

      <!-- <div class="carousel-caption d-md-block">
            <h5>{{ vote.restaurant.name }}</h5>
            <p v-if="vote.restaurant.category">Category: {{ vote.restaurant.category }}</p>
            <p class="m-0 text-start">Rating: {{ vote.restaurant.rating }} <span
                v-for="index in Math.floor(vote.restaurant.rating)" :key="index"><i
                  class="fa-solid fa-star"></i></span><span
                v-if="(vote.restaurant.rating - Math.floor(vote.restaurant.rating)) >= 0.5"><i
                  class="fa-solid fa-star-half-stroke"></i></span><span
                v-for="index in (5 - Math.round(vote.restaurant.rating))" :key="index"><i
                  class="fa-regular fa-star"></i></span>({{ vote.restaurant.user_ratings_total }})</p>
            <p class="m-0 text-start">{{ vote.restaurant.types[0] }} <span v-if="vote.restaurant.price_level">-
              </span><span v-for="index in vote.restaurant.price_level" :key="index"><i
                  class="fa-solid fa-yen-sign"></i></span>
            </p>
          </div> -->

    </div>

    <div class="carousel-control">
      <button class="carousel-control-prev" type="button" @click="prev">
        <!-- <span class="visually-hidden">Previous</span> -->
      </button>
      <button class="carousel-control-next" type="button" @click="next">
        <!-- <span class="visually-hidden">Next</span> -->
      </button>

      <div class="voting-bar">
        <button class='btn btn-no' @click.prevent="handleVote(1)">NO</button>
        <button class='btn btn-super' @click.prevent="handleVote(2)">Super</button>
        <button class='btn btn-yes' @click.prevent="handleVote(0)">Yes</button>
      </div>
    </div>

    <div v-if="photosUrls.length != 0" class="carousel-indicators">
      <button v-for="(photo, index) in photosUrls" :key="index" type="button"
        :class="{ 'active': index === activePhotoIndex }" :aria-current="{ 'true': index === activePhotoIndex }"
        :aria-label="'Slide ' + index" @click="setPhoto(index)"></button>
    </div>
    <div v-else class="carousel-indicators">
      <button type="button" class='active' aria-current='true' aria-label='Slide'></button>
    </div>
    <div id="google"></div>
  </div>
</template>

<script>
import axios from 'axios'
import VoteCardInfo from './VoteSession/VoteCardInfo.vue'

export default {
  name: 'VotingCard',
  props: {
    vote: {}
  },
  mounted() {
    this.getPhotosUrls()
  },
  data() {
    return {
      // googleApiKey: process.env.VUE_APP_GOOGLE_API_KEY,
      activePhotoIndex: 0,
      photosUrls: []
    }
  },
  components: {
    VoteCardInfo
  },
  methods: {
    getPhotosUrls() {
      const request = {
        placeId: this.vote.restaurant.place_id,
        fields: ['photo']
      };
      // eslint-disable-next-line no-undef
      const placesService = new google.maps.places.PlacesService(document.getElementById('google'))
      placesService.getDetails(request, (results, status) => {
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (results.photos) {
            console.log(results.photos.slice(0, 5));
            this.photosUrls = results.photos.slice(0, 5).map(photo => {
              return photo.getUrl({ maxWidth: 1080, maxHeight: 1080 })
            })
            console.log(this.photosUrls);
          }
        } else {
          console.error('Places search failed with status:', status);
        }
      });
    },
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
  // z-index: 2;
  display: flex;
  justify-content: center;
  padding: 0;
  margin-bottom: 1rem;
  top: 0;
  margin-right: 8px;
  margin-left: 8px;
  height: fit-content;

  button {
    box-sizing: content-box;
    width: 50px;
    height: 3px;
    padding: 0;
    margin-right: 3px;
    margin-left: 3px;
    // text-indent: -999px;
    cursor: pointer;
    background-color: #FCF1F2;
    background-clip: padding-box;
    border: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.5;
    transition: opacity 0.6s ease;

    &.active {
      opacity: 0.8;

    }
  }
}

.carousel-control {
  // position: relative;

  .carousel-control-prev {
    position: absolute;
    top: 0;
    -moz-border-left-colors: 0;
    // z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: #FCF1F2;
    text-align: center;
    // background: blue;
    border: 0;
    opacity: 0;
    transition: opacity 0.15s ease;
    width: 50%;
    height: 75%;
  }

  .carousel-control-next {
    position: absolute;
    top: 0;
    right: 0;
    // z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: #FCF1F2;
    text-align: center;
    // background: green;
    border: 0;
    opacity: 0;
    transition: opacity 0.15s ease;
    width: 50%;
    height: 75%;
  }
}


.carousel-item {
  height: 80vh;
  position: relative;
  display: none;
  float: left;
  width: 100%;
  // margin-right: -100%;
  // backface-visibility: hidden;
  transition: transform 0.6s ease-in-out;

  &.active {
    display: block
  }

  .img-filter {
    position: absolute;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    height: 50%;
    width: 100%;
    bottom: 0;
    left: 0;
    border-radius: 0px 10px 10px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
}

.active {
  display: block;
}

.btn {
  // letter-spacing: normal;
  // word-spacing: normal;
  // line-height: normal;
  // text-transform: none;
  // text-indent: 0px;
  // text-shadow: none;
  // display: inline-block;
  // text-align: center;
  // align-items: flex-start;
  // cursor: default;
  // box-sizing: border-box;
  background-color: transparent;
  // writing-mode: horizontal-tb !important;
  // margin: 0em;
  padding-block: 1px;
  padding-inline: 6px;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-radius: 50px;
  width: 50px;
  height: 50px;

  &.btn-yes {
    border-color: green;
    color: green;
  }

  &.btn-no {
    border-color: red;
    color: red;
  }

  &.btn-super {
    border-color: blue;
    color: blue;
  }
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
