<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<span>分类商品数量(饼图)</span>
			</div>
		</template>

		<div ref="echartContainerRef" style="height: 300px; width: 100%"></div>
	</el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from 'echarts/index.js'
import { requestCategoryAmount } from "@/apis/dashboard/dashboard";

const echartContainerRef = ref()
const echartData = ref([])

const option = {
	tooltip: {
		trigger: 'item'
	},
	legend: {
		orient: 'horizontal',
		left: 'left'
	},
	series: [
		{
			name: '访问来源',
			type: 'pie',
			radius: '50%',
			bottom: '-10%',
			data: [
				{ value: 1048, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
				{ value: 484, name: 'Union Ads' },
				{ value: 300, name: 'Video Ads' }
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
	]
};

// mounted
onMounted(async () => {
	const myChart = echarts.init(echartContainerRef.value)
	let res = await requestCategoryAmount()
	echartData.value = res.data

	window.onresize = function() {
		myChart.resize();
	};

	let newData = echartData.value.map(item => ({
		value: item.goodsCount,
		name: item.name
	}))

	option.series[0].data = newData

	myChart.setOption(option)
})


// network and init work




</script>

<style scoped>

</style>
