<template>
	<div id="dashboard">
		<!--商品数据统计-->
		<dashboard-amount  />
		<!--图表区域-->
		<div class="echart-box">
			<el-row :gutter="15">
				<el-col :lg="7" class="center-chart-item">
					<dashboard-pie-chart />
				</el-col>

				<el-col :lg="10" class="center-chart-item">
					<dashboard-map-chart />
				</el-col>

				<el-col :lg="7" class="center-chart-item">
					<dashboard-rose-chart />
				</el-col>
			</el-row>

			<el-row :gutter="15" class="bottom-chart">
				<el-col :lg="12">
					<dashboard-line-chart />
				</el-col>

				<el-col :lg="12">
					<dashboard-bar-chart />
				</el-col>
			</el-row>
		</div>

	</div>
</template>

<script setup>
import DashboardAmount from "./child-cpn/dashboard-amount.vue";
import DashboardPieChart from "@/views/dashboard/child-cpn/dashboard-pie-chart.vue";
import DashboardMapChart from "@/views/dashboard/child-cpn/dashboard-map-chart.vue";
import DashboardRoseChart from "@/views/dashboard/child-cpn/dashboard-rose-chart.vue";
import DashboardLineChart from "@/views/dashboard/child-cpn/dashboard-line-chart.vue";
import DashboardBarChart from "@/views/dashboard/child-cpn/dashboard-bar-chart.vue";
</script>

<style scoped lang="less">
.echart-box {
	.el-col {
		margin-bottom: 15px;
	}
}
</style>
