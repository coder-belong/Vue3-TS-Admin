<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
			<!--<Test/>-->
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
// Element-Plus语言国际化
import { ElConfigProvider } from "element-plus";
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import Test from '../test/Test'
const locale = zhCn;
</script>

<style lang="less" scoped>
</style>
