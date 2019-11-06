<template>
  <div class="pageContainer">
   <Autocomplete></Autocomplete>
    <Footer></Footer>
  </div>
</template>

<script>
import Autocomplete from '../components/Autocomplete.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Index',
  components: {
    Autocomplete,
    Footer,
  },
};
</script>
