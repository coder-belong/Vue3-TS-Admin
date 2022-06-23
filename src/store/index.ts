import { createStore } from "vuex";
import userModule from "@/store/user/user";

const store = createStore({
	state: () => ({}),
	mutations: {},
	getters: {},
	actions: {},
	modules: {
		user: userModule
	}
});

export function saveStoreToLocal() {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"))
	if (userInfo) {
		let id = userInfo.id
		store.dispatch("user/loadLocalData", { id });
	}
}


export default store;
