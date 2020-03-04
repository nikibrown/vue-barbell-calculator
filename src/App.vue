<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-dark bg-dark">
        <div class="app-container">
          <h1 class="navbar-brand">
            <a href="/index.html" class="navbar-brand">{{ appTitle }}</a>
          </h1>
        </div>
      </nav>
    </header>
    <main>
      <div class="app-container">
        <div class="form-group">
          <h2>{{ barbellHeadline }}</h2>
          <ul class="barbells">
            <Barbell
              v-for="(barbell, key) in barbells"
              @click="addBarbellWeight(key)"
              :disabled="barbell.isDisabled"
              :key="key"
              :text="barbell.text"
              :weight="barbell.weight"
            />
          </ul>
        </div>

        <div class="form-group">
          <h2>{{ platesHeadline }}</h2>
          <p>{{ platesSubHeadline }}</p>

          <ul class="plates">
            <Plate
              v-for="(plate, key) in plates"
              :class="plate.bsClasses"
              @click="addPlateWeight(key)"
              :isOnBarbell="plate.isOnBarbell"
              :key="key"
              :plateCount="plate.plateCount"
              :weight="plate.weight"
            />
          </ul>
        </div>

        <div class="form-group">
          <h1>Total Weight: {{ totalWeight }}</h1>
          <button @click="resetTotalWeight">Reset</button>
        </div>
      </div>
    </main>
    <footer>
      <nav class="navbar navbar-dark bg-dark">
        <div class="app-container">
          <p class="credits">
            Made by Niki Brown
            <span class="icons">
              💻💪☕💜
              <img src="https://vuejs.org/images/logo.png" alt="Vue JS!" />
            </span>
          </p>
        </div>
      </nav>
    </footer>
  </div>
</template>

<script>
import Barbell from "./components/Barbell.vue";
import Plate from "./components/Plate.vue";

export default {
  name: "App",
  components: {
    Plate,
    Barbell
  },
  data: function() {
    return {
      appTitle: "🏋️💪 Barbell Calculator",
      barbellHeadline: "First pick your barbell weight",
      platesHeadline: "Second Pick your plates",
      platesSubHeadline:
        "Only count weight on one side of the bar, we do the math! (x 2). Unless you want to unevenly load the bar, but why would you do that???",
      barbellSelected: false,

      barbells: [
        {
          weight: 45,
          text: "",
          isDisabled: false
        },
        {
          weight: 35,
          text: "",
          isDisabled: false
        },
        {
          weight: 15,
          text: "",
          isDisabled: false
        }
      ],

      plates: [
        {
          bsClasses: "btn btn-plate btn-danger weight-lg",
          weight: 55,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-primary weight-lg",
          weight: 45,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-warning weight-lg",
          weight: 35,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-success weight-lg",
          weight: 25,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-dark weight-lg",
          weight: 15,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-dark weight-lg",
          weight: 10,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-dark weight-sm",
          weight: 5,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-dark weight-sm",
          weight: 2.5,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-dark weight-sm",
          weight: 1,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-dark weight-sm",
          weight: 0.75,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-dark weight-sm",
          weight: 0.5,
          plateCount: 0,
          isOnBarbell: false
        },
        {
          bsClasses: "btn btn-plate btn-dark weight-sm",
          weight: 0.25,
          plateCount: 0,
          isOnBarbell: false
        }
      ],
      totalWeight: 0
    };
  },

  methods: {
    addBarbellWeight(key) {
      this.barbellSelected = true;
      this.barbells[key].text += "💪";
      this.disableBarbellButton();
      return (this.totalWeight += this.barbells[key].weight);
    },

    disableBarbellButton() {
      console.log("disable buttns run");
      this.barbells.forEach(barbell => {
        barbell.isDisabled = true;
      });
    },

    addPlateWeight(key) {
      if (this.barbellSelected) {
        this.updatePlateCount(key);
        // is there a better way to get the individual weight of each plate?
        return (this.totalWeight += this.plates[key].weight * 2);
      } else {
        alert("Please select a barbell first!");
      }
    },

    updatePlateCount(key) {
      this.plates[key].isOnBarbell = true;
      return (this.plates[key].plateCount += 2);
    },

    resetTotalWeight() {
      // set barbellSelected to galse when starting over
      this.barbellSelected = false;

      // loop through each plate an set plateCount to 0 and remove from barbell
      this.plates.forEach(plate => {
        plate.plateCount = 0;
        plate.isOnBarbell = false;
      });

      // set weight to 0
      return (this.totalWeight = 0);
    }
  }
};
</script>

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";

ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

button {
  display: block;
  margin: 10px;
  position: relative;
}

.plates,
.barbells {
  flex-direction: row;
}

footer {
  bottom: 0;
  position: fixed;
  margin-top: 100px;
  width: 100%;
}

.credits {
  color: white;
  text-align: center;
}

.credits img {
  max-height: 16px;
  width: auto;
}

.credits .icons {
  display: block;
}

.app-container {
  margin: 0 auto;
  width: 50vw;
}

@media screen and (max-width: 900px) {
  .app-container {
    margin: 0 auto;
    width: 95%;
  }
}

main {
  margin: 20px 0;
}

.btn {
  position: relative;
}

.btn-dark {
  background-color: black;
  color: white;
}

.btn:hover {
  cursor: pointer;
}

.btn-plate {
  border-radius: 50%;
  border: none;
  margin: 10px;
}

.btn:focus,
.btn:active,
.btn:not([disabled]):not(.disabled):active {
  box-shadow: none !important;
}

.btn .badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  z-index: 10;
  top: auto;
  height: 19px;
}

@media screen and (max-width: 900px) {
  .btn-plate.weight-lg,
  .btn-plate.weight-sm {
    font-size: 14px;
    min-width: 39px;
    min-height: 39px;
    margin: 3px;
  }
}

@media screen and (max-width: 330px) {
  .btn-plate.weight-lg,
  .btn-plate.weight-sm {
    font-size: 12px;
    min-width: 39px;
    min-height: 39px;
    margin: 2px;
  }
}
</style>
