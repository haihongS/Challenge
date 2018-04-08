<template lang="pug">
el-menu.menu(router, :default-active="$route.path", :default-openeds="['/']", mode="horizontal")
  el-menu-item(index="/")
    span(slot="title")
      | 去中心化挑战协议
  el-menu-item(index="/home")
    span(slot="title")
      | 世界杯大挑战
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="stylus" scoped>
.menu
  height 100%
</style>
