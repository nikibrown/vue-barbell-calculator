<template>
  <button @click="emitClick">
    {{ weight }}
    <span
      v-if="isOnBarbell"
      class="badge badge-pill badge-danger plate-quantity"
    >{{ plateCount }}</span>
  </button>
</template>

<script>
export default {
  name: "Plate",

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
    plateCount: {
      type: Number,
      required: true
    },
    bsClasses: {
      type: String,
      default: "btn btn-plate"
    },
    isOnBarbell: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weight-lg {
  min-width: 70px;
  min-height: 70px;
}

.weight-sm {
  min-width: 50px;
  height: 50px;
}
</style>
