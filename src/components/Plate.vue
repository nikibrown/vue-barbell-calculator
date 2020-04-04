<template>
  <button @click="emitClick">
    <span v-if="$parent.pounds" class="weight">{{ bullshitNumberFormating(poundWeight) }}
      <span class="weight-label">lb</span>
    </span>
    <span v-if="$parent.kilos" class="weight">{{ bullshitNumberFormating(kiloWeight) }}
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
    },

    bullshitNumberFormating: function(decimalWithFuckingLeadingZero) {
      let stringWithNoFuckingLeadingZero = decimalWithFuckingLeadingZero.toString().replace(/^0+/, '')
      return stringWithNoFuckingLeadingZero
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

<style lang="scss" scoped>
@import "../styles/colors.scss";

.btn-plate {
  color: $white;
  &:hover {
    color: $white;
  }
}

.weight-lg {
  border: 5px solid;
  min-width: 100px;
  min-height: 100px;
}

.weight-sm {
  
  background-color: $darkGray;
  border: 3px solid;
  border-color: darken($darkGray, 10%);
  min-width: 70px;
  min-height: 70px;
  &:hover {
    background-color: darken($darkGray, 10%);
  }
}


@media screen and (max-width: 900px) {
    .weight-lg,
    .weight-sm {
      border-width: 3px;
      font-size: 14px;
      min-width: 70px;
      min-height: 70px;
      margin: 3px;
    }
}

@media screen and (max-width: 450px) {
    .weight-lg,
    .weight-sm {
      font-size: 14px;
      min-width: 70px;
      min-height: 70px;
      margin: 8px;
    }
}

.kilos .kilo-weight-hide {
  display: none;
}

.weight-label {
  font-size: 10px;
}

.pound-weight-55 {
  background-color: $red;
  border-color: darken($red, 10%);
  &:hover {
    background-color: darken($red, 10%);
  }
}

.pound-weight-45 {
  background-color: $blue;
  border-color: darken($blue, 10%);
  &:hover {
    background-color: darken($blue, 10%);
  }
}

.pound-weight-35 {
  background-color: $yellow;
  border-color: darken($yellow, 10%);
  &:hover {
    background-color: darken($yellow, 10%);
  }
}

.pound-weight-25 {
  background-color: $green;
  border-color: darken($green, 10%);
  &:hover {
    background-color: darken($green, 10%);
  }
}

.pound-weight-15,
.pound-weight-10 {
  background-color: $darkGray;
  border-color: darken($darkGray, 10%);
  &:hover {
    background-color: darken($darkGray, 10%);
  }
}


</style>
