import request from "../request";

// 获取故事列表
function requestStoryList(queryInfo) {
	return request({
		url: `/story/list`,
		method: "post",
		data: queryInfo
	});
}


export {
	requestStoryList
};
