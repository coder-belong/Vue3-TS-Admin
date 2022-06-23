import request from "../request";

// 请求用户信息
function requestUserInfoById(id: number) {
	return request({
		url: "/users/" + id
	});
}

// 请求角色权限对应的菜单导航
function requestMenuByRoleId(id: number) {
	return request({
		url: `/role/${id}/menu`
	});
}

// 获取用户列表
function requestUserList(queryInfo) {
	return request({
		url: `/users/list`,
		method: "post",
		data: queryInfo
	});
}

// 编辑用户
function requestEditUser(queryInfo) {
	return request({
		url: `/users/list`,
		method: "post",
		data: queryInfo
	});
}


export {
	requestUserInfoById,
	requestMenuByRoleId,
	requestUserList
};
