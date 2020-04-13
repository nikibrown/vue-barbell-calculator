import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

Vue.use(Vuex);

Vue.config.productionTip = false;
Vue.config.devtools = true;

const store = new Vuex.Store({
	state: {
		usePounds: true
	},
	mutations: {
		initialiseStore(state) {
			// Check if the store ecists exists
			if (localStorage.getItem("store")) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(
						state,
						JSON.parse(localStorage.getItem("store"))
					)
				);
			}
		},
		usePounds(state) {
			state.usePounds = true;
		},
		useKilos(state) {
			state.usePounds = false;
		}
	}
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem("store", JSON.stringify(state));
});

new Vue({
	render: h => h(App),
	store,
	beforeCreate() {
		this.$store.commit("initialiseStore");
	}
}).$mount("#app");
