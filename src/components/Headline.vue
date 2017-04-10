<template>
	<h1>{{ text }}</h1>
</template>

<script>
	export default {
		name: 'headline',
		props: {
			text: String
		}
	}
</script>

<style lang="scss" scoped>
	h1 {
		margin: 0 0 20px;
		font-size: 32px;
		line-height: 40px;
		text-align: center;
	}
</style>
