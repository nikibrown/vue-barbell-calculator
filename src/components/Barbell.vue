<template>
    <button @click="emitClick" :disabled="isDisabled">
        <span v-html="text"></span>
        <span v-if="$parent.pounds" class="weight">{{ poundWeight }}</span>
        <span v-if="$parent.kilos" class="weight">{{ kiloWeight }}</span>
    </button>
</template>

<script>
export default {
    name: "Barbell",

    methods: {
        emitClick: function() {
            this.$emit("click")
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
}
</script>

<style scoped>
button span {
    color: white;
}
button:disabled {
    cursor: default;
    opacity: 0.8;
}
</style>
