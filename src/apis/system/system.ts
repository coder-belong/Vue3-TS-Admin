import request from "../request";

// 获取部门列表
function requestDepartmentList(queryInfo) {
	return request({
		url: `/department/list`,
		method: "post",
		data: queryInfo
	});
}

// 获取菜单列表
function requestMenuList(queryInfo) {
	return request({
		url: `/menu/list`,
		method: "post",
		data: queryInfo
	});
}

// 获取角色列表
function requestRoleList(queryInfo) {
	return request({
		url: `/role/list`,
		method: "post",
		data: queryInfo
	});
}




export {
	requestDepartmentList,
	requestMenuList,
	requestRoleList
};
