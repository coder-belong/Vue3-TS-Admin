<template>
	<div id="home-aside">
		<div class="logo">
			<img class="img" src="~@/assets/img/logo.svg" alt="logo" />
			<span class="title">Vue3+TS</span>
		</div>

		<el-menu
			:default-active="activeMenu"
			:collapse="isCollapse"
			background-color="#0c2135"
			class="el-menu-vertical-demo"
			text-color="#b7bdc3"
			active-text-color="#0a60bd"
			unique-opened
		>
			<el-sub-menu :index="item1.sort + ''" v-for="(item1, index1) in userMenu" key="item1.id">
				<!--一级菜单-->
				<template #title>
					<el-icon v-if="item1.sort === 1">
						<Monitor />
					</el-icon>
					<el-icon v-if="item1.sort === 2">
						<Setting />
					</el-icon>
					<el-icon v-if="item1.sort === 3">
						<Goods />
					</el-icon>
					<el-icon v-if="item1.sort === 4">
						<ChatDotRound />
					</el-icon>
					<span>{{ item1.name }}</span>
				</template>
				<!--二级菜单-->
				<template v-if="item1.type === 1">
					<el-menu-item :index="item2.sort + ''" v-for="(item2, index2) in item1.children"
												@click="$router.push(item2.url)">
						{{ item2.name }}
					</el-menu-item>
				</template>
			</el-sub-menu>
		</el-menu>

	</div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import mainChildRouter from "@/router/main-child-router";
import router from "@/router";

// store
const store = useStore();
const userMenu = store.state.user.userMenu;

// props and emits
const props = defineProps({
	isCollapse: {
		type: Boolean,
		default: false
	}
});

// data
const activeMenu = ref("100");

// 生命周期函数
onMounted(() => {
	let currentHref = location.href.split("#")[1];
	recurseGetCurrentMenu(userMenu, currentHref)
})

// 递归遍历菜单树，获取与当前路径匹配的菜单对象
const recurseGetCurrentMenu = (userMenu:any[], currentHref:string) => {
	for (let menu of userMenu) {
		if (menu.type === 2) {
			if (menu.url === currentHref) {
				activeMenu.value = menu.sort + ''
				return false
			}
		} else {
			recurseGetCurrentMenu(menu.children, currentHref);
		}
	}
};


</script>

<style scoped lang="less">
#home-aside {
	.logo {
		display: flex;
		height: 28px;
		align-items: center;
		padding: 10px 12px;


		img {
			width: 28px;
			height: 28px;
			margin: 0 10px;
		}

		.title {
			font-size: 16px;
			font-weight: 700;
			color: white;
		}
	}

	.el-menu {
		border-right: none;

		.el-menu-item {
			padding-left: 50px !important;
		}

		.el-menu-item:hover {
			color: #fff !important; // 菜单
		}

		.el-menu-item.is-active {
			color: #fff !important;
			background-color: #0a60bd !important;
		}
	}
}
</style>
