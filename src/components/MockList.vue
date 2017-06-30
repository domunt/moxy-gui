<template>
	<div id='mockList'>
		<Headline text='Mocks'/>

		<List :items='items'>
			<ListItem
				v-for='item in items'
			>
				<div class='content'>
					<p>{{ item.name }}</p>
					<p>{{ item.description }}</p>
					<p>{{ item.request.method }}: {{ item.request.uri }} <span class='additionalInfo'>{{ item.request.webservice }} - {{ item.request.webserviceHeader }}</span></p>
				</div>
				<div class='actions'>
					<div class='buttonWrapper'>
						<button
							v-if='item.enabled'
							@click='disable'
							:data-item='item.id'
						>
							Disable
						</button>
						<button
							v-if='!item.enabled'
							@click='enable'
							:data-item='item.id'
						>
							Enable
						</button>
						<button
							@click='show'
							:data-item='item.id'
						>
							Show
						</button>
						<button
							@click='remove'
							:data-item='item.id'
						>
							Remove
						</button>
					</div>
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
			enable (event) {
				let id = event.target.getAttribute('data-item')

				if (!id) {
					throw new Error('Item id not found')
				}

				// ToDo: OPTIONS must be handled on the server due to CORS
				this.$http.put('http://192.168.49.13:8001/api/mocks/' + id + '/enable').then((response) => {
					// Edit the item.enabled here
				}, (response) => {
					window.console.error('Mock failed to enable', response)
				})
			},
			disable (event) {
				let id = event.target.getAttribute('data-item')

				if (!id) {
					throw new Error('Item id not found')
				}

				// ToDo: OPTIONS must be handled on the server due to CORS
				this.$http.put('http://192.168.49.13:8001/api/mocks/' + id + '/disable').then((response) => {
					// Edit the item.enabled here
				}, (response) => {
					window.console.error('Mock failed to disable', response)
				})
			},
			show (event) {
				window.console.info('show item')
			},
			remove (event) {
				window.console.info('remove item')
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
	.content {
		flex-grow: 1;
	}

	.actions {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.buttonWrapper {
		white-space: nowrap;
	}
	
	button {
		display: inline;
		vertical-align: text-top;
	}
</style>
