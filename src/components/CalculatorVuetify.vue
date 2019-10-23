<template>
  <v-app>
    <v-content>
      <v-container>
        <v-autocomplete
          v-model="itemSelected"
          :items="posts"
          clearable
          item-value="id"
          item-text="id"
          :filter="customFilter"
        >

          <template slot="selection" slot-scope="data">
            <v-chip :input-value="data.selected" class="chip--select">
              {{data.item.id}} - {{ data.item.presetName }} {{ data.item.type }} {{ data.item.data }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.id +' - '+ data.item.presetName +' '+ data.item.type +' '+ data.item.data"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-autocomplete>

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import posts from '../assets/data';

export default {
  name: 'Calculator',
  data() {
    return {
      posts,
      post: null,
    };
  },
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.id;
      const textTwo = item.presetName.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
    },
  },
};
</script>

<style scoped lang="scss">
  .searchInput {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 600px;
    height: 100%;
    .result {
      display: block;
      height: 600px;
      padding: 40px 0;
    }
  }
</style>
