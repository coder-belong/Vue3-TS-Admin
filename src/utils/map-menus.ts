import mainChildRouter from "@/router/main-child-router";

function mapMenusToRoutes(userMenus: any[]) {
	const routes = []  // 存储需要动态添加的路由组件映射配置

	// 1. 加载所有的main的子路由映射配置

	// 2. 根据菜单获取需要动态添加的routes
	// userMenus:
	// 	type === 1 -> children -> type === 1
	// 	type === 2 -> url -> route
	_recurseGetRoute(userMenus, routes)

	return routes
}

// 递归遍历后端返回的菜单树，截取二级菜单的url
function _recurseGetRoute(userMenus: any[], routes) {
	for (let menu of userMenus) {
		if (menu.type === 2) {
			// 遍历所有的子路由配置，截取前端路由和后端返回的url数据匹配的路由映射配置
			mainChildRouter.forEach(route => route.path === menu.url ? routes.push(route) : '')

		} else {
			// 如果是一级菜单，则递归调用获取二级菜单
			_recurseGetRoute(menu.children, routes)
		}
	}
}


export {
	mapMenusToRoutes
};
