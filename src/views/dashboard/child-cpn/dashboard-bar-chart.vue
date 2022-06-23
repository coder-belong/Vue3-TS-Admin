<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<span>分类商品的收藏</span>
			</div>
		</template>

		<div ref="echartContainerRef" style="height: 400px; width: 100%"></div>
	</el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from 'echarts/index.js'
import { requestCategoryCollect } from "@/apis/dashboard/dashboard";

const echartContainerRef = ref()
const echartData = ref([])


let dataAxis = []
let data = []
let yMax = 500;
let dataShadow = [];
for (let i = 0; i < data.length; i++) {
	dataShadow.push(yMax);
}

const option = {
	tooltip: {},
	title: {
		text: '支持鼠标滚动缩放',
		subtext: 'this is by belong'
	},
	xAxis: {
		data: dataAxis,
		axisLabel: {
			inside: true,
			color: '#fff'
		},
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		},
		z: 10
	},
	yAxis: {
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			color: '#999'
		}
	},
	dataZoom: [
		{
			type: 'inside'
		}
	],
	series: [
		{
			type: 'bar',
			showBackground: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' }
				])
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' }
					])
				}
			},
			data: data
		}
	]
};
// Enable data zoom when user click bar.
const zoomSize = 6;

// mounted
onMounted(async () => {
	const myChart = echarts.init(echartContainerRef.value)
	let res = await requestCategoryCollect()
	echartData.value = res.data

	let newData1 = echartData.value.map(item => item.name)
	let newData2 = echartData.value.map(item => item.goodsFavor)

	option.xAxis.data = newData1
	option.series[0].data = newData2

	window.onresize = function() {
		myChart.resize();
	};

	myChart.setOption(option)

	myChart.on('click', function (params) {
		myChart.dispatchAction({
			type: 'dataZoom',
			startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
			endValue:
				dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
		});
	});
})


// network and init work




</script>

<style scoped>

</style>
