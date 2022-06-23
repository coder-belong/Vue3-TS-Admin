<template>
	<div id="login-phone">
		<el-form :model="phone" label-width="60">
			<el-form-item label="手机号">
				<el-input v-model="phone.phoneNumber" />
			</el-form-item>
			<el-form-item label="验证码">
				<div class="code-line">
					<el-input v-model="phone.code" />
					<el-button type="primary" class="get-btn">获取验证码</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ElNotification } from "element-plus";

const phone = reactive({
	phoneNumber: "",
	code: ""
});

const handleLogin = () => {
	ElNotification({
		title: "警告",
		message: "该功能模块暂未开发，请使用账号密码进行登录",
		type: "warning",
		duration: 2000
	});
};

defineExpose({
	handleLogin
});

</script>

<style scoped lang="less">
#login-phone {
	padding: 10px;

	.code-line {
		display: flex;

		.get-btn {
			margin-left: 8px;
		}
	}
}

</style>
