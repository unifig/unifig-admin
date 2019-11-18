<style scoped>
  .el-menu-item{
    height: 40px;
    line-height: 40px;
  }
  /* .is-active{
  background-color: #ea3037 !important;

  color: #FFFFFF !important;
} */
  /* .el-submenu__title:hover{
    background-color: #fff !important;
  } */
  /* .el-submenu__title:hover {
    background-color: red;
  } */
.el-submenu .el-menu-item{
  height: 40px !important;
  line-height: 40px !important;
  padding:0 90px;
  margin: 5px 0;
}
.el-menu-item, .el-submenu__title{
    color: #303133 !important;
    background-color: #fff !important;
}
</style>
<template>
  <div class="menu-wrapper">
    <template v-for="item in mean" v-if="!item.hidden && meanObj[item.perms]">
      <router-link v-if="hasOneShowingChildren(meanObj[item.perms].children) && !meanObj[item.perms].children[0].children&&!meanObj[item.perms].alwaysShow" :to="meanObj[item.perms].path+'/'+meanObj[item.perms].children[0].path"
        :key="meanObj[item.perms].children[0].name">
        <el-menu-item :index="meanObj[item.perms].path+'/'+meanObj[item.perms].children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="meanObj[item.perms].meta&&meanObj[item.perms].meta.icon" :icon-class="meanObj[item.perms].meta.icon"></svg-icon>
          <span v-if="meanObj[item.perms].meta&&meanObj[item.perms].meta.title" slot="title">{{meanObj[item.perms].meta.title}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu :index="meanObj[item.perms].name||meanObj[item.perms].path" :key="meanObj[item.perms].name">
        <template slot="title">
          <svg-icon v-if="meanObj[item.perms].meta&&meanObj[item.perms].meta.icon" :icon-class="meanObj[item.perms].meta.icon"></svg-icon>
          <span v-if="meanObj[item.perms].meta&&meanObj[item.perms].meta.title" slot="title">{{meanObj[item.perms].meta.title}}</span>
        </template>
        <template v-for="child in item.list" v-if="!child.hidden && meanObj[item.perms].children[child.perms]">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[meanObj[item.perms].children[child.perms]]" :key="meanObj[item.perms].children[child.perms].path"></sidebar-item>
          <router-link v-else :to="meanObj[item.perms].path+'/'+meanObj[item.perms].children[child.perms].path" :key="meanObj[item.perms].children[child.perms].name">
            <el-menu-item :index="meanObj[item.perms].path+'/'+meanObj[item.perms].children[child.perms].path">
              <svg-icon v-if="meanObj[item.perms].children[child.perms].meta&&meanObj[item.perms].children[child.perms].meta.icon" :icon-class="meanObj[item.perms].children[child.perms].meta.icon"></svg-icon>
              <span v-if="meanObj[item.perms].children[child.perms].meta&&meanObj[item.perms].children[child.perms].meta.title" slot="title">{{meanObj[item.perms].children[child.perms].meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  import {constantRouterObj} from '../../../../router/index'
  import { getMeanList } from "@/api/meanList";
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mean: [],
      meanObj: {}
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      // const showingChildren = children.filter(item => {
      //   return !item.hidden
      // })
      // if (showingChildren.length === 1) {
      //   return true
      // }
      // return false
    },
    // 获取权限
    getList () {
      getMeanList().then(res => {
        if (res.success) {
          this.mean = res.data.menu
          // this.mean.forEach(i => {
          //   // console.log(i);
          //   // console.log(this.meanObj[i.perms].name);
          //   i.list.forEach(n => {
          //     console.log(this.meanObj[i.perms].children[n.perms].path);
          //   })
          // })
        }
      })
    }
  },
  created () {
    this.getList()
    this.meanObj = JSON.parse(JSON.stringify(constantRouterObj))
    // console.log(constantRouterObj);
  }
}
</script>
