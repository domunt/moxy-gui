<template>
	<li class='listItem'>
		<slot>
			This item is empty
		</slot>
	</li>
</template>

<script>
	export default {
		name: 'list'
	}
</script>

<style lang="scss" scoped>
	li {
		list-style: none;
		display: flex;
		border-width: 1px 0 0;
		border-style: solid;
		border-color: #eee;
		padding: 18px 20px 15px;
		color: #eee;
		background: #3163a9;
		transition: background .2s ease-in-out;

		&:first-child {
			border-top-width: 0;
		}

		&:hover {
			background: #4f7cbb;
		}
	}

	.additionalInfo {
		color: #bbb;
		font-style: italic;
	}
</style>
