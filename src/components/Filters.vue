<template>
<div class="filters">
  <label for="autocomplete-dropdown">Autocomplete dropdown: </label>
  <AutocompleteDropdown id="autocomplete-dropdown" :options="fruitOptions" v-model="selectedFruit"></AutocompleteDropdown>
  <div class="result">
    Selected: <strong>{{ selectedFruit }}</strong>
  </div>
</div>
</template>

<script>
import AutocompleteDropdown from './autocomplete-dropdown.vue';

export default {
  name: 'Filters',
  components: {
    AutocompleteDropdown,
  },
  data() {
    return {
      selectedFruit: 'Apple',
      fruitOptions: {
        Apple: 'Apple',
        Banana: 'Banana',
        Blueberry: 'Blueberry',
        Kiwi: 'Kiwi',
        Pear: 'Pear',
        Pineapple: 'Pineapple',
        Watermelon: 'Watermelon',
      },
    };
  },
};
</script>

<style lang="scss">
  .filters {
    width: 800px;
    margin: 0 auto;
  }

  .filter {
    text-align: left;
  }

  .result {
    margin-top: 30px;
    text-align: left;
  }

  label {
    display: block;
  }

</style>
