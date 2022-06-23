import request from "../request";

// 获取商品列表
function requestGoodsList(queryInfo) {
	return request({
		url: `/goods/list`,
		method: "post",
		data: queryInfo
	});
}

// 获取商品类别列表
function requestGoodsCategoryList(queryInfo) {
	return request({
		url: `/category/list`,
		method: "post",
		data: queryInfo
	});
}

export {
	requestGoodsList,
	requestGoodsCategoryList
};
