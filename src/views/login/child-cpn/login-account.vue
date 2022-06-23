<template>
	<div id="login-account">
		<el-form :rules="rules" :model="account" :label-width="60" ref="formRef">
			<el-form-item label="账号" prop="name">
				<el-input v-model="account.name" clearable />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="account.password" show-password clearable />
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";
import { userFormRules } from "@/utils/form-rules";
import { requestLogin } from "@/apis/login/login";

// hook
const store = useStore();

// data
// 表单数据双向绑定
const account = reactive({
	name: localStorage.getItem("name") || "coderwhy",
	password: localStorage.getItem("password") || "123456"
});
// 表单校验规则
const rules = reactive(userFormRules);
// 绑定表单组件实例
const formRef = ref();

// methods
// 登录的处理逻辑
const handleLogin = (isSavePassword: boolean) => {

	// 1. 校验表单
	formRef.value.validate(async isValid => {
		if (!isValid) {
			ElNotification({
				title: "警告",
				message: "请填写正确的信息",
				type: "warning",
				duration: 2000
			});
			return false;
		}

		// 2. 判断是否需要存储密码
		if (isSavePassword) {
			localStorage.setItem("name", account.name);
			localStorage.setItem("password", account.password);
		} else {
			localStorage.removeItem("name");
			localStorage.removeItem("password");
		}

		// 3. 发送网络请求进行登录(保存token到本地)
		let loginResult = await requestLogin(account);
		localStorage.setItem("token", loginResult.data.token);

		// 4. 携带id获取用户信息、角色菜单，保存到Vuex中,页面跳转，逻辑统一由action处理
		store.dispatch("user/saveUserDataAction", { id: loginResult.data.id });
	});
};

defineExpose({
	handleLogin
});

</script>

<style scoped>
#login-account {
	padding: 10px;
}

</style>
