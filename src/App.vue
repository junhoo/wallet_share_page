<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}
*{
  font-style: normal;
  font-size: .15rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
