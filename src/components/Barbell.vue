<template>
  <button @click="emitClick" :disabled="isDisabled">
    <span v-html="text"></span>
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

<style scoped>
button span {
  color: white;
}
button:disabled {
  cursor: default;
  opacity: 1;
}
</style>
