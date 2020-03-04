<template>
  <button @click="emitClick" :disabled="isDisabled">
    <span>{{ text }}</span>
    {{ weight }}
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
    weight: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
