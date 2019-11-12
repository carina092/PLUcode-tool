<template>
  <div class="searchInput">
    <Modal :visible="isModalOpen" @close="isModalOpen = false"/>

    <div class="result">
      <transition name="fade" mode="out-in">
      <div class="productContainer" v-if="currentResult !== null">
        <div class="productId">{{ currentResult.id }}</div>
        <div class="productName">{{ currentResult.name }} - {{ currentResult.type }} - {{ currentResult.attribute }}</div>
        <div class="productImage">
          <img :src="currentResult.img" />
        </div>
      </div>
      </transition>
    </div>
    <input
            v-model="searchQuery"
            type="text"
            class="productInput"
            placeholder="Please type in a PLU code or productname."
            autocomplete="off"
    />
    <ul class="suggestions" v-if="suggestions.length > 0">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectResult(suggestion.id)"
        >
      {{ suggestion.id }} - {{suggestion.name}} {{ suggestion.type }} {{ suggestion.attribute }}</li>
    </ul>
    <ul class="suggestions" v-if="noResultsFound">
      <li class="noResult">
        No matches found. :(
      </li>
    </ul>
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
      currentResult: null,
      products,
      isModalOpen: false,
    };
  },
  computed: {
    suggestions() {
      if (!this.searchQuery) return [];

      // eslint-disable-next-line no-shadow
      return this.products.filter(products =>
      // eslint-disable-next-line max-len,implicit-arrow-linebreak
        products.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || products.id.toString().includes(this.searchQuery.toLowerCase()));
    },
    noResultsFound() {
      if (this.searchQuery !== '' && this.searchQuery !== null && this.suggestions.length < 1) {
        return true;
      }
      if (this.currentResult === '' || this.currentResult === null) {
        return false;
      }
      return false;
      // return ((this.searchQuery !== '' && this.searchQuery !== null) && (this.suggestions.length === 0));
    },
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    selectResult(id) {
      this.currentResult = this.suggestions.find(suggestion => suggestion.id === id);
      if (this.currentResult !== null) {
        this.searchQuery = `${this.currentResult.id} - ${this.currentResult.name} ${this.currentResult.type}`;
      }
    },
  },
  watch: {
    searchQuery() {
      if (this.searchQuery === '') {
        this.currentResult = null;
      }
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
      /*height: 600px;*/
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
        display: block;
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
    .suggestions {
      width: 100%;
      overflow: hidden;
      display: block;
      margin: 0;
      padding: 10px 0;
      list-style: none;
      background-color: #fff;
      border: 1px solid #d4d4d4;
      border-radius: 0px 0px 4px 4px;
      z-index: 998;
      margin: -2px 0 0;
      li {
        padding: 7px 10px;
        font-size: 16px;
        &:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.05);
          width: 100%;
        }
      }
      .noResult {
        &:hover {
          cursor: default;
          background-color: #fff;
        }
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
