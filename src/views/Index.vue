<template>
  <div class="pageContainer">
    <Calculator />
    <Footer />
  </div>
</template>

<script>
import Calculator from '../components/Calculator.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Index',
  components: {
    Calculator,
    Footer,
  },
};
</script>
