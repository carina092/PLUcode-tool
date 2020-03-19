<template>
  <div class="pageContainer">
    <div class="logo"></div>
    <Autocomplete/>
    <Footer/>
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

<style lang="scss">
  .logo {
    position: absolute;
    top: 20px;
    left: 20px;
    background-image: url('../assets/lush_scents_logo_white.png');
    background-size: contain;
    height: 54px;
    width: 124px;
    color: #fff;
  }

  @media screen and (max-width: 920px) {
    .logo {
      display: none;
    }
  }
</style>
