<template>
    <div id="app" :class="pounds ? 'pounds' : 'kilos'">
        <header id="settings" :class="showSettings ? 'show' : ''">
            <nav class="navbar navbar-dark bg-dark">
                <div class="app-container">
                    <h5>{{weightSystem}}</h5>
                    <div class="unit-group" role="group" aria-label="Pounds or Kilos">
                        <Unit
                            v-for="(unit, key) in units"
                            @click="selectUnits(key)"
                            :class="unit.bsClasses"
                            :disabled="unit.isDisabled"
                            :key="key"
                            :text="unit.text"
                            :selected="unit.selected"
                            :unitLabel="unit.unitLabel"
                        />

                    </div>
                </div>
            </nav>
        </header>
        <header>
            <nav class="navbar navbar-dark navbar-main">
                <div class="app-container justify-content-between">
                    <h1 class="navbar-brand">
                        <span class="navbar-brand">{{ appTitle }}</span>
                    </h1>
                     <button 
                        @click="toggleSettings" 
                        class="tn btn-link"
                        type="button"
                    >
                        <i class="fas fa-cog"></i>
                    </button>
                </div>
            </nav>
        </header>
        <main>
            <div class="total-weight">
                <div class="app-container justify-content-between">
                    <nav class="navbar navbar-light navbar-main">
                        <h1 class="">
                            {{ totalWeight }}
                            <span v-if="pounds">lb</span>
                            <span v-else>kg</span>
                        </h1>

                        <button @click="resetTotalWeight" class="btn btn-secondary btn-danger btn-sm">
                            <i class="fas fa-undo"></i>
                        </button>
                    </nav>
                </div>
            </div>
            <div class="app-container">
               <h5>{{barbellHeadline}}</h5>
               <p v-if="barbellError" class="error" >{{barbellErrorText}}</p>
                <div class="form-group">
                    <ul class="barbells">
                        
                        <div class="barbell-group" role="group" aria-label="Select barbell weight">
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

                <h5>{{platesHeadline}}</h5>

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
            </div>
        </main>
        <footer>
            <nav class="navbar navbar-dark">
                <div class="app-container">

                    <p class="credits">
                        <span>Made with: </span>
                        <span>
                            <i class="fab fa-vuejs"></i>
                        </span>
                        <span>
                            <a href="https://github.com/nikibrown/vue-barbell-calculator" target="_blank">
                                <i class="fab fa-github"></i>
                            </a>
                        </span>
                        <span>
                            <i class="fas fa-info-circle"></i>
                        </span>
                        
                    </p>
                </div>
            </nav>
        </footer>
    </div>
</template>

<script>
import Unit from "./components/Unit.vue"
import Barbell from "./components/Barbell.vue"
import Plate from "./components/Plate.vue"

export default {
    name: "App",
    components: {
        Unit,
        Plate,
        Barbell
    },
    data: function() {
        return {
            appTitle: "Barbell Calculator",
            weightSystem: "Units of Measurement",
            barbellHeadline: "Barbells",
            barbellError: false,
            barbellErrorText: "Please select a barbell first!",
            platesHeadline: "Plates",
            platesSubHeadline:
                "Only count weight on one side of the bar, we do the math! (x 2). Unless you want to unevenly load the bar, but why would you do that???",
            barbellSelected: false,
            unitsSelected: false,
            pounds: true,
            kilos: false,
            showSettings: false,

            units: [
                {   
                    bsClasses: "btn btn-secondary btn-lg",
                    unitLabel: "Pounds",
                    text: "&check; ",
                    selected: true,
                    isDisabled: false
                },
                {   
                    bsClasses: "btn btn-secondary btn-lg    ",
                    unitLabel: "Kilos",
                    text: "",
                    selected: false,
                    isDisabled: false
                }
                
            ],

            barbells: [
                {
                    // TODO: make bsClasses an array to loop through?
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
                    bsClasses: "btn btn-plate weight-lg pound-weight-55 kilo-weight-25",
                    poundWeight: 55,
                    kiloWeight: 25,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate weight-lg pound-weight-45 kilo-weight-20",
                    poundWeight: 45,
                    kiloWeight: 20,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate weight-lg pound-weight-35 kilo-weight-15",
                    poundWeight: 35,
                    kiloWeight: 15,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate weight-lg pound-weight-25 kilo-weight-10",
                    poundWeight: 25,
                    kiloWeight: 10,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate weight-lg pound-weight-15 kilo-weight-hide",
                    poundWeight: 15,
                    kiloWeight: 0,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate weight-lg pound-weight-10 kilo-weight-hide",
                    poundWeight: 10,
                    kiloWeight: 0,
                    plateCount: 0,
                    isOnBarbell: false
                }
            ],

            smallPlates: [
                {
                    bsClasses: "btn btn-plate weight-sm",
                    poundWeight: 5,
                    kiloWeight: 5,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate weight-sm",
                    poundWeight: 2.5,
                    kiloWeight: 2.5,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate weight-sm",
                    poundWeight: 1,
                    kiloWeight: 2,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate weight-sm",
                    poundWeight: .75,
                    kiloWeight: 1.5,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate weight-sm",
                    poundWeight: .5,
                    kiloWeight: 1,
                    plateCount: 0,
                    isOnBarbell: false
                },
                {
                    bsClasses: "btn btn-plate weight-sm",
                    poundWeight: .25,
                    kiloWeight: .5,
                    plateCount: 0,
                    isOnBarbell: false
                }
            ],
           
            totalWeight: 0
        }
    },


    methods: {

        

         // TODO: Add method to make totalWeight an array and push values to it and then reduce?

        toggleSettings() {
            this.showSettings = !this.showSettings
        },

        selectUnits(key) {
            
            if (this.units[key].unitLabel == "Pounds") {
                this.pounds = true
                this.kilos = false
                this.disableUnitlButton()
            } else {
                this.pounds = false
                this.kilos = true
                this.disableUnitlButton()
            }
              
            this.unitsSelected = true

            // remove all checks
            this.units.forEach(unit => {
                unit.text = ""
            })

            //  then add checks to unitBtn clicked
            this.units[key].text += "&check;"
        },

        addBarbellWeight(key) {
            this.barbellSelected = true
            this.barbellError = false
            this.barbells[key].text += "&check;"
            this.disableBarbellButton()
            this.disableUnitlButton()
            if (this.pounds) {
                return (this.totalWeight += this.barbells[key].poundWeight)
            } else {
                return (this.totalWeight += this.barbells[key].kiloWeight)
            }

        },

        disableBarbellButton() {
            this.barbells.forEach(barbell => {
                barbell.isDisabled = true
            })
        },

        disableUnitlButton() {
            this.units.forEach(unit => {
                unit.isDisabled = true
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
                this.barbellError = !this.barbellError
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
                this.barbellError = !this.barbellError
            }
        },

        updateLargePlateCount(key) {
            this.largePlates[key].isOnBarbell = true
            return (this.largePlates[key].plateCount += 2)
        },

        // TODO: refactor to have 1 add weight function and 1 updatePlate count function. Not sure if it makes sense to have seperate functions vs if/ese in 1 function.

        resetTotalWeight() {
            this.barbellSelected = false
            this.unitsSelected = false

            this.kilos = false
            this.pounds = true

            this.units.forEach(unit => {
                unit.isDisabled = false
                unit.text = ""
            })

            this.units[0].text = "&check; "

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

<style lang="scss">

body {
    background-color: #E1E0E0;
    font-family: 'Heebo', sans-serif;
}

#settings {
    color: $white;
    display: none;
}

#settings.show {
    display: block;
}

.navbar-main {
    background-color: $blueGray;
}

.navbar-brand {
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 1px;
}

.navbar-main  {
    background-color: $blueGray;
    .app-container {
        display: flex;
    }   
}

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

button:first-child {
    margin-left: 0;
}


.btn-lg {
    padding: 1rem;
}

.plates,
.barbells {
    flex-direction: row;
}


@media screen and (max-width: 450px) {
    .plates {
        flex-wrap: wrap;
    }
}

.credits {
    color: $white;
    margin-bottom: 0;
    text-align: center;
    width: 100%;

    i {
        font-size: 22px;
    }
}


.credits a {
    color: $white;
    &:hover {
        color: darken($white, 10%);
    }
    
}

.credits span {
    margin: 0 5px;
}

.credits a {
    display: inline;
}

.app-container {
    margin: 0 auto;
    width: 60vw;
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

.total-weight {
    margin: 20px 0;
} 

.total-weight .navbar {
    background-color: #C4C4C4;
    border-radius: .3rem;
}

.total-weight h1 {
    line-height: 1;
    margin-bottom: 0;
}

.error {
    color: red;
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
    margin: 10px;
}

.btn:focus,
.btn:active,
.btn:not([disabled]):not(.disabled):active {
    box-shadow: none !important;
}

.btn[disabled]:hover {
    cursor: not-allowed;
}

.btn .badge {
    position: absolute;
    bottom: -5px;
    right: -5px;
    z-index: 10;
    top: auto;
    height: 19px;
}

.btn-link {
    background: none;
    border: none;
    color: #fff;
}

.btn-link:hover,
.btn-link:focus {
    color: rgba(255,255,255,.8);
    outline: none;
}

footer {
    margin-top: 40px;
    .navbar {
        background-color: $blueGray;
        padding: 15px;
    }
}
</style>
