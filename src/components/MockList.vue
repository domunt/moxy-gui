<template>
	<div id='mockList'>
		<h1>Requests</h1>
		<div class='listCount'>Count: {{ items.length }}</div>
		<ul>
			<li
					v-for='item in items'
					@click='clickItem'
			>
				<input
					type='checkbox'
					v-model='item.enabled'
					@click='toggleItem'
				> {{ item.name }}<br/>
				{{ item.request.method }}: {{ item.request.uri }} <span class='additionalInfo'>{{ item.request.webservice }} - {{ item.request.webserviceHeader }}</span><br/>
				{{ item.description }}
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'mockList',
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
	h1 {
		text-transform: uppercase;
		text-align: center;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
		background: #f4f4f4;
		border: 1px solid #eee;
		padding: 12px 15px 10px;
		transition: background .15s ease-in-out;

		&:hover {
			background: #f0f0f0;
		}

		&:nth-child(even) {
			background: #fbfbfb;

			&:hover {
				background: #f0f0f0;
			}
		}
	}

	.additionalInfo {
		color: #aaa;
		font-style: italic;
	}
</style>
