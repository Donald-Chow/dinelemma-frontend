<template>
  <div :id="'voting-card' + vote.id" class=" voting-card carousel slide" data-bs-ride="false">

    <div class="carousel-indicators">
      <button type="button" :data-bs-target="'#voting-card' + vote.id" data-bs-slide-to="0" class="active"
        aria-current="true" aria-label="Slide 1"></button>
      <button type="button" :data-bs-target="'#voting-card' + vote.id" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" :data-bs-target="'#voting-card' + vote.id" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>

    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://cdn.midjourney.com/fbcaa719-5074-4910-a3d7-29c557926cc4/0_2.png" class="d-block w-100"
          alt="...">
        <div class="carousel-caption d-md-block">
          <h5>{{ vote.restaurant.name }}</h5>
          <p>Category: {{ vote.restaurant.category }}</p>
        </div>
      </div>

      <div class="carousel-item">
        <img src="https://cdn.midjourney.com/d4ff1b1c-226e-4417-9dad-df45903c3336/0_1.webp" class="d-block w-100"
          alt="...">
        <div class="carousel-caption d-md-block">
          <h5>{{ vote.restaurant.name }}</h5>
          <p>Some representative placeholder content for the second slide.Some representative placeholder content for
            the second slide.</p>
        </div>
      </div>

      <div class="carousel-item">
        <img src="https://cdn.midjourney.com/aee61842-f92a-4402-8d33-60b1ef1f60c8/0_2_384_N.webp" class="d-block w-100"
          alt="...">
        <div class="carousel-caption d-md-block">
          <h5>{{ vote.restaurant.name }}</h5>
          <p>Some representative placeholder content for the third slide.Some representative placeholder content for the
            third slide.Some representative placeholder content for the third slide.</p>
        </div>
      </div>

    </div>

    <div>
      <button class="carousel-control-prev" type="button" :data-bs-target="'#voting-card' + vote.id" data-bs-slide="prev">
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" :data-bs-target="'#voting-card' + vote.id" data-bs-slide="next">
        <span class="visually-hidden">Next</span>
      </button>

      <div class="voting-bar">
        <button class='btn btn-lg btn-outline-danger' @click.prevent="handleVote(1)">NO</button>
        <button class='btn btn-lg btn-outline-info' @click.prevent="handleVote(2)">Super</button>
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
  methods: {
    async handleVote(result) {
      try {
        const response = await axios.patch(`votes/${this.vote.id}`, {
          vote: {
            result: result
          }
        })
        console.log('Vote success:', response);
        document.getElementById(`voting-card${this.vote.id}`).classList.add('fade-out')
      } catch (error) {
        console.error(error)
      }


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
  // position: absolute;
  // right: 0;
  // left: 0;
  // z-index: 2;
  // display: flex;
  // justify-content: center;
  // padding: 0;
  // margin-bottom: 1rem;
  top: 0;
  margin-right: 8px;
  margin-left: 8px;
  height: fit-content;

  button {
    flex: 1 !important;
    // box-sizing: content-box;
    // width: 30px;
    // height: 3px;
    // padding: 0;
    // margin-right: 3px;
    // margin-left: 3px;
    // text-indent: -999px;
    // cursor: pointer;
    // background-color: #FCF1F2;
    // background-clip: padding-box;
    // border: 0;
    // border-top: 10px solid transparent;
    // border-bottom: 10px solid transparent;
    // opacity: 0.5;
    // transition: opacity 0.6s ease;
  }
}

.carousel-control-prev {
  /* position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: #FCF1F2;
  text-align: center;
  background: none;
  border: 0;
  opacity: 0.5;
  transition: opacity 0.15s ease;
  */
  width: 50%;
  height: 75%;
}

.carousel-control-next {
  width: 50%;
  height: 75%;
  transition: opacity 0.15s ease;
}

.carousel-item {
  height: 80vh;

  img {
    height: 100%;
    object-fit: cover;
  }
}

.carousel-caption {
  position: absolute;
  right: 32px;
  bottom: 32px;
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
