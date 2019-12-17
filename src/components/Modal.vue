<template>
  <transition name="modal">
  <div v-if="visible">
    <div class="modalMask">
      <div class="modalWrapper">
        <div class="modalContainer">
          <div class="modalHeader">
            <font-awesome-icon
              class="icon"
              @click="$emit('close')"
              icon="times" />
          </div>
          <div class="modalContent">
            <h2>How does it work?</h2>
            <p>Every single item from Lush has its own PLU (Price Look-Up) code. Some employees remember the PLU codes to be able to quickly browse through the system and select the right products.<br />
              You can use this tool to search for PLU codes and/or products.</p>
            <p>Type in a random number or a product name to check the corresponding PLU code.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['visible'],
};
</script>

<style lang="scss" scoped>
.modalMask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
  display: table;
  transition: opacity .3s ease;
  .modalWrapper {
    display: table-cell;
    vertical-align: middle;
    margin: 25px 0;
    .modalContainer {
      width: 100%;
      max-width: 800px;
      margin: 0px auto;
      padding: 20px;
      background-color: #fff;
      transition: all .3s ease;
      border: 1px solid #d4d4d4;
      border-radius: 4px;
      box-shadow: 0px 0px 8px 0px rgba(142,191,250,0.5);
      .modalHeader {
        width: 100%;
        .icon {
          cursor: pointer;
          float: right;
          color: #8ebffa;
          font-size: 18px;
          &:hover {
            color: #75A6E1;
          }
        }
      }
      .modalContent {
        padding: 0 25px;
        h2 {
          margin: 5px 0 20px 0;
          color: #8ebffa;
        }
        p {
          line-height: 1.8;
        }
      }
    }
  }
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modalContainer {
  transition: opacity .5s;
  transform: scale(1.10);
}

.modal-leave-to {
  transition: opacity .5s;
}

  @media screen and (max-width: 880px) {
    .modalContainer {
      max-width: 80% !important;
    }
  }

  @media screen and (max-width: 360px) {
    .modalMask {
      .modalWrapper {
        .modalContainer {
          .modalContent {
            padding: 0 10px;
            h2 {
              font-size: 20px !important;
            }
            p {
              font-size: 14px !important;
            }
          }
        }
      }
    }
  }
</style>
