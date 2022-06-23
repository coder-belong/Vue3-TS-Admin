<template>
	<div id="home">
		<el-container class="main-content">
			<!--侧边栏导航区域-->
			<el-aside :width="isCollapse ? '60px' : '210px'">
				<home-aside :isCollapse="isCollapse" />
			</el-aside>

			<el-container class="page" :style="{marginLeft: isCollapse ? '60px' : '210px'}">
				<!--主体内容头部区域-->
				<el-header class="page-header">
					<home-header @toggleExpand="toggleExpand" />
				</el-header>
				<!--主题内容区域-->
				<el-main class="page-content" @scroll="handleScroll">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import $ from "jquery";
import HomeAside from "@/views/main/child-cpn/main-aside.vue";
import HomeHeader from "@/views/main/child-cpn/main-header.vue";
import {
	init,

	amountScrollAnimation,
	bottomChartScrollAnimation,
	centerChartScrollAnimation
} from "@/assets/js/scrollAnimation";
import eventbus from "@/utils/eventbus";

// data
const isCollapse = ref(false);

// 监听子组件折叠菜单图标的切换
const toggleExpand = (isExpand) => {
	isCollapse.value = isExpand;
};

onMounted(() => {
	eventbus.on('amountRendered', () => {
		// 执行初始化动画
		init()
	})
})

// 处理内容区域的滚动
const handleScroll = () => {
	amountScrollAnimation()
	centerChartScrollAnimation()
	bottomChartScrollAnimation()
};

</script>

<style scoped lang="less">
#home {
	.main-content {
		.el-aside {
			position: fixed;
			left: 0;
			top: 0;
			height: 100%;

			transition: width .5s linear;
			background: rgb(12, 33, 53);
		}

		.page {
			transition: all .5s linear;

			.page-header {
				height: 48px !important;
			}

			.page-content {
				position: relative;
				background: rgb(240, 242, 245);
				height: calc(100vh - 48px);
				overflow: scroll;
			}
		}
	}
}
</style>
