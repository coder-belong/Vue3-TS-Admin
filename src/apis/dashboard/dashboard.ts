import request from "../request";

// 获取商品统计的数量
function requestGoodsAmount() {
	return request({
		url: `/goods/amount/list`
	});
}

// 获取分类商品数量
function requestCategoryAmount() {
	return request({
		url: `/goods/category/count`
	});
}


// 获取不同城市销量
function requestCitySale() {
	return request({
		url: `/goods/address/sale`
	});
}


// 获取分类商品销量
function requestCategorySale() {
	return request({
		url: `/goods/category/sale`
	});
}


// 获取分类商品收藏数
function requestCategoryCollect() {
	return request({
		url: `/goods/category/favor`
	});
}


export {
	requestGoodsAmount,
	requestCategoryAmount,
	requestCategorySale,
	requestCategoryCollect,
	requestCitySale
};
