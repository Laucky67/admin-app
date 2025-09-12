<template>
  <el-aside :width="asideWidth">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3>{{ store.state.isCollapse ? '导航' : '导航栏' }}</h3>
      <el-menu-item
        v-for="item in nochildren"
        :key="item.path"
        :index="item.path"
      >
        <component class="icons" :is="item.icon" />
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        v-for="item in haschildren"
        :key="item.path"
        :index="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon" />
          <span>{{ item.label }}</span>
        </template>``
        <el-menu-item-group>
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.path"
            :index="subitem.path"
          >
            {{ subitem.label }}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
  
</template>

<script setup>
import { ref, computed } from "vue";
import { useAllDataStore } from "@/stores";

const store = useAllDataStore();

const list = ref([
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "house",
    url: "Home",
  },
  {
    path: "/mall",
    name: "mall",
    label: "商品管理",
    icon: "video-play",
    url: "Mall",
  },
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "User",
  },
  {
    path: "other",
    label: "其他",
    icon: "location",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Page1",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Page2",
      },
    ],
  },
]);

const nochildren = computed(() => {
  return list.value.filter((item) => !item.children);
});

const haschildren = computed(() => {
  return list.value.filter((item) => item.children);
});

const asideWidth = computed(() => (store.state.isCollapse ? "64px" : "180px"));
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}

.el-header {
  background-color: #333;
  h3 {
    color: #fff;
    line-height: 48px;
    text-align: center;
  }
}

.el-aside {
  height: 100%;
  background-color: #545c64;
}
</style>
