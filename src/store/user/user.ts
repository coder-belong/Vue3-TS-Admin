import { requestUserInfoById, requestMenuByRoleId, requestUserList } from "@/apis/user/user";
import Router from "@/router";
import { ElNotification } from "element-plus";
import { mapMenusToRoutes } from "@/utils/map-menus";

const userModule = {
	namespaced: true,

	state: () => ({
		userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
		userMenu: JSON.parse(localStorage.getItem("userMenu")) || [],
	}),
	mutations: {
		changeUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		changeUserMenu(state, userMenu) {
			state.userMenu = userMenu;

			// 根据菜单动态添加路由映射关系
			const routes = mapMenusToRoutes(userMenu);
			routes.forEach(route => {
				// 动态添加路由~
				Router.addRoute("main", route);
			});
		},
	},
	actions: {
		async saveUserDataAction({ commit }, { id }) {
			// 1. 请求用户信息并保存
			let userInfoResult = await requestUserInfoById(id);
			localStorage.setItem("userInfo", JSON.stringify(userInfoResult.data));
			commit("changeUserInfo", userInfoResult.data);

			// 2. 请求角色菜单并保存
			let userMenuResult = await requestMenuByRoleId(id);
			localStorage.setItem("userMenu", JSON.stringify(userMenuResult.data));
			commit("changeUserMenu", userMenuResult.data);

			// 3. 跳转到main首页
			Router.push("/main/analysis/overview");

			ElNotification({
				title: "登录成功",
				message: "欢迎回来~" + userInfoResult.data.name,
				type: "success",
				duration: 2000
			});
		},

		// 加载本地数据到vuex中
		loadLocalData({ commit }) {
			const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
			const userMenus = JSON.parse(localStorage.getItem("userMenu")) || [];
			commit("changeUserInfo", userInfo);
			commit("changeUserMenu", userMenus);
		},
	},

	getters: {}
};

export default userModule;


