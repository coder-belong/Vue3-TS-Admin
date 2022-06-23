<template>
	<div id="dashboard-amount">
		<el-row :gutter="10">
			<el-col :lg="6" :md="12" v-for="item in amountData" :key="item.title" class="goods-amount">
				<el-card>
					<template #header>
						<div class="card-header">
							<span>{{ item.title }}</span>
							<el-tooltip :content="item.tips" placement="top" effect="light">
								<el-icon>
									<Warning />
								</el-icon>
							</el-tooltip>
						</div>
						<ICountUp class="number1" :endVal="item.number1" :options="{prefix: item.title === '商品总销售额' ? '￥' : ''}" />
					</template>
					<div class="desc">
						<span>{{ item.subtitle }}</span>
						<ICountUp class="number2" :endVal="item.number2" :options="{prefix: item.title === '商品总销售额' ? '￥' : ''}" />
					</div>
				</el-card>
			</el-col>
		</el-row>

	</div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import ICountUp from "vue-countup-v2/src/countup.vue";
import { requestGoodsAmount } from "@/apis/dashboard/dashboard";
import eventbus from "@/utils/eventbus";

// data
const amountData = ref([]);
const number1Ref = ref();


onMounted(async () => {
	let res = await requestGoodsAmount();
	amountData.value = res.data;
	nextTick(() =>{
		eventbus.emit('amountRendered')
	})
});

</script>

<style scoped lang="less">
#dashboard-amount {
	.el-col {
		margin-bottom: 18px;
	}

	.el-card {
		border-radius: 10px;

		&:hover {
			cursor: pointer;
			box-shadow: 0 0 8px 0 deepskyblue;
		}

		.card-header {
			display: flex;
			justify-content: space-between;
			color: rgb(163, 163, 163);
			font-size: 14px;
			margin-bottom: 10px;


			.el-icon {
				cursor: pointer;
			}
		}

		.number1 {
			font-size: 17px;
			font-weight: bold;
		}

		.desc {
			font-size: 14px;
		}


	}


}

</style>
