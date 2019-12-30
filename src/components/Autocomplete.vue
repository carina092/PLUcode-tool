<template>
  <div class="searchInput"
       :class="{ 'activeResult': currentResult !== null }"
  >
    <Modal :visible="isModalOpen" @close="isModalOpen = false"/>
    <div class="inputContainer">
      <label>
        <input
                v-model="debouncedSearchQuery"
                type="text"
                class="productInput"
                placeholder="Please type in a PLU code or productname."
                autocomplete="off"
        />
      </label>
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
              :class="{ 'highlightedItem': suggestion.id === highlightedResult.id, 'hideItem': suggestion.id < highlightedResult.id }"
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
    <div class="result">
      <transition-group name="fade" mode="out-in" appear tag="div">
        <div class="productContainer" v-if="currentResult !== null" :key="currentResult.id">
          <div class="productId">{{ currentResult.id }}</div>
          <div class="productName">{{ currentResult.name }} {{ currentResult.type }} {{ currentResult.attribute }}</div>
          <div class="product">
            <div class="productPrevious"
                 @click="showPreviousProduct"
                 :disabled="disablePreviousIndex"
            >
              <font-awesome-icon icon="chevron-left" />
            </div>
            <div class="productImage">
              <img :src="currentResult.img"/>
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
  </div>
</template>

<script>
import _ from 'lodash';
import { db } from '../firebase';
import Modal from './Modal.vue';

export default {
  name: 'Autocomplete',
  components: {
    Modal,
  },
  firebase: {
    products: {
      source: db.ref('products'),
      cancelCallback(err) {
        console.error(err);
      },
    },
  },
  data() {
    return {
      searchQuery: null,
      currentResult: null,
      products: [],
      isModalOpen: false,
      highlightedItem: 0,
    };
  },
  created() {
    db.ref('products').once('value',
      (storedValue) => {
        this.products = storedValue.val();
      });
    window.addEventListener('keydown', (e) => {
      // eslint-disable-next-line default-case
      switch (e.keyCode) {
        case 27: return this.clearInput(); break;
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
    debouncedSearchQuery: {
      get() {
        return this.searchQuery;
      },
      set: _.debounce(function (newValue) {
        this.searchQuery = newValue;
      }, 500),
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
      this.highlightedItem = 0;
    },
    showPreviousProduct() {
      if (this.currentResultIndex === 0 || this.searchQuery === null) {
        return;
      }
      this.currentResult = this.sortedProducts[this.currentResultIndex - 1];
      this.searchQuery = `${this.currentResult.id} - ${this.currentResult.name} ${this.currentResult.type}`;
    },
    showNextProduct() {
      if (this.currentResultIndex === this.sortedProducts.length - 1 || this.searchQuery === null) {
        return;
      }
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
      if (event.keyCode === 13 && this.highlightedItem >= 0) {
        this.currentResult = this.highlightedResult;
        if (this.currentResult !== null) {
          this.searchQuery = `${this.currentResult.id} - ${this.currentResult.name} ${this.currentResult.type}`;
        }
      } return false;
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
    transition: all 0.4s ease;
    &.activeResult > .result {
      display: block;
      /*height: inherit;*/
    }
    &.activeResult > .inputContainer {
      top: 0;
      margin: 40px 0 0 0;
    }
    &.activeResult > .explanation {
      top: 0;
    }
    .result {
      display: none;
      transition: all 0.4s ease;
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
          transition: all 0.4s ease;
        }
        .productName {
          font-size: 32px;
          font-weight: bold;
          text-align: center;
          color: #75A6E1;
          margin: 5px auto 20px auto;
          width: 100%;
          max-width: 600px;
          line-height: 1.4;
          transition: all 0.4s ease;
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
            transition: all 0.4s ease;
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
            transition: all 0.4s ease;
            img {
              width: 400px;
            }
          }
        }
      }
    }
    .inputContainer {
      position: relative;
      display: block;
      top: 50%;
      transition: all 1.5s ease;
      z-index: 9990;
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
        transition: all 0.4s ease;
        box-sizing: border-box;
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
        margin: 7px;
        padding: 10px;
        font-size: 18px;
        color: #bbb;
        background-color: #ffffff;
        &:hover {
          color: #3b3b3b;
          cursor: pointer;
        }
      }
    }
    .suggestions {
      position: relative;
      top: 50%;
      width: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      height: auto;
      max-height: 200px;
      display: block;
      padding: 10px 0;
      list-style: none;
      background-color: #fff;
      border: 1px solid #d4d4d4;
      border-radius: 0px 0px 4px 4px;
      z-index: 998;
      margin: -2px 0 0;
      li {
        transition: all 0.4s ease;
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
      position: relative;
      top: 50%;
      padding: 12px 10px;
      transition: all 1.5s ease;
      z-index: 9990;
      span {
        font-size: 14px;
        color: #8ebffa;
        cursor: pointer;
        transition: all 0.4s ease;
      }
    }

    .hideItem {
      transition: all 0.4s ease;
      opacity: 0;
      height: 0;
      padding: 0 10px !important;
    }

    .highlightedItem {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.05);
      width: 100%;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  /* Responsive */

  @media screen and (max-height: 820px) {
    .result {
      margin: -20px 0 0 0;
      .productContainer {
        .productId {
          font-size: 110px !important;
        }
        .product {
          .productImage {
            height: 350px !important;
            img {
              width: 350px !important;
            }
          }
        }
      }
    }
  }

  @media screen and (max-height: 720px) {
    .result {
      .productContainer {
        .productId {
          font-size: 100px !important;
        }
        .productName {
          font-size: 28px !important;
          margin: 0 auto 10px auto !important;
        }
        .product {
          .productImage {
            height: 350px !important;
            img {
              width: 350px !important;
            }
          }
        }
      }
    }
  }

  @media screen and (max-height: 680px) {
    .explanation {
      padding: 8px 10px !important;
      span {
        font-size: 12px !important;
      }
    }
    .result {
      .productContainer {
        .productId {
          font-size: 100px !important;
        }
        .productName {
          font-size: 28px !important;
          margin: 0 auto 10px auto !important;
        }
        .product {
          .productImage {
            height: 300px !important;
            img {
              width: 300px !important;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 680px) {
    .searchInput,
    .result {
      max-width: 90% !important;
    }
  }

  @media screen and (max-height: 620px) {
    .result {
      .productContainer {
        .productId {
          font-size: 90px !important;
        }
        .productName {
          font-size: 24px !important;
          margin: 0 auto 10px auto !important;
        }
        .product {
          .productImage {
            height: 275px !important;
            img {
              width: 275px !important;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 620px) {
    .result {
      .productContainer {
        .productName {
          max-width: 90% !important;
        }
        .product {
          .productImage {
            height: 350px !important;
            img {
              width: 350px !important;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 580px) {
    .result {
      .productContainer {
        .productId {
          font-size: 100px !important;
        }
        .productName {
          font-size: 28px !important;
        }
        .product {
          .productImage {
            height: 300px !important;
            img {
              width: 300px !important;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    .result {
      .productContainer {
        .product {
          .productImage {
            height: 275px !important;
            img {
              width: 275px !important;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .result {
      margin: -30px 0 0 0 !important;
      .productContainer {
        .productId {
          font-size: 96px !important;
        }
        .productName {
          font-size: 22px !important;
        }
        .product {
          .productPrevious, .productNext {
            width: 75px !important;
          }
          .productImage {
            height: 275px !important;
            img {
              width: 275px !important;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 420px) {
    .inputContainer {
      .productInput {
        font-size: 16px !important;
      }
    }
    .explanation {
      padding: 3px 10px 20px 10px !important;
      span {
        font-size: 12px !important;
      }
    }
    .result {
      .productContainer {
        .productId {
          font-size: 92px !important;
        }
        .product {
          .productPrevious, .productNext {
            width: 50px !important;
            font-size: 42px !important;
          }
          .productImage {
            height: 275px !important;
            img {
              width: 275px !important;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 380px) {
    .searchInput {
      .inputContainer {
        margin: 20px 0 0 0 !important;
      }
    }
    .explanation {
      padding: 3px 10px 20px 10px !important;
    }
    .result {
      .productContainer {
        .productId {
          font-size: 82px !important;
        }
        .productName {
          font-size: 20px !important;
          max-width: 80% !important;
        }
        .product {
          .productPrevious, .productNext {
            font-size: 34px !important;
          }
          .productImage {
            height: 250px !important;
            img {
              width: 250px !important;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 360px) {
    .searchInput {
      .suggestions {
        li {
          font-size: 14px !important;
        }
      }
    }
    .inputContainer {
      .productInput {
        font-size: 14px !important;
      }
    }
    .result {
      .productContainer {
        .product {
          .productImage {
            height: 180px !important;
            img {
              width: 180px !important;
            }
          }
        }
      }
    }
  }

  /* iPhone 5 / SE */
  @media only screen
  and (min-device-width: 320px)
  and (max-device-width: 568px) {
    .searchInput {
      .inputContainer {
        margin: 10px 0 0 0 !important;
      }
    }
    .result {
      .productContainer {
        .productId {
          font-size: 76px !important;
        }
      }
    }
  }

</style>
