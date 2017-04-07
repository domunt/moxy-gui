<template>
	<nav id='navigation'>
		<router-link to='/' exact>Home</router-link> |
		<router-link to='/request/list'>Request List</router-link> |
		<router-link to='/mock/list'>Mock List</router-link>
	</nav>
</template>

<script>
	export default {
		name: 'navigation'
	}
</script>

<style lang='scss' scoped>
	nav {
		margin: 20px 0;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
</style>
