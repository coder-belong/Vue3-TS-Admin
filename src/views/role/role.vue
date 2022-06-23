<template>
	<div id="role">
		<!--搜索区域-->
		<div class="search-form main-content-card">
			<el-form label-width="120px" :inline="true" :mode="searchForm" ref="searchFormRef">
				<el-row justify="space-evenly">

					<el-col :lg="8" :md="12" :sm="24">
						<el-form-item size="large" label="角色名称">
							<el-input placeholder="请输入角色名称" v-model="searchForm.name" />
						</el-form-item>
					</el-col>
					<el-col :lg="8" :md="12" :sm="24">
						<el-form-item size="large" label="权限介绍">
							<el-input placeholder="请输入权限介绍" v-model="searchForm.intro" />
						</el-form-item>
					</el-col>

					<el-col :lg="8" :md="12" :sm="24">
						<el-form-item size="large" label="创建时间">
							<el-date-picker
								v-model="searchForm.createAt"
								type="datetimerange"
								range-separator="-"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							/>
						</el-form-item>
					</el-col>

				</el-row>

			</el-form>

			<el-row class="btn-wrap" justify="end">
				<el-button :icon="Refresh" size="large" @click="searchReset">重置</el-button>
				<el-button type="primary" :icon="Search" size="large" @click="searchClick">查询</el-button>
			</el-row>
		</div>

		<!--底部表格区域-->
		<div class="user-list main-content-card">
			<el-row class="header" justify="space-between">
				<div class="left">
					<h2 class="title">角色列表</h2>
				</div>
				<div class="right">
					<el-button type="primary" @click="addUserClick">新建角色</el-button>
					<el-icon @click="refreshTable">
						<Refresh />
					</el-icon>
				</div>
			</el-row>

			<!--表格区域-->
			<el-table :data="userList" style="width: 100%" border>
				<el-table-column type="index" label="序号" width="100" />
				<el-table-column prop="name" label="角色名"  />
				<el-table-column prop="intro" label="权限介绍" width="100" />
				<el-table-column label="创建时间" width="220">
					<template #default="scope">
						{{ formatTime(scope.row.createAt) }}
					</template>
				</el-table-column>
				<el-table-column label="更新时间" width="220">
					<template #default="scope">
						{{ formatTime(scope.row.updateAt) }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template #default="scope">
						<el-button size="small" type="primary" :icon="Edit">编辑</el-button>
						<el-button size="small" type="danger" :icon="Delete">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--分页区域-->
			<div class="pagination-content">
				<el-pagination
					v-model:currentPage="queryInfo.offset"
					v-model:page-size="queryInfo.size"
					:page-sizes="[3, 6, 9, 20]"
					small
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalCount"
					@size-change="sizeChange"
					@current-change="currentChange"
				/>
			</div>
		</div>

		<add-dialog ref="addDialogRef" />
	</div>
</template>

<script setup lang="ts">
import { Search, Refresh } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { formatTime } from "@/utils/format-data";
import { Delete, Edit } from "@element-plus/icons-vue";
import AddDialog from "@/views/user/child-cpn/add-dialog.vue";
import { requestRoleList } from "@/apis/system/system";

// data
const userList = ref([]);
const totalCount = ref(0);
const queryInfo = reactive({
	offset: 1,
	size: 10
});
const addDialogRef = ref()

// 查询表单双向绑定
const searchForm = reactive({
	name: "",
	intro: '',
});

// event handle
// 重置搜索表单
const searchReset = () => {
	for (let props in searchForm) {
		searchForm[props] = "";
	}
	_requestUserList(queryInfo);
};

// 查询按钮的点击
const searchClick = () => {
	let paramsData = { ...searchForm, ...queryInfo };
	_requestUserList(paramsData);
};

// pageSize 改变时触发
const sizeChange = (newSize) => {
	queryInfo.size = newSize;
	_requestUserList(queryInfo);
};

const currentChange = (newPage) => {
	queryInfo.offset = newPage;
	_requestUserList(queryInfo);
};

// 刷新表格
const refreshTable = () => {
	_requestUserList(queryInfo);
};

const addUserClick = () => {
	addDialogRef.value.dialogVisible = true
};


// init network
_requestUserList(queryInfo);

// network
async function _requestUserList(queryInfo) {
	let res = await requestRoleList({ ...queryInfo });
	userList.value = res.data.list;
	totalCount.value = res.data.totalCount;
}

</script>

<style scoped lang="less">
#role {
	.search-form {

		.el-form-item {
			padding: 10px;

			.el-input, .el-select, .el-date-picker {
				width: 230px;
			}

			:deep .el-date-editor {
				width: 210px;
			}
		}
	}

	.user-list {
		margin-top: 20px;

		.header {
			margin-bottom: 14px;

			.right {
				.el-icon {
					margin-left: 14px;
					color: #59a6c5;

					&:hover {
						cursor: pointer;
						color: skyblue;
					}
				}
			}
		}

		.el-table:deep .el-table__cell {
			text-align: center;
			padding: 14px 0;
		}

		.pagination-content {
			margin-top: 24px;

			.el-pagination {
				justify-content: end;
			}
		}
	}
}
</style>
