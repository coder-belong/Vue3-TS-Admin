<template>
	<div id="home-header">
		<div class="left">
			<div class="folding-icon">
				<el-icon @click="toggleExpand">
					<Expand v-show="isExpand" />
					<Fold v-show="!isExpand" />
				</el-icon>
			</div>
			<breadcrumb :nav-list="['系统管理', '用户管理']" />
		</div>
		<div class="right">
			<div class="icon-list">
				<el-icon>
					<ChatDotRound />
				</el-icon>
				<el-icon>
					<CollectionTag />
				</el-icon>
				<el-badge :value="12">
					<el-icon>
						<Bell />
					</el-icon>
				</el-badge>
			</div>

			<div class="avatar">
				<el-dropdown>
				<span class="el-dropdown-link">
					<el-avatar :size="30" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
					<span>coderwhy</span>
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="exitLogin">
								<el-icon>
									<CircleClose />
								</el-icon>
								退出登录
							</el-dropdown-item>
							<el-dropdown-item divided>用户信息</el-dropdown-item>
							<el-dropdown-item>系统管理</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Breadcrumb from "@/components/breadcrumb/breadcrumb.vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

// router
const router = useRouter()

// props and emits
const emit = defineEmits(["toggleExpand"]);

// data
const isExpand = ref(false);

// event handle
const toggleExpand = () => {
	isExpand.value = !isExpand.value;
	// 发射事件让父组件处理
	emit("toggleExpand", isExpand.value);
};

// 退出登录
const exitLogin = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('userInfo')
	localStorage.removeItem('userMenu')
	ElNotification({
		title: '退出成功~',
		message: '退出成功了客官，欢迎下次光临~',
		type: 'success',
	})
	router.push('/login')
}

</script>

<style scoped lang="less">
#home-header {
	display: flex;
	justify-content: space-between;
	height: 100%;
	align-items: center;
	padding: 0 15px;

	.left {
		display: flex;
		align-items: center;

		.folding-icon {
			display: flex;
			align-items: center;
			margin-right: 25px;

			.el-icon {
				font-size: 30px;

				&:hover {
					cursor: pointer;
				}
			}
		}
	}

	.right {
		display: flex;
		align-items: center;

		.icon-list {
			display: flex;
			align-items: center;
			margin-right: 30px;

			.el-icon {
				margin-right: 8px;
				font-size: 18px;
				&:hover {
					cursor: pointer;
				}
			}
		}

		.el-dropdown:deep > .el-dropdown-link {
			display: flex;
			align-items: center;
		}

		.el-avatar {
			&:hover {
				cursor: pointer;
			}

			margin-right: 10px;
		}
	}
}
</style>
