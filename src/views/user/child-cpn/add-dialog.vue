<template>
	<el-dialog
		v-model="dialogVisible"
		title="提示"
		width="30%"
		@closed="handleClose"
		draggable
	>
		<el-form :model="formData" label-width="120px">
			<el-form-item label="用户名">
				<el-input v-model="formData.name" placeholder="请输入用户名" />
			</el-form-item>

			<el-form-item label="密码">
				<el-input v-model="formData.password" placeholder="请输入密码" show-password clearable />
			</el-form-item>

			<el-form-item label="真实姓名">
				<el-input v-model="formData.realname" placeholder="请输入真实姓名" />
			</el-form-item>

			<el-form-item label="电话号码">
				<el-input v-model="formData.cellphone" placeholder="请输入电话号码" />
			</el-form-item>

			<el-form-item label="状态">
				<el-select placeholder="请选择状态" v-model="formData.enable">
					<el-option label="正常" :value="1" />
					<el-option label="禁止" :value="0" />
				</el-select>
			</el-form-item>

			<el-form-item label="选择角色">
				<el-select v-model="formData.roleId" placeholder="请选择角色">
					<el-option label="人士" :value="1" />
					<el-option label="运营" :value="2" />
					<el-option label="超级管理员" :value="3" />
				</el-select>
			</el-form-item>

			<el-form-item label="选择部门">
				<el-select v-model="formData.departmentId" placeholder="请选择部门">
					<el-option label="临时部门" :value="1" />
					<el-option label="设计部" :value="2" />
					<el-option label="人事部" :value="3" />
					<el-option label="客服部" :value="4" />
					<el-option label="运营部" :value="5" />
					<el-option label="研发部" :value="6" />
					<el-option label="总裁办" :value="7" />
				</el-select>
			</el-form-item>

		</el-form>
		<template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElNotification } from "element-plus";

// props and emit
const emit = defineEmits(['addConfirmClick'])

// data
const dialogVisible = ref(false);
const formData = reactive({
	id: "",
	name: "",
	realname: "",
	password: "",
	cellphone: "",
	departmentId: "",
	roleId: "",
	enable: ""
});

// event handle
// 关闭对话框的回调
const handleClose = () => {
	for (let props in formData) {
		formData[props] = "";
	}
};

const confirmClick = () => {
	dialogVisible.value = false
	emit('addConfirmClick', formData)
	ElNotification({
		title: '成功',
		message: '添加成功~',
		type: 'success',
	})
}

defineExpose({
	dialogVisible
});

</script>

<style scoped>

</style>
