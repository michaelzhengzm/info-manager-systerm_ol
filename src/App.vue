<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  background: #fff;
  #app {
    height: 100%;
  }
}

</style>
