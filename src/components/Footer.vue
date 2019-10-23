<template>
  <div class="footer">
    <span>Made with <font-awesome-icon icon="heart" /> and plastic free glitter. Pictures and PLU codes courtesy of <a href="https://lush.co.uk" target="_blank">Lush</a>.</span>
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
      .svg-inline--fa {
        &:hover {
          cursor: default;
          color: red;
        }
      }
      a {
        color: #75A6E1;
        text-decoration: none;
      }
    }
  }
</style>
