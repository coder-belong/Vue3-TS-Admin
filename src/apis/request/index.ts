import axios from "axios";
import type { AxiosInstance } from "axios";
import { ElLoading } from "element-plus";

import { TIMEOUT, BASE_URL } from "./config";

let Loading = null;

const instance: AxiosInstance = axios.create({
	timeout: TIMEOUT,
	baseURL: BASE_URL
});

// 请求拦截器
instance.interceptors.request.use(config => {
	// 1.发送网络请求时，在页面中添加一个loading组件作为动画；
	Loading = ElLoading.service({
		lock: true,
		text: "Loading",
		background: "rgba(254, 254, 255, .7)"
	});
	// 2.统一在请求头中 携带token发送网络请求
	config.headers.Authorization = window.localStorage.getItem("token");
	return config;
}, err => {
	return err;
});

// 响应拦截器
instance.interceptors.response.use(response => {
	// 关闭loading
	Loading.close();

	let data = response.data;

	switch (data.code) {
		case 400:
			return console.log("请求错误");
		case 401:
			return console.log("请求错误");
	}

	return data;

}, err => {
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				err.message = "请求错误";
				break;
			case 401:
				err.message = "未授权访问";
				break;
			default:
				console.log("其他错误信息");
		}
	}
	return err;
});

export default instance;
