<template>
	<div id='requestList'>
		<Headline text='Requests'></Headline>

		<List :items='items'>
			<ListItem
				v-for='item in items'
				@click='clickItem'
			>
				{{ item.method }}: {{ item.requestUri }} <span class='additionalInfo'>{{ item.webservice }} - {{ item.webserviceHeader }}</span>
			</ListItem>
		</List>
	</div>
</template>

<script>
	import Headline from '@/components/Headline'
	import List from '@/components/List'
	import ListItem from '@/components/ListItem'

	export default {
		name: 'requestList',
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
				this.$http.get('http://192.168.49.13:8001/api/requests').then((response) => {
					let items = response.body

					items.forEach((item) => {
						item.webservice = ''
						try {
							item.webservice = item.requestBody.match(/<soap:Body><ns.:(\w*)/)[1]
						} catch (e) {
							// Do nothing here
						}

						item.webserviceHeader = ''
						try {
							let webserviceHeaderFragment = item.requestBody.match(/<.{0,4}header>(.*?)<\/.{0,4}header>/)[1]
							let webserviceHeaderFragments = webserviceHeaderFragment.match(/<ns.:(.*?)>(.*?)<\/ns.:.*?>/g)

							let fragmentParts
							let webserviceHeaderParts = []

							webserviceHeaderFragments.forEach((fragment) => {
								fragmentParts = fragment.match(/<ns.:(.*?)>(.*?)<\/ns.:.*?>/)
								if (fragmentParts[1] && fragmentParts[2]) {
									webserviceHeaderParts.push(fragmentParts[1] + ': ' + fragmentParts[2])
								}
							})

							item.webserviceHeader = webserviceHeaderParts.join(' | ')
						} catch (e) {
							// Do nothing here
						}
					})

					this.items = items
				}, (response) => {
					window.console.error('Requests failed to load', response)
				})
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

</style>
