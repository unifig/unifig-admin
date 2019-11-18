
<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
}
</script>
<style>
  .app-main {
    background-color: #f9fafd !important;
    margin-left: 220px;
    margin-bottom: 50px;
  }
  .hideSidebar .app-main {
    margin-left: 0!important;
  }
</style>
