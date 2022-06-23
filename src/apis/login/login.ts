import request from "../request";
import type { IAccount } from "./type";

function requestLogin({ name, password }: IAccount) {
	return request({
		url: "/login",
		method: "post",
		data: {
			name,
			password
		}
	});
}

export {
	requestLogin
};
