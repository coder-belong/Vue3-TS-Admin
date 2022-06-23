import type { RouteRecordRaw } from "vue-router";

// main中所有的子路由配置（需要根据角色权限过滤子路由的映射关系）
const mainChildRouter: RouteRecordRaw[] = [
	{
		path: "/main/analysis/overview",
		component: () => import("@/views/overview/overview.vue")
	},
	{
		path: "/main/analysis/dashboard",
		component: () => import("@/views/dashboard/dashboard.vue")
	},
	{
		path: "/main/system/user",
		component: () => import("@/views/user/user.vue")
	},
	{
		path: "/main/system/department",
		component: () => import("@/views/department/department.vue")
	},
	{
		path: "/main/system/menu",
		component: () => import("@/views/menu/menu.vue")
	},
	{
		path: "/main/system/role",
		component: () => import("@/views/role/role.vue")
	},
	{
		path: "/main/product/category",
		component: () => import("@/views/category/category.vue")
	},
	{
		path: "/main/product/goods",
		component: () => import("@/views/goods/goods.vue")
	},
	{
		path: "/main/story/chat",
		component: () => import("@/views/chat/chat.vue")
	},
	{
		path: "/main/story/list",
		component: () => import("@/views/list/list.vue")
	}
];

export default mainChildRouter;
