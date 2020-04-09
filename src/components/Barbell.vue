<template>
	<button @click="emitClick" :disabled="isDisabled">
		<span v-html="text"></span>
		<span class="weight weight-pounds">
			{{ poundWeight }}
			<span class="weight-label">lb</span>
		</span>
		<span class="weight weight-kilos">
			{{ kiloWeight }}
			<span class="weight-label">kg</span>
		</span>
	</button>
</template>

<script>
export default {
	name: "Barbell",

	methods: {
		emitClick: function() {
			this.$emit("click");
		}
	},

	props: {
		kiloWeight: {
			type: Number,
			required: true
		},
		poundWeight: {
			type: Number,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		bsClasses: {
			type: String,
			default: "btn btn-barbell"
		},
		isDisabled: {
			type: Boolean,
			default: false
		}
	}
};
</script>
