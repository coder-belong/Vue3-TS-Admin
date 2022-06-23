<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<span>分类商品数量(玫瑰图)</span>
			</div>
		</template>

		<div ref="echartContainerRef" style="height: 300px; width: 100%"></div>
	</el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts/index.js";
import { requestCategoryAmount } from "@/apis/dashboard/dashboard";

const echartContainerRef = ref();
const echartData = ref([]);

const option = {
	tooltip: {},
	toolbox: {
		show: true,
		feature: {
			mark: { show: true },
			dataView: { show: true, readOnly: false },
			restore: { show: true },
			saveAsImage: { show: true }
		}
	},
	series: [
		{
			label: {
				show: false
			},
			labelLine: {
				show: false
			},
			name: "访问来源",
			type: "pie",
			radius: [10, 150],
			center: ["50%", "50%"],
			roseType: "area",
			itemStyle: {
				borderRadius: 10
			},
			data: [
				{ value: 40, name: "rose 1" },
				{ value: 38, name: "rose 2" },
				{ value: 32, name: "rose 3" },
				{ value: 30, name: "rose 4" },
				{ value: 28, name: "rose 5" },
				{ value: 26, name: "rose 6" },
				{ value: 22, name: "rose 7" },
				{ value: 18, name: "rose 8" }
			]
		}
	]
};

// mounted
onMounted(async () => {
	const myChart = echarts.init(echartContainerRef.value);
	let res = await requestCategoryAmount();
	echartData.value = res.data;

	let newData = echartData.value.map(item => ({
		value: item.goodsCount,
		name: item.name
	}));

	window.onresize = function() {
		myChart.resize();
	};

	option.series[0].data = newData;

	myChart.setOption(option);
});


// network and init work


</script>

<style scoped>
.el-card {
	cursor: pointer;
}
</style>
