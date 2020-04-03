<template>
    <button @click="emitClick">
        <span v-html="text"></span>
        <span>{{ unitLabel }}</span>
    </button>
</template>

<script>
export default {
    name: "Unit",

    methods: {
        emitClick: function() {
            this.$emit("click")
        }
    },

    props: {
        unitLabel: {
            type: String,
            required: true
        },
        text: {
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
}
</script>

<style lang="scss" scoped>
button span {
    color: white;
}

button:disabled {
    cursor: default;
    opacity: 0.8;
}
</style>