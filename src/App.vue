<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-size: 16px;
    font-family: 'Helvetica', Arial, sans-serif;
    background-image: url('./assets/gradient.jpg');
    background-repeat: no-repeat;
    background-position: left top;
  }

  #app {
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.05);
  }

  .pageContainer {
    height: 100%;
    width: 100%;
  }
</style>
