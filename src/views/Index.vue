<template>
  <div class="pageContainer">
   <Filters></Filters>
    <Footer></Footer>
  </div>
</template>

<script>
// import Autocomplete from '../components/Autocomplete.vue';
import Filters from '../components/Filters.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Index',
  components: {
    // Autocomplete,
    Filters,
    Footer,
  },
};
</script>
