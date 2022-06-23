<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<span>分类商品的销量</span>
			</div>
		</template>

		<div ref="echartContainerRef" style="height: 400px; width: 100%"></div>
	</el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts/index.js";
import { requestCategorySale } from "@/apis/dashboard/dashboard";

const echartContainerRef = ref();
const echartData = ref([]);

const option = {
	legend: {},
	tooltip: {
		trigger: "axis",
		axisPointer: {
			type: "cross",
			label: {
				backgroundColor: "#6a7985"
			}
		}
	},
	xAxis: {
		type: "category",
		boundaryGap: false,
		data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
	},
	yAxis: {
		type: "value"
	},
	series: [
		{
			name: "分类销量统计",
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: "line",
			areaStyle: {
				// 设置填充颜色为渐变色
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[
						{
							offset: 0,
							color: "rgba(116, 190, 230)"   // 渐变色的起始颜色
						},
						{
							offset: 0.8,
							color: "rgba(116, 190, 230)"   // 渐变线的结束颜色
						}
					],
					false
				)
			}
		}
	]
};

// mounted
onMounted(async () => {
	const myChart = echarts.init(echartContainerRef.value);
	let res = await requestCategorySale();
	echartData.value = res.data;

	let newData1 = echartData.value.map(item => item.name);
	let newData2 = echartData.value.map(item => item.goodsCount);

	window.onresize = function() {
		myChart.resize();
	};


	option.xAxis.data = newData1;
	option.series[0].data = newData2;

	myChart.setOption(option);
});


// network and init work


</script>

<style scoped>

</style>
