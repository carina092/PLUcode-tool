<template>
  <div class="searchInput">
    <Modal v-if="isModalOpen" @close="isModalOpen = false"></Modal>
    <div class="result">
      <transition name="fade">
      <div class="productContainer"
           v-for="preset in filterItems(presetData).slice(0, 1)"
           :key="preset.presetName"
           v-show="searchQuery != null || ''"
      >
        <div class="productId">{{ preset.id }}</div>
        <div class="productName">{{ preset.presetName }} {{ preset.type }} {{ preset.data }}</div>
        <div class="productImage">
          <img :src="preset.img" />
        </div>

      </div>
      </transition>
    </div>
    <input
      v-model="searchQuery"
      type="text"
      class="productInput"
      placeholder="Please type in a PLU code or productname."
    />
    <div class="explanation">
      <span @click="openModal">
          <font-awesome-icon icon="question-circle" />
          How does it work?
      </span>
    </div>
  </div>
</template>

<script>
import presetData from '../assets/data';
import Modal from './Modal.vue';

export default {
  name: 'Calculator',
  components: {
    Modal,
  },
  data() {
    return {
      searchQuery: null,
      presetData,
      isModalOpen: false,
    };
  },
  methods: {
    filterItems(presets) {
      const app = this;
      if (app.searchQuery === null) {
        return [];
      }
      // eslint-disable-next-line max-len
      return presets.filter(preset => preset.presetName.toLowerCase() === this.searchQuery.toLowerCase() || preset.id.toString() === this.searchQuery);
    },
    openModal() {
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
      padding: 40px 0;
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
      border: 1px solid #d4d4d4;
      background-color: #fff;
      border-radius: 4px;
      -webkit-box-shadow: 0px 0px 8px 0px rgba(142,191,250,0.5);
      -moz-box-shadow: 0px 0px 8px 0px rgba(142,191,250,0.5);
      box-shadow: 0px 0px 8px 0px rgba(142,191,250,0.5);
      z-index: 999;
      &:focus {
        border: 1px solid #8ebffa;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(142,191,250,0.8);
        -moz-box-shadow: 0px 0px 10px 0px rgba(142,191,250,0.8);
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
