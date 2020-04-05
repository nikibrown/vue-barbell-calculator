<template>
	<button @click="emitClick" :disabled="isDisabled">
		<span v-html="text"></span>
		<span v-if="$parent.pounds" class="weight"
			>{{ poundWeight }} <span class="weight-label">lb</span></span
		>
		<span v-if="$parent.kilos" class="weight"
			>{{ kiloWeight }} <span class="weight-label">kg</span></span
		>
	</button>
</template>

<script>
	export default {
		name: "Barbell",

		methods: {
			emitClick: function () {
				this.$emit("click");
			},
		},

		props: {
			kiloWeight: {
				type: Number,
				required: true,
			},
			poundWeight: {
				type: Number,
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
			bsClasses: {
				type: String,
				default: "btn btn-barbell",
			},
			isDisabled: {
				type: Boolean,
				default: false,
			},
		},
	};
</script>
