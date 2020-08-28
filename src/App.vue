<template>
  <div id="app">
    <transition name="app-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {

  },
}
</script>
<style lang="scss">
#app {
  height: 100%;
  width: 100%;
}
.app-fade-enter-active,
.app-fade-leave-active {
  transition: all 0.2s ease;
}

.app-fade-enter,
.app-fade-leave-active {
  opacity: 0;
}
</style>

