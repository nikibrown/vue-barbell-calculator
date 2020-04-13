<template>
	<button @click="emitClick">
		<span class="unit-selected">&check;</span>
		<span> {{ unitLabel }}</span>
	</button>
</template>

<script>
	export default {
		name: "Unit",

		methods: {
			emitClick: function() {
				this.$emit("click");
			}
		},

		props: {
			unitLabel: {
				type: String,
				required: true
			},
			selected: {
				type: Boolean,
				required: false
			},
			bsClasses: {
				type: String,
				default: "btn btn-secondary"
			},
			isDisabled: {
				type: Boolean,
				default: false
			}
		}
	};
</script>
