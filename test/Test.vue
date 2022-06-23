<template>
	<div>
		<div ref="num1Ref">0</div>
		<div id="num2">0</div>

		<ICountUp
			:delay="1000"
			:endVal="120000"
			:options="{}"
		/>
		<button @click="startClick">开始动画</button>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ICountUp from 'vue-countup-v2/src/countup';
import { CountUp } from "countup.js";

const num1Ref = ref(null);
let demo

onMounted(() => {
	demo = new CountUp(num1Ref.value, 9999, {});
	// demo = new CountUp('num2', 9999, {});
});

const startClick = () => {
	demo.start()
};

</script>

<style scoped>

</style>
