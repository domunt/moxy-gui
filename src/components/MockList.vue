<template>
	<div id='mockList'>
		<Headline text='Mocks'/>

		<List :items='items'>
			<ListItem
				v-for='item in items'
				@click='clickItem'
			>
				<div class='checkboxCol'>
					<input
						type='checkbox'
						v-model='item.enabled'
						@click='toggleItem'
					>
				</div>
				<div>
					<p>{{ item.name }}</p>
					<p>{{ item.description }}</p>
					<p>{{ item.request.method }}: {{ item.request.uri }} <span class='additionalInfo'>{{ item.request.webservice }} - {{ item.request.webserviceHeader }}</span></p>
				</div>
			</ListItem>
		</List>
	</div>
</template>

<script>
	import Headline from '@/components/Headline'
	import List from '@/components/List'
	import ListItem from '@/components/ListItem'

	export default {
		name: 'mockList',
		components: {
			Headline,
			List,
			ListItem
		},
		mounted () {
			this.load()
		},
		methods: {
			load () {
				this.$http.get('http://192.168.49.13:8001/api/mocks').then((response) => {
					let items = response.body

					items.forEach((item) => {
						try {
							item.request.webservice = item.request.body.match(/<soap:Body><ns.:(\w*)/)[1]
						} catch (e) {
							item.request.webservice = ''
						}

						try {
							let webserviceHeaderFragment = item.request.body.match(/<.{0,4}header>(.*?)<\/.{0,4}header>/)[1]
							let webserviceHeaderFragments = webserviceHeaderFragment.match(/<ns.:(.*?)>(.*?)<\/ns.:.*?>/g)

							let fragmentParts
							let webserviceHeaderParts = []

							webserviceHeaderFragments.forEach((fragment) => {
								fragmentParts = fragment.match(/<ns.:(.*?)>(.*?)<\/ns.:.*?>/)
								if (fragmentParts[1] && fragmentParts[2]) {
									webserviceHeaderParts.push(fragmentParts[1] + ': ' + fragmentParts[2])
								}
							})

							item.request.webserviceHeader = webserviceHeaderParts.join(' | ')
						} catch (e) {
							item.request.webserviceHeader = ''
						}
					})

					this.items = items
				}, (response) => {
					window.console.error('Mocks failed to load', response)
				})
			},
			toggleItem (event) {
				window.console.info('toggle item', event.target)
				window.console.info('checked?', this)
			},
			clickItem (event) {
				window.console.info('item clicked')
			}
		},
		data () {
			return {
				items: []
			}
		}
	}
</script>

<style lang='scss' scoped>
	.checkboxCol {
		position: relative;
		width: 35px;

		input {
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
		}
	}
</style>
