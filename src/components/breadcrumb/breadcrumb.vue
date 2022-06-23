<template>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item v-for="item in navList" :key="item">{{item}}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script setup lang="ts">
// props
const props = defineProps({
	navList: Array
});

</script>

<style scoped>

</style>
