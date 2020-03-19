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
    background-color: #000;
  }

  #app {
    height: 100%;
    width: 100%;
  }

  .pageContainer {
    height: 100%;
    width: 100%;
  }

  *:focus {
    outline: none;
  }
</style>
