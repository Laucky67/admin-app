<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import axios from "axios";
import * as echarts from "echarts";
import api from "../api/api";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const router = useRouter();

const getImageUrl = (user) =>
  new URL(`../assets/images/${user}.png`, import.meta.url).href;

const tableData = ref([]);
//       totalBuy: 300,
//     },
//     {
//       name: "Python",
//       todayBuy: 100,
//       monthBuy: 200,
//       totalBuy: 300,
//     }
// ])

const countData = ref([]);

const chartData = ref({});

const tableLabel = ref({
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
});

const getTableData = async () => {
  const data = await proxy.$api.getTableData();
  console.log(data);
  tableData.value = data;
};

const getCountData = async () => {
  const data = await proxy.$api.getCountData();
  console.log(data);
  countData.value = data;
};

const getChartData = async () => {
  const { orderData, videoData, userData } = await proxy.$api.getChartData();
  // 获取折线图数据并渲染
  xOptions.xAxis.data = orderData.date;
  xOptions.series = Object.keys(orderData.data[0]).map((brand) => ({
    name: brand,
    data: orderData.data.map((item) => item[brand]),
    type: "line",
  }));
  const oneEchart = echarts.init(proxy.$refs["echart"]);
  oneEchart.setOption(xOptions);

  // 获取柱状图数据并渲染
  xOptions.xAxis.data = userData.map((item) => item.date);
  xOptions.series = [
    {
      name: "新增用户",
      data: userData.map((item) => item.new),
      type: "bar",
    },
    {
      name: "活跃用户",
      data: userData.map((item) => item.active),
      type: "bar",
    },
  ];
  const twoEchart = echarts.init(proxy.$refs["userchart"]);
  twoEchart.setOption(xOptions);

  // 获取饼图数据并渲染
  pieOptions.series = [
    {
      data:videoData,
      type:"pie"
    }
  ];
  const threeEchart = echarts.init(proxy.$refs["videochart"]);
  threeEchart.setOption(pieOptions)
};

const goToDataVisualization = () => {
  router.push('/data-visualization');
};

onMounted(() => {
  getTableData();
  getCountData();
  getChartData();
});

//这个是折线图和柱状图 两个图表共用的公共配置
const xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  legend: {
    top: 0,
  },
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});

const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: 0,
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});
</script>

<template>
  <el-row class="home" :gutter="20"
    ><!-- gutter是指列之间的间距 -->
    <!-- 左侧列 用户面板与表格 -->
    <!-- 一行分为24等分 :span="8"表示占8份 -->
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImageUrl('user')" class="user-img" alt="" />
          <div class="user-info">
            <p class="user-info-name">Admin</p>
            <p class="user-info-role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2024-06-30</span></p>
          <p>上次登录地点: <span>南京</span></p>
        </div>
        <div class="action-buttons">
          <el-button type="primary" @click="goToDataVisualization" style="width: 100%; margin-top: 20px;">
            数据可视化页面
          </el-button>
        </div>
      </el-card>

      <el-card shadow="hover" class="user-table">
        <el-scrollbar height="100%">
          <el-table :data="tableData">
            <!-- 通过:props="key"来绑定表头和数据 -->
            <el-table-column
              v-for="(label, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="label"
            ></el-table-column>
          </el-table>
        </el-scrollbar>
      </el-card>
    </el-col>
    <!-- 右侧列 -->
    <el-col :span="16" style="margin-top: 20px">
      <!-- 6个小卡片 -->
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            :is="item.icon"
            class="icons"
            :style="{ background: item.color }"
          ></component>
          <div class="details">
            <p class="num">￥ {{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card class="top-echart">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <!-- 柱状图 -->
        <el-card class="userchart">
          <div ref="userchart" style="height: 220px;"></div>
        </el-card>
        
        <!-- 饼状图 -->
         <el-card class="videochart">
          <div ref="videochart" style="height: 220px"></div>
         </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-card {
    border-radius: 15px;
  }
}

.user-table {
  margin-top: 30px;
}

.user {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  padding-bottom: 20px;
  .user-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 50px;
  }

  .user-info {
    p {
      line-height: 40px;
    }

    .user-info-name {
      font-size: 40px;
      color: #666;
    }

    .user-info-role {
      font-size: 18px;
      color: #999;
    }
  }
}

.login-info {
  p {
    line-height: 40px;
    font-size: 18px;
    color: #999;
    span {
      font-weight: bold;
      margin-left: 50px;
      color: #666;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }

  .icons {
    width: 80px;
    margin-right: 5px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .details {
    margin-left: 15px;
    justify-content: center;
    display: flex;
    flex-direction: column;

    .num {
      font-size: 30px;
      margin-bottom: 10px;
    }

    .text {
      font-size: 15px;
      // text-align: center;
      color: #999;
    }
  }
}

.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width:48%;
  }
}
</style>
