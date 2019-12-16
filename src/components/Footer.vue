<template>
  <div class="footer">
    <span>Made with <a href="https://instagram.com/lush.scents" target="_blank"><font-awesome-icon icon="heart" /></a> and plastic free glitter. Pictures and PLU codes courtesy of <a href="https://lush.co.uk" target="_blank">Lush</a>.</span>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
  .footer {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    span {
      padding: 10px;
      color: #75A6E1;
      font-size: 14px;
      opacity: 0.75;
      transition: all 0.4s ease;
      line-height: 1.4;
      .svg-inline--fa {
        color: #ef1a06;
        &:hover {
          cursor: pointer;
          color: #A30000;
        }
      }
      a {
        color: #75A6E1;
        text-decoration: none;
      }
    }
  }

  @media screen and (max-height: 680px) {
    .footer {
      span {
        padding: 20px 20px 5px 20px !important;
      }
    }
  }

  @media screen and (max-width: 520px) {
    .footer {
      height: 50px !important;
      span {
        padding: 10px 20px !important;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .footer {
      span {
        font-size: 12px !important;
      }
    }
  }
</style>
