<template>
	<div id='app'>
		<Navigation/>
		<router-view></router-view>
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
	html {
		box-sizing: border-box;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

	body {
		font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
		color: #444;
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
		transition: border-bottom .15s ease-in-out;
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
</style>
