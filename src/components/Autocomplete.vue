<template>
  <div class="searchInput">
    <Modal :visible="isModalOpen" @close="isModalOpen = false"/>
    <div class="result">
      <transition-group name="fade" mode="out-in" appear tag="div">
        <div class="productContainer" v-if="currentResult !== null" :key="currentResult.id">
          <div class="productId">{{ currentResult.id }}</div>
          <div class="productName">{{ currentResult.name }} - {{ currentResult.type }} - {{ currentResult.attribute }}</div>
          <div class="product">
            <div class="productPrevious"
                 @click="showPreviousProduct"
                 :disabled="disablePreviousIndex"
            >
              <font-awesome-icon icon="chevron-left" />
            </div>
            <div class="productImage">
              <img :src="currentResult.img" />
            </div>
            <div class="productNext"
                 @click="showNextProduct"
                 :disabled="disableNextIndex"
            >
              <font-awesome-icon icon="chevron-right" />
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="inputContainer">
      <input
        v-model="searchQuery"
        type="text"
        class="productInput"
        placeholder="Please type in a PLU code or productname."
        autocomplete="off"
      />
      <div class="clearButton"
           v-if="searchQuery != null"
           @click="clearInput()"
      >
        <font-awesome-icon icon="times" />
      </div>
    </div>
    <ul class="suggestions" v-if="suggestions.length > 0">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectResult(suggestion.id)"
        :class="{ 'highlightedItem': suggestion.id === highlightedResult.id }"
        @keyup='nextItem'
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
      highlightedItem: 0,
    };
  },
  created() {
    window.addEventListener('keydown', (e) => {
      // eslint-disable-next-line default-case
      switch (e.keyCode) {
        case 37: return this.showPreviousProduct(); break;
        case 39: return this.showNextProduct(); break;
      }
    });
  },
  mounted() {
    document.addEventListener('keyup', this.nextItem);
  },
  computed: {
    sortedProducts() {
      return [...this.products].sort((a, b) => (a.id > b.id ? 1 : -1));
    },
    suggestions() {
      if (!this.searchQuery) return [];

      // eslint-disable-next-line no-shadow
      return this.sortedProducts.filter(products =>
      // eslint-disable-next-line max-len,implicit-arrow-linebreak
        products.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || products.id.toString().includes(this.searchQuery.toLowerCase()));
    },
    noResultsFound() {
      const hasSearchQuery = !!this.searchQuery;
      const hasNoResult = !this.currentResult;
      const hasNoSuggestions = this.suggestions.length < 1;
      return (hasSearchQuery && hasNoResult && hasNoSuggestions);
    },
    currentResultIndex() {
      if (this.searchQuery === null || this.currentResult === null) { return false; }
      return this.sortedProducts.findIndex(product => product.id === this.currentResult.id);
    },
    disablePreviousIndex() {
      if (this.currentResult === null) {
        return false;
      }
      return this.currentResult.id === 1;
    },
    disableNextIndex() {
      if (this.currentResult === null) {
        return false;
      }
      const lastItem = this.sortedProducts[this.sortedProducts.length - 1];
      return this.currentResult.id === lastItem.id;
    },
    highlightedResult() {
      return this.suggestions[this.highlightedItem];
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
    clearInput() {
      this.searchQuery = null;
      this.currentResult = null;
    },
    showPreviousProduct() {
      if (this.currentResultIndex === 0 || this.searchQuery === null) return;
      this.currentResult = this.sortedProducts[this.currentResultIndex - 1];
      this.searchQuery = `${this.currentResult.id} - ${this.currentResult.name} ${this.currentResult.type}`;
    },
    showNextProduct() {
      if (this.currentResultIndex === this.sortedProducts.length - 1 || this.searchQuery === null) return;
      this.currentResult = this.sortedProducts[this.currentResultIndex + 1];
      this.searchQuery = `${this.currentResult.id} - ${this.currentResult.name} ${this.currentResult.type}`;
    },
    nextItem() {
      // eslint-disable-next-line no-restricted-globals
      if (event.keyCode === 38 && this.highlightedItem > 0) {
        // eslint-disable-next-line no-plusplus
        this.highlightedItem--;
        // eslint-disable-next-line no-restricted-globals
      } else if (event.keyCode === 40) {
        this.highlightedItem = (this.highlightedItem + 1) % this.suggestions.length;
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
        .product {
          display: flex;
          flex-direction: row;
          justify-content: center;
          .productPrevious, .productNext {
            display: flex;
            justify-content: center;
            align-items: center;
            height: inherit;
            width: 100px;
            font-size: 48px;
            &[disabled] {
              .svg-inline--fa.fa-chevron-left.fa-w-10,
              .svg-inline--fa.fa-chevron-right.fa-w-10 {
                cursor: not-allowed;
                color: #bbb;
                &:hover {
                  color: #bbb;
                }
              }
            }
            .svg-inline--fa.fa-chevron-left.fa-w-10,
            .svg-inline--fa.fa-chevron-right.fa-w-10 {
              cursor: pointer;
              color: #8ebffa;
              &:hover {
                color: #75A6E1;
              }
            }
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
      }
      .image {
        width: 400px;
        height: 400px;
      }
    }
    .inputContainer {
      position: relative;
      .productInput {
        display: block;
        width: 100%;
        height: 50px;
        font-size: 18px;
        padding: 0 10px;
        color: #3b3b3b;
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
      .clearButton {
        position: absolute;
        top: 0;
        right: 0;
        height: 50px;
        padding: 15px;
        font-size: 18px;
        color: #bbb;
        &:hover {
          color: #3b3b3b;
          cursor: pointer;
        }
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

    .highlightedItem {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.05);
      width: 100%;
    }
  }

  /*.fade-enter-active, .fade-leave-active {*/
  /*   transition: opacity .5s;*/
  /* }*/

  /* .fade-enter, .fade-leave-to !* .fade-leave-active below version 2.1.8 *! {*/
  /*   opacity: 0;*/
  /* }*/

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
