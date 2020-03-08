<template>
    <div id="app" :class="pounds ? 'pounds' : 'kilos'">
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
                    <h2>{{ weightSystem }}</h2>
                    <div class="btn-group" role="group" aria-label="Pounds or Kilos">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            @click="togglePoundsKilos()"
                        >
                            <span v-if="pounds">&check;</span>
                            Pounds
                        </button>
                        <button
                            type="button"
                            class="btn btn-secondary"
                            @click="togglePoundsKilos()"
                        >
                            <span v-if="kilos">&check;</span>
                            Kilos
                        </button>
                   </div>
                </div>
                <div class="form-group">
                    <h2>{{ barbellHeadline }}</h2>

                    <ul class="barbells">
                        <div class="btn-group" role="group" aria-label="Select barbell weight">
                            <Barbell
                                v-for="(barbell, key) in barbells"
                                :class="barbell.bsClasses"
                                @click="addBarbellWeight(key)"
                                :disabled="barbell.isDisabled"
                                :key="key"
                                :text="barbell.text"
                                :poundWeight="barbell.poundWeight"
                                :kiloWeight="barbell.kiloWeight"
                            />
                        </div>
                    </ul>
                </div>

                <h2>{{ platesHeadline }}</h2>
                <p>{{ platesSubHeadline }}</p>
                <div class="form-group">
                    <ul class="plates large-plates">
                        <Plate
                            v-for="(plate, key) in largePlates"
                            :class="plate.bsClasses"
                            @click="addLargePlateWeight(key)"
                            :isOnBarbell="plate.isOnBarbell"
                            :key="key"
                            :plateCount="plate.plateCount"
                            :poundWeight="plate.poundWeight"
                            :kiloWeight="plate.kiloWeight"
                        />
                    </ul>
                    <ul class="plates small-plates">
                        <Plate
                            v-for="(plate, key) in smallPlates"
                            :class="plate.bsClasses"
                            @click="addSmallPlateWeight(key)"
                            :isOnBarbell="plate.isOnBarbell"
                            :key="key"
                            :plateCount="plate.plateCount"
                            :poundWeight="plate.poundWeight"
                            :kiloWeight="plate.kiloWeight"
                        />
                    </ul>
                </div>

                <div class="form-group">
                    <h1>Total Weight: {{ totalWeight }}
                        <span v-if="pounds">lb</span>
                        <span v-else>kg</span>
                    </h1>
                    <button @click="resetTotalWeight" class="btn btn-secondary">Reset</button>
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
import Barbell from "./components/Barbell.vue"
import Plate from "./components/Plate.vue"

export default {
    name: "App",
    components: {
        Plate,
        Barbell
    },
    data: function() {
        return {
            appTitle: "🏋️💪 Barbell Calculator",
            weightSystem: "Select pounds / kilos",
            barbellHeadline: "Barbells",
            platesHeadline: "Second Pick your plates",
            platesSubHeadline:
                "Only count weight on one side of the bar, we do the math! (x 2). Unless you want to unevenly load the bar, but why would you do that???",
            barbellSelected: false,
            pounds: true,
            kilos: false,

            barbells: [
                {
                    // TODO: make bsClasses an array
                    kiloWeight: 20,
                    poundWeight: 45,
                    text: "",
                    isDisabled: false,
                    bsClasses: "btn btn-lg btn-barbell btn-secondary barbell-45"
                },
                {
                    kiloWeight: 15,
                    poundWeight: 35,
                    text: "",
                    isDisabled: false,
                    bsClasses: "btn btn-lg btn-barbell btn-secondary barbell-35"
                },
                {
                    kiloWeight: 6.8,
                    poundWeight: 15,
                    text: "",
                    isDisabled: false,
                    bsClasses: "btn btn-lg btn-barbell btn-secondary barbell-15"
                }
            ],

            largePlates: [
                {
                    bsClasses: "btn btn-plate btn-danger weight-lg pound-weight-55 kilo-weight-25",
                    poundWeight: 55,
                    kiloWeight: 25,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate btn-primary weight-lg pound-weight-45 kilo-weight-20",
                    poundWeight: 45,
                    kiloWeight: 20,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate btn-warning weight-lg pound-weight-35 kilo-weight-15",
                    poundWeight: 35,
                    kiloWeight: 15,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate btn-success weight-lg pound-weight-25 kilo-weight-10",
                    poundWeight: 25,
                    kiloWeight: 10,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate btn-dark weight-lg pound-weight-15 kilo-weight-hide",
                    poundWeight: 15,
                    kiloWeight: 0,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate btn-dark weight-lg pound-weight-10 kilo-weight-hide",
                    poundWeight: 10,
                    kiloWeight: 0,
                    plateCount: 0,
                    isOnBarbell: false
                }
            ],

            smallPlates: [
                {
                    bsClasses: "btn btn-plate btn-dark weight-sm",
                    poundWeight: 5,
                    kiloWeight: 5,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate btn-dark weight-sm",
                    poundWeight: 2.5,
                    kiloWeight: 2.5,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate btn-dark weight-sm",
                    poundWeight: 1,
                    kiloWeight: 2,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate btn-dark weight-sm",
                    poundWeight: .75,
                    kiloWeight: 1.5,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate btn-dark weight-sm",
                    poundWeight: .5,
                    kiloWeight: 1,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate btn-dark weight-sm",
                    poundWeight: .25,
                    kiloWeight: .5,
                    plateCount: 0,
                    isOnBarbell: false
                }
            ],
            // TODO: make totalWeight an array and push values to it and then reduce?
            totalWeight: 0
        }
    },

    methods: {
        togglePoundsKilos() {
            this.pounds = !this.pounds
            this.kilos = !this.kilos
        },

        addBarbellWeight(key) {
            this.barbellSelected = true
            this.barbells[key].text += "&check;"
            this.disableBarbellButton()
            if (this.pounds) {
                return (this.totalWeight += this.barbells[key].poundWeight)
            } else {
                return (this.totalWeight += this.barbells[key].kiloWeight)
            }

        },

        disableBarbellButton() {
            console.log("disable buttns run")
            this.barbells.forEach(barbell => {
                barbell.isDisabled = true
            })
        },

        addSmallPlateWeight(key) {
            if (this.barbellSelected) {
                this.updateSmallPlateCount(key)
                if (this.pounds) {
                    return (this.totalWeight += this.smallPlates[key].poundWeight*2)
                } else {
                    return (this.totalWeight += this.smallPlates[key].kiloWeight*2)
                }
            } else {
                alert("Please select a barbell first!")
            }
        },

        updateSmallPlateCount(key) {
            this.smallPlates[key].isOnBarbell = true
            return (this.smallPlates[key].plateCount += 2)
        },

        addLargePlateWeight(key) {
            if (this.barbellSelected) {
                this.updateLargePlateCount(key)
                if (this.pounds) {
                    return (this.totalWeight += this.largePlates[key].poundWeight*2)
                } else {
                    return (this.totalWeight += this.largePlates[key].kiloWeight*2)
                }
            } else {
                alert("Please select a barbell first!")
            }
        },

        updateLargePlateCount(key) {
            this.largePlates[key].isOnBarbell = true
            return (this.largePlates[key].plateCount += 2)
        },

        // TODO: refactor to have 1 add weight function and 1 updatePlate count function. Not sure if it makes sense to have seperate functions vs if/ese in 1 function.

        resetTotalWeight() {
            this.barbellSelected = false

            this.smallPlates.forEach(plate => {
                plate.plateCount = 0
                plate.isOnBarbell = false
            })

            this.largePlates.forEach(plate => {
                plate.plateCount = 0
                plate.isOnBarbell = false
            })

            this.barbells.forEach(barbell => {
                barbell.isDisabled = false
                barbell.text = ""
            })

            return (this.totalWeight = 0)
        }
    }
}
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
