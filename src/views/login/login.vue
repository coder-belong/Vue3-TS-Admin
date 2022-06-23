<template>
	<div id="login">
		<div class="content">
			<h2 class="title">后台管理系统</h2>
			<!--面板表单区域-->
			<el-tabs type="border-card" stretch v-model="currentTab">
				<el-tab-pane name="account">
					<template #label>
						<span class="custom-tabs-label">
							<el-icon><UserFilled /></el-icon>
							<span>账号登录</span>
						</span>
					</template>
					<loginAccount ref="accountRef" />
				</el-tab-pane>

				<el-tab-pane name="phone">
					<template #label>
						<span class="custom-tabs-label">
							<el-icon><Cellphone /></el-icon>
							<span>手机登录</span>
						</span>
					</template>
					<loginPhone ref="phoneRef" />
				</el-tab-pane>

			</el-tabs>
			<!--底部区域-->
			<div class="bottom-info">
				<el-checkbox label="记住密码" v-model="isSavePassword" />
				<el-link type="primary">忘记密码</el-link>
			</div>

			<el-button type="primary" class="login-btn" size="large" @click="loginClick">立即登录</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import loginAccount from "./child-cpn/login-account.vue";
import loginPhone from "./child-cpn/login-phone.vue";

// data
const isSavePassword = ref(false);
const accountRef = ref();
const phoneRef = ref();
const currentTab = ref("account");

// methods
const loginClick = () => {
	// 登录逻辑交给子组件处理
	if (currentTab.value === "account") {
		accountRef.value.handleLogin(isSavePassword.value);
	} else {
		phoneRef.value.handleLogin();
	}
};

</script>

<style scoped lang="less">
#login {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: url('../../assets/img/login-bg.svg');

	.content {
		width: 320px;
		transform: translateY(-20%);

		.title {
			text-align: center;
			margin-bottom: 15px;
		}

		.el-tabs {
			box-shadow: 0 0 7px 0 skyblue;
		}

		.bottom-info {
			display: flex;
			justify-content: space-between;
			margin: 10px 0;
		}

		.login-btn {
			width: 100%;
		}
	}
}

</style>
