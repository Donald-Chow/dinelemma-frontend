<template>
  <div>
    <h4>Restaurant Lists</h4>
    <div class="list">
      <div class="form">
        <input class="m-0 p-2 text-start bg-white" v-model="newListName" placeholder="New list" required />
        <button @click="createAndAddToList(newListName)">Create</button>
      </div>
      <div v-for=" list in localLists" :key="list.name" @click="addToList(list)">
        <div>
          <h2 class="m-0 p-2 text-start">{{ list.name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RestaurantList',
  props: ['restaurant', 'lists'],
  data() {
    return {
      localLists: this.lists,
      newListName: ''
    }
  },
  methods: {
    async createAndAddToList() {
      try {

        const response = await axios.post('restaurant_lists', {
          name: this.newListName
        })
        this.addToList(response.data.list)
        this.$emit('notice', `Created list: "${this.newListName}"`)
        this.localLists.unshift(response.data.list)
        this.resetList()
      } catch (error) {
        console.error('Error creating and adding to the list:', error);
      }
    },
    async addToList(list) {
      console.log(list);
      console.log(this.restaurant);
      const response = await axios.post('list_bookmarks', {
        list_bookmark: { restaurant_list_id: list.id },
        restaurant: this.restaurant
      })
      console.log(response);
    },
    resetList() {
      // alert
      this.newListName = ''
      this.$emit('closeList')
    }
  }
}
</script>

<style scoped lang="scss">
h4 {
  color: $primary
}

.form {
  display: flex;

  input {
    padding: 0px;
    background-color: $white;
    border: 0px;
    text-align: center;
    font-size: calc(1.325rem + 0.9vw);
    line-height: 1.2;
    color: $primary;
    width: 100%;

    &:focus {
      border: 3px solid #555;
      width: 100%
    }
  }
}

button {
  // position: absolute;
  // left: -9999px;
  background-color: $main1;
  border: none;
  width: 25%
}

.list {
  background-color: $white;

  div {
    border-bottom: 1px solid $text-primary;
  }
}

// input:focus+button {
// position: static;
/* Bring the button back into the layout */
// left: auto;
/* Reset the position */
// }
</style>
