import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import RequestList from '@/components/RequestList'
import MockList from '@/components/MockList'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: Home
		}, {
			path: '/request/list',
			component: RequestList
		}, {
			path: '/mock/list',
			component: MockList
		}, {
			path: '*',
			redirect: '/'
		}
	]
})
