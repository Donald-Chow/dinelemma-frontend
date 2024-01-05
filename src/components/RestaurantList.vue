<template>
  <div>
    <h2>Restaurant Lists</h2>
    <div class="list">
      <form class="form" @submit.prevent="createAndAddToList">
        <input v-model="newListName" placeholder="New list" required />
        <button type="submit">Create</button>
      </form>
      <div v-for=" list in localLists" :key="list.name" @click="addToList(list)">
        <h4>{{ list.name }}</h4>
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
h2 {
  color: $primary;
  font-size: 26px;
  padding: 4px 4px 8px;
}

.form {
  display: flex;
  border-bottom: 1px solid $gray;

  &:focus-within {
    // border: 3px solid #555;
    width: 100%;

    button {
      display: block;
    }
  }

  input {
    border: 0px;
    width: 100%;
    color: inherit;
    background-color: inherit;
    padding: 2px 2px;
    text-align: center;
    font-size: 24px;
    font-weight: 800;
    font-family: inherit;
  }
}

button {
  background-color: $main1;
  border: none;
  width: 25%;
  display: none;
}

h4 {
  font-size: 24px;
  font-weight: 800;
}

.list {
  background-color: $white;

  div {
    border-bottom: 1px solid $text-primary;
    padding: 4px;
  }
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
