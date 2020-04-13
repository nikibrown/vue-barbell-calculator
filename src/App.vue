<template>
	<div id="app" :class="this.$store.state.usePounds ? 'pounds' : 'kilos'">
		<header id="info" :class="settings.showInfo ? 'show' : ''">
			<nav class="navbar navbar-dark bg-dark">
				<div class="app-container">
					<p v-html="textContent.moreInfo"></p>
				</div>
			</nav>
		</header>
		<header>
			<nav class="navbar navbar-dark navbar-main">
				<div class="app-container justify-content-between">
					<h1 class="navbar-brand">
						<span class="navbar-brand">{{
							textContent.appTitle
						}}</span>
					</h1>
					<button
						@click="toggleInfo"
						class="btn btn-link"
						type="button"
					>
						<i class="fas fa-info-circle"></i>
					</button>
				</div>
			</nav>
		</header>
		<main>
			<div class="total-weight">
				<div class="app-container justify-content-between">
					<nav class="navbar navbar-light navbar-total-weight">
						<h1 class>
							{{ settings.totalWeight }}
							<span class="total-weight-pounds">lb</span>
							<span class="total-weight-kilos">kg</span>
						</h1>

						<button
							@click="resetTotalWeight"
							class="btn btn-secondary btn-danger btn-sm"
						>
							<i class="fas fa-undo"></i>
						</button>
					</nav>
				</div>
			</div>
			<div class="app-container">
				<h5>{{ textContent.unitsHeadline }}</h5>

				<div
					class="unit-group"
					role="group"
					aria-label="Pounds or Kilos"
				>
					<Unit
						v-for="(unit, key) in unitItems"
						@click="selectUnits(key)"
						:class="unit.bsClasses"
						:disabled="unit.isDisabled"
						:key="key"
						:selected="unit.selected"
						:unitLabel="unit.unitLabel"
					/>
				</div>
				<h5>{{ textContent.barbellHeadline }}</h5>
				<p v-if="settings.barbellError" class="error">
					{{ textContent.barbellErrorText }}
				</p>
				<div class="form-group">
					<ul class="barbells">
						<div
							class="barbell-group"
							role="group"
							aria-label="Select barbell weight"
						>
							<Barbell
								v-for="(barbell, key) in barbellItems"
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

				<h5>{{ textContent.platesHeadline }}</h5>

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
					<p class="credits" v-html="textContent.madeWidth"></p>
				</div>
			</nav>
		</footer>
	</div>
</template>

<script>
	import Unit from "@/components/Unit.vue";
	import Barbell from "@/components/Barbell.vue";
	import Plate from "@/components/Plate.vue";

	import { unitItems } from "@/data/units";
	import { barbellItems } from "@/data/barbells";
	import { largePlates, smallPlates } from "@/data/plates";
	import { textContent } from "@/data/textContent";
	import { settings } from "@/data/settings";

	export default {
		name: "App",
		components: {
			Unit,
			Plate,
			Barbell
		},
		data: function() {
			return {
				unitItems,
				barbellItems,
				largePlates,
				smallPlates,
				textContent,
				settings
			};
		},

		methods: {
			toggleInfo() {
				this.settings.showInfo = !this.settings.showInfo;
			},

			selectUnits(key) {
				if (this.unitItems[key].unitLabel == "Pounds") {
					this.settings.pounds = true;
					this.settings.kilos = false;
					this.$store.commit("usePounds");
					this.disableUnitlButton();
				} else {
					this.settings.pounds = false;
					this.settings.kilos = true;
					this.$store.commit("useKilos");
					this.disableUnitlButton();
				}

				this.settings.unitsSelected = true;
			},

			addBarbellWeight(key) {
				this.settings.barbellSelected = true;
				this.settings.barbellError = false;
				this.barbellItems[key].text += "&check;";
				this.disableBarbellButton();
				this.disableUnitlButton();
				if (this.settings.pounds) {
					return (this.settings.totalWeight += this.barbellItems[
						key
					].poundWeight);
				} else {
					return (this.settings.totalWeight += this.barbellItems[
						key
					].kiloWeight);
				}
			},

			disableBarbellButton() {
				this.barbellItems.forEach(barbell => {
					barbell.isDisabled = true;
				});
			},

			disableUnitlButton() {
				this.unitItems.forEach(unit => {
					unit.isDisabled = true;
				});
			},

			addSmallPlateWeight(key) {
				if (this.settings.barbellSelected) {
					this.updateSmallPlateCount(key);
					if (this.settings.pounds) {
						return (this.settings.totalWeight +=
							this.smallPlates[key].poundWeight * 2);
					} else {
						return (this.settings.totalWeight +=
							this.smallPlates[key].kiloWeight * 2);
					}
				} else {
					this.settings.barbellError = !this.settings.barbellError;
				}
			},

			updateSmallPlateCount(key) {
				this.smallPlates[key].isOnBarbell = true;
				return (this.smallPlates[key].plateCount += 2);
			},

			addLargePlateWeight(key) {
				if (this.settings.barbellSelected) {
					this.updateLargePlateCount(key);
					if (this.settings.pounds) {
						return (this.settings.totalWeight +=
							this.largePlates[key].poundWeight * 2);
					} else {
						return (this.settings.totalWeight +=
							this.largePlates[key].kiloWeight * 2);
					}
				} else {
					this.settings.barbellError = !this.settings.barbellError;
				}
			},

			updateLargePlateCount(key) {
				this.largePlates[key].isOnBarbell = true;
				return (this.largePlates[key].plateCount += 2);
			},

			// TODO: refactor to have 1 add weight function and 1 updatePlate count function. Not sure if it makes sense to have seperate functions vs if/ese in 1 function.

			resetTotalWeight() {
				this.settings.barbellSelected = false;
				this.settings.unitsSelected = false;

				this.settings.kilos = false;
				this.settings.pounds = true;

				this.unitItems.forEach(unit => {
					unit.isDisabled = false;
					unit.text = "";
				});

				this.unitItems[0].text = "&check; ";

				this.smallPlates.forEach(plate => {
					plate.plateCount = 0;
					plate.isOnBarbell = false;
				});

				this.largePlates.forEach(plate => {
					plate.plateCount = 0;
					plate.isOnBarbell = false;
				});

				this.barbellItems.forEach(barbell => {
					barbell.isDisabled = false;
					barbell.text = "";
				});

				return (this.settings.totalWeight = 0);
			}
		}
	};
</script>

<style lang="scss">
	body {
		background-color: $offWhite;
		font-family: "Heebo", sans-serif;
	}
</style>
