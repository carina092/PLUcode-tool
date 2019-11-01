<template>
  <div class="searchInput">
    <Modal :visible="isModalOpen" @close="isModalOpen = false"/>

    <div class="result">
      <transition name="fade" mode="out-in">
      <div class="productContainer" v-if="results" :key="results">
        <div class="productId">{{ results.id }}</div>
        <div class="productName">{{ results.name }} {{ results.type }} {{ results.data }}</div>
        <div class="productImage">
          <img :src="results.img" />
        </div>
      </div>
      </transition>
    </div>
    <span style="padding: 20px 0;">SearchQuery output: {{ searchQuery }}</span>
    <input
      v-model="searchQuery"
      @input="filterResults"
      type="text"
      class="productInput"
      placeholder="Please type in a PLU code or productname."
      autocomplete="off"
    />
    <div v-if="filteredResults">
      <ul>
        <li v-for="filteredResult in filteredResults">{{ filteredResult }}</li>
      </ul>
    </div>
    <div class="explanation">
      <span @click="toggleModal">
          <font-awesome-icon icon="question-circle" />
          How does it work?
      </span>
    </div>
  </div>
</template>

<script>
import products from '../assets/data';
import Modal from './Modal.vue';

export default {
  name: 'Autocomplete',
  components: {
    Modal,
  },
  data() {
    return {
      searchQuery: null,
      products,
      isModalOpen: false,
      filteredResults: [],
    };
  },
  computed: {
    results() {
      if (this.searchQuery === null || this.searchQuery === '') {
        return false;
      }
      // eslint-disable-next-line max-len,no-shadow
      return this.products.find(products => products.name.toLowerCase() === this.searchQuery.toLowerCase() || products.id.toString() === this.searchQuery);
    },
  },
  methods: {
    filterResults() {
      this.filteredResults = this.searchQuery.filter(searchQuery => searchQuery.toLowerCase().startsWith(this.searchQuery.toLowerCase()));
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
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
      margin: 40px 0;
      .productContainer {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        .productId {
          font-size: 120px;
          font-weight: bold;
          text-align: center;
          color: #8ebffa;
          text-shadow: 2px 2px #75A6E1;
        }
        .productName {
          font-size: 32px;
          font-weight: bold;
          text-align: center;
          color: #75A6E1;
          margin: 5px 0 20px 0;
        }
        .productImage {
          height: 400px;
          overflow: hidden;
          text-align: center;
          img {
            width: 400px;
          }
        }
      }
      .image {
        width: 400px;
        height: 400px;
      }
    }
    .productInput {
      width: 100%;
      height: 50px;
      font-size: 18px;
      padding: 0 10px;
      background-color: #fff;
      border: 1px solid #d4d4d4;
      border-radius: 4px;
      box-shadow: 0px 0px 8px 0px rgba(142,191,250,0.5);
      z-index: 999;
      &:focus {
        border: 1px solid #8ebffa;
        box-shadow: 0px 0px 10px 0px rgba(142,191,250,0.8);
      }
      &::placeholder {
        color: #a4a4a4;
      }
    }
    .explanation {
      padding: 12px 10px;
      span {
        font-size: 14px;
        color: #8ebffa;
        cursor: pointer;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
