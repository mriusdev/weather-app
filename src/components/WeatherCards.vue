<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" align="center">
        <v-sheet
          color="warning"
          height="100"
          width="400"
          class="d-flex justify-center align-center"
          rounded
          v-if="!showData"
        >
          <v-text-field
            label="Prepend inner"
            prepend-inner-icon="mdi-magnify"
            solo
            class="ma-0 pa-0 lel"
            height="30"
            hide-details
            v-model="searchLocation"
            @keydown.enter.prevent="submit"
            :style="{backgroundColor:'red'}"
            background-color="rgb(95, 6, 6)"
            dark
          ></v-text-field>
        </v-sheet>
        <transition name="slide-fade">
          <div class="d-flex flex-column justify-center align-center" v-if="showData">
            <div class="d-flex justify-center align-center">
              <v-sheet
                color="warning"
                height="150"
                width="400"
                class="d-flex flex-column justify-center align-start px-5 mr-4"
                rounded
                elevation="2"
              >
                <h1>{{fetchedData.name}}</h1>
                {{fetchedData.main.temp}} &#8451;

                <div class="d-flex ustify-center align-center">
                  {{fetchedData.weather[0].description}}
                  <v-img
                    max-height="40"
                    max-width="40"
                    :src="`https://openweathermap.org/img/wn/${fetchedData.weather[0].icon}@2x.png`"
                  ></v-img>
                </div>
              </v-sheet>

              <v-sheet
                color="warning"
                height="300"
                width="400"
                rounded
                elevation="2"
                class="d-flex flex-column justify-space-between align-center py-5 px-5"
              >
                <div class="test d-flex justify-space-between align-center">
                  <span class="font-weight-bold">HUMIDITY</span>
                  <span>{{fetchedData.main.humidity}} %</span>
                </div>

                <div class="test d-flex justify-space-between align-center">
                  <span class="font-weight-bold">FEELS LIKE</span>
                  <span>{{fetchedData.main.feels_like}} &#8451;</span>
                </div>

                <div class="test d-flex justify-space-between align-center">
                  <span class="font-weight-bold">WIND</span>
                  <span>{{fetchedData.wind.speed}} m/s</span>
                </div>

                <v-sheet
                  class="px-auto"
                  max-width="370"
                >
                  <v-slide-group
                    multiple
                    show-arrows
                  >
                    <v-slide-item
                      v-for="item in largeData.list"
                      :key="item.id"
                    >
                      <div class="d-flex flex-column justify-center align-center testas px-2">
                        <span>
                          {{ getTime(item.dt_txt) }}
                        </span>
                        <v-img
                          max-height="40"
                          max-width="40"
                          :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
                        ></v-img>
                        <span class="blue--text text--lighten-2" v-text="getPercent(item.pop)">
                        </span>
                      </div>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>

                <v-btn
                  elevation="2"
                  @click="overlay = true"
                >
                  Change Location
                </v-btn>
              </v-sheet>
            </div>

            <!-- 4 DAY FORECAST NOT YET AVAILABLE BUT WORKING ON IT-->
            <!-- <v-sheet
              color="warning"
              height="150"
              width="400"
              class="d-flex flex-column justify-center align-start px-5"
              rounded
              elevation="2"
            >
              <h1>placeholder</h1>
            </v-sheet> -->
          </div>

        </transition>

        <v-overlay
          :value="overlay"
        >
          <v-sheet
            color="warning"
            height="900"
            width="400"
            class="d-flex justify-center align-start"
            rounded
            v-click-outside="turnOffOverlay"
          >
            <v-text-field
              label="Prepend inner"
              prepend-inner-icon="mdi-magnify"
              solo
              class="ma-0 pa-0 lel"
              height="30"
              hide-details
              v-model="searchLocation"
              @keydown.enter.prevent="submit"
              :style="{backgroundColor:'red'}"
              background-color="rgb(95, 6, 6)"
              dark
            ></v-text-field>
          </v-sheet>
        </v-overlay>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'WeatherCards',

    data () {
      return {
        searchLocation: '',
        apiKey: process.env.VUE_APP_API_KEY,
        fetchedData: {},
        largeData: {},
        isLargeDataFetched: false,
        showData: false,
        overlay: false,
        loading: false,
        timeOfDay: '',
      }
    },

    methods: {
      getTimeOfDay() {
        const iconName = this.fetchedData.weather[0].icon
        if (iconName.includes('d')) {
          this.timeOfDay = 'day'
        } else {
          this.timeOfDay = 'night'
        }
      },
      getPercent(precipitation) {
        const percent = Math.trunc(precipitation * 100)
        if (percent > 0) {
          return percent + ' %'
        }
      },
      getTime(time) {
        if (this.largeData) {
          const timeArray = time.split(" ")
          const timeLast = timeArray[1]
          return timeLast.slice(0, 2)
        }
      },
      turnOffOverlay() {
        this.overlay = false
      },
      submit() {
        this.isLargeDataFetched = false
        this.$axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.searchLocation}&appid=${this.apiKey}&units=metric`)
        .then(res => {
          if (this.overlay) {
            this.overlay = false
            this.loading = true
          }
          this.showData = true
          this.searchLocation = ''
          this.fetchedData = res.data
          this.getTimeOfDay()
          const locationData = this.fetchedData.coord
          this.getMore(locationData)
          console.log(res.data)
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
      },
      getMore(coordinatesObject) {
        this.$axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinatesObject.lat}&lon=${coordinatesObject.lon}&appid=${this.apiKey}&units=metric`)
        .then(res => {
          this.largeData = res.data
          this.isLargeDataFetched = true
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    
  }
</script>

<style scoped>


/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.test {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
}

</style>
