import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/main/analysis/overview"
	},
	{
		path: "/main",
		name: 'main',
		component: () => import("../views/main/main.vue"),
		// children: [], // 这里的子路由不能写死，要根据用户权限动态添加路由组件映射关系
	},
	{
		path: "/login",
		component: () => import("../views/login/login.vue")
	}
];

const router = createRouter({
	routes,
	history: createWebHashHistory()
});

// 为什么刷新页面这里会执行两次呢？
// 全局路由守卫
router.beforeEach(to => {
	// 如果跳转的不是login页面，则判断token是否存在或过期
	if (to.path !== '/login') {
		let token = localStorage.getItem('token')
		if (!token) {
			return '/login'
		}
	}
})

export default router;
