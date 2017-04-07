<template>
	<div class='list'>
		<div class='count'>Count: {{ items.length }}</div>
		<ul>
			<slot>
				The list is currently empty
			</slot>
		</ul>
		<div class='count'>Count: {{ items.length }}</div>
	</div>
</template>

<script>
	export default {
		name: 'list',
		props: {
			'items': Array
		}
	}
</script>

<style type="scss" scoped>
	.count {
		margin: 10px 21px 8px;
	}

	ul {
		margin: 0;
		padding: 0;
	}
</style>
