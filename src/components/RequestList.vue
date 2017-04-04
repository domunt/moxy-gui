<template>
	<div id='requestList'>
		<h1>Requests</h1>
		<div class='listCount'>Count: {{ items.length }}</div>
		<ul>
			<li
					v-for='item in items'
					@click='clickItem'
			>
				{{ item.method }}: {{ item.requestUri }} <span class='additionalInfo'>{{ item.webservice }} - {{ item.webserviceHeader }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'requestList',
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
							let webserviceHeaderFragments = item.requestBody.match(/<.{0,4}header>(<ns.:(\w*?)>(.*?)<\/ns.:\w*?>)?(<ns.:(\w*?)>(.*?)<\/ns.:\w*?>)?(<ns.:(\w*?)>(.*?)<\/ns.:\w*?>)?<\/.{0,4}header>/)

							webserviceHeaderFragments.shift()

							let webserviceHeaderParts = []

							while (webserviceHeaderFragments.length > 2) {
								if (webserviceHeaderFragments[1] && webserviceHeaderFragments[2]) {
									webserviceHeaderParts.push(webserviceHeaderFragments[1] + ': ' + webserviceHeaderFragments[2])
								}
								webserviceHeaderFragments.splice(0, 3)
							}

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
