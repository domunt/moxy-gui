<template>
	<div class='list'>
		<div class='count'>Count: {{ items.length }}</div>
		<ul>
			<slot>
				<li class='emptyList'>The list is currently empty</li>
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

<style lang="scss" scoped>
	.count {
		margin: 10px 21px 8px;
	}

	.emptyList {
		margin: 20px 0;
		text-align: center;
	}
</style>
