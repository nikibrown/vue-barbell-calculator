<template>
  <button @click="emitClick">
    <span v-if="$parent.pounds" class="weight">{{ poundWeight }}
      <span class="weight-label">lb</span>
    </span>
    <span v-if="$parent.kilos" class="weight">{{ kiloWeight }}
      <span class="weight-label">kg</span>
    </span>

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
    poundWeight: {
      type: Number,
      required: true
    },
    kiloWeight: {
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

<style scoped>
.weight-lg {
  min-width: 70px;
  min-height: 70px;
}

.weight-sm {
  min-width: 50px;
  height: 50px;
}

.kilos .kilo-weight-hide {
  display: none;
}

.weight-label {
  font-size: 10px;
}
</style>
