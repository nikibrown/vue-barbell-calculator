<template>
	<button @click="emitClick">
		<span v-if="$parent.pounds" class="weight"
			>{{ bullshitNumberFormating(poundWeight) }}
			<span class="weight-label">lb</span>
		</span>
		<span v-if="$parent.kilos" class="weight"
			>{{ bullshitNumberFormating(kiloWeight) }}
			<span class="weight-label">kg</span>
		</span>

		<span
			v-if="isOnBarbell"
			class="badge badge-pill badge-danger plate-quantity"
			>{{ plateCount }}</span
		>
	</button>
</template>

<script>
	export default {
		name: "Plate",

		methods: {
			emitClick: function () {
				this.$emit("click");
			},

			bullshitNumberFormating: function (decimalWithFuckingLeadingZero) {
				let stringWithNoFuckingLeadingZero = decimalWithFuckingLeadingZero
					.toString()
					.replace(/^0+/, "");
				return stringWithNoFuckingLeadingZero;
			},
		},

		props: {
			poundWeight: {
				type: Number,
				required: true,
			},
			kiloWeight: {
				type: Number,
				required: true,
			},
			plateCount: {
				type: Number,
				required: true,
			},
			bsClasses: {
				type: String,
				default: "btn btn-plate",
			},
			isOnBarbell: {
				type: Boolean,
				default: false,
			},
		},
	};
</script>
