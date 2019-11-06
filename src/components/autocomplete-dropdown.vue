<template>
  <div class="dropdown" :class="{'open' : open}">
    <input type="text"
           v-model="searchText"
           @input="searchChanged"
           placeholder="Please type in a PLU code or productname."
    />
    <a class="toggle" @mousedown.prevent @click="setOpen(!open)">
      <span class="arrow-up">▲</span>
      <span class="arrow-down">▼</span>
    </a>
    <ul class="suggestion-list">
      <li
        v-for="(suggestion, index) in matches"
        :key="index"
        @mousedown.prevent
        @click="suggestionSelected(suggestion)"
      >
         {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    value: null,
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      searchText: '',
      open: false,
    };
  },
  computed: {
    matches() {
      return Object.entries(this.options).filter((option) => {
        const optionText = option[0].toLowerCase();
        return optionText.match(this.searchText.toLowerCase());
      });
    },
  },
  methods: {
    setOpen(isOpen) {
      this.open = isOpen;
    },
    searchChanged() {
      if (!this.open) {
        this.open = true;
      }
    },
    suggestionSelected(suggestion) {
      this.open = false;
      // eslint-disable-next-line prefer-destructuring
      this.searchText = suggestion[0];
      this.$emit('input', suggestion[1]);
    },
  },
};
</script>

<style scoped lang="scss">
  input {
    width: 90%;
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

  .dropdown {
    display: inline-block;
    position: relative;
    width: 90%;
    .suggestion-list {
      background-color: rgba(255, 255, 255, 0.95);
      border: 1px solid #ddd;
      list-style: none;
      display: block;
      margin: 0;
      padding: 0;
      width: 100%;
      overflow: hidden;
      position: absolute;
      top: 50px;
      left: 0;
      z-index: 2;
      li {
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #ccc;
        }
      }
    }
  }

  .dropdown.open .suggestion-list {
    display: block;
  }

  .dropdown .suggestion-list {
    display: none;
  }

  .toggle .arrow-up {
    display: none;
  }

  .open .toggle .arrow-up {
    display: inline-block;
  }

  .open .toggle .arrow-down {
    display: none;
  }
</style>
