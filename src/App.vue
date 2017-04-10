<template>
	<div id='app'>
		<Navigation/>
		<router-view class='view'></router-view>
	</div>
</template>

<script>
	import Navigation from '@/components/Navigation'

	export default {
		name: 'app',
		components: {
			Navigation
		}
	}
</script>

<style lang='scss'>
	@import url('https://fonts.googleapis.com/css?family=Roboto');

	html {
		box-sizing: border-box;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

	body,
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	ul,
	input {
		margin: 0;
	}

	ul {
		padding: 0;
	}

	li {
		list-style: none;
	}

	body {
		font-family: 'Roboto', sans-serif;
		font-size: 18px;
		line-height: 25px;
		color: #444;
		background-color: #f0f1f3;
	}

	a,
	a:hover,
	a:active,
	a:visited,
	a:focus,
	a:visited:hover {
		color: #778899;
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: border-bottom .2s ease-in-out;
	}

	a:hover,
	a:visited:hover {
		border-bottom: 1px solid #778899;
	}

	a.router-link-active {
		cursor: default;

		&:hover,
		&:visited:hover {
			border-bottom: 1px solid transparent;
		}
	}

	.view {
		margin: 20px;
	}
</style>
