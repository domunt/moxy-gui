import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default new VueResource({
	http: {
		// root: '/',
		headers: {
			foo: 'bar'
		}
	}
})
