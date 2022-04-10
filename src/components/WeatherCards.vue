<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" align="center">
        <v-sheet
          color="transparent"
          height="100"
          width="400"
          class="d-flex justify-center align-center"
          rounded
          v-if="!showData"
        >
          <v-text-field
            label="Enter location such as city"
            prepend-inner-icon="mdi-magnify"
            solo
            class="ma-0 pa-0"
            height="30"
            hide-details
            v-model="searchLocation"
            @keydown.enter.prevent="performOperations"
            :style="{backgroundColor:'red'}"
            background-color="deep-purple lighten-2"
            dark
          ></v-text-field>
        </v-sheet>
        <transition name="slide-fade">
          <div class="d-flex flex-column justify-center align-center" v-if="showData">
            <div class="d-flex justify-center align-center">
              <v-sheet
                color="white"
                height="400"
                width="400"
                class="d-flex flex-column justify-space-between align-start px-7 py-5 mr-4 rounded-lg"
                rounded
                elevation="5"
                style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
              >
                <div class="d-flex flex-column justify-center align-start">
                  <h1 v-text="getDayName(fetchedData.dt)" class="font-weight-bold blue-grey--text text--darken-3"></h1>
                  <span v-text="getDate(fetchedData.dt)" class="blue-grey--text text--darken-3"></span>
                  <div class="d-flex justify-center align-center mt-2">
                    <v-icon dense class="blue-grey--text text--darken-3">
                      mdi-map-marker
                    </v-icon>
                    <span class="blue-grey--text text--darken-3">{{fetchedData.name}}, {{fetchedData.sys.country}}</span>
                  </div>
                </div>
                <div class="d-flex flex-column justify-center align-start">
                  <v-img
                    max-height="100"
                    max-width="100"
                    :src="`https://openweathermap.org/img/wn/${fetchedData.weather[0].icon}@2x.png`"
                  ></v-img>
                  <span class="text-h2 font-weight-bold blue-grey--text text--darken-3">{{fetchedData.main.temp}}&#8451;</span>
                  <h3 class="font-weight-bold text-capitalize blue-grey--text text--darken-3">{{fetchedData.weather[0].description}}</h3>
                </div>
              </v-sheet>

              <v-sheet
                color="white"
                height="310"
                width="400"
                rounded
                elevation="5"
                class="d-flex flex-column justify-space-between align-center py-5 px-7 rounded-lg"
              >
                <div style="width: 100%" class="d-flex justify-space-between align-center">
                  <v-icon
                    dense
                    size="15"
                    class="blue-grey--text text--darken-3"
                  >
                    mdi-waves
                  </v-icon>
                  <v-sheet style="width: 100%" color="transparent" class="d-flex justify-space-between align-center px-2 py-1">
                    <span class="font-weight-bold blue-grey--text text--darken-3">Humidity</span>
                    <span class="blue-grey--text text--darken-3">{{fetchedData.main.humidity}} %</span>
                  </v-sheet>
                </div>
                
                <div style="width: 100%" class="d-flex justify-space-between align-center">
                  <v-icon
                    dense
                    size="15"
                    class="blue-grey--text text--darken-3"
                  >
                    mdi-thermometer
                  </v-icon>
                  <v-sheet style="width: 100%" color="transparent" class="d-flex justify-space-between align-center px-2 py-1">
                    <span class="font-weight-bold blue-grey--text text--darken-3">Feels Like</span>
                    <span class="blue-grey--text text--darken-3">{{fetchedData.main.feels_like}} &#8451;</span>
                  </v-sheet>
                </div>

                <div style="width: 100%" class="d-flex justify-space-between align-center">
                  <v-icon
                    dense
                    size="15"
                    class="blue-grey--text text--darken-3"
                  >
                    mdi-weather-windy
                  </v-icon>
                  <v-sheet style="width: 100%" color="transparent" class="d-flex justify-space-between align-center px-2 py-1">
                    <span class="font-weight-bold blue-grey--text text--darken-3">Wind</span>
                    <span class="blue-grey--text text--darken-3">{{fetchedData.wind.speed}} m/s</span>
                  </v-sheet>
                </div>

                <v-sheet
                  class="mt-3"
                  max-width="370"
                >
                  <v-slide-group
                    multiple
                    show-arrows
                  >
                    <v-slide-item
                      v-for="item in largeData.hourly"
                      :key="item.id"
                    >
                      <div class="d-flex flex-column justify-space-between align-center weather-100p-width px-4">
                        <span class="font-weight-bold blue-grey--text text--darken-3" style="font-size: 13px;">
                          {{ getTime(item.dt) }}
                        </span>
                        <v-img
                          max-height="35"
                          max-width="35"
                          :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
                        ></v-img>
                        <span style="font-size: 12px;" class="blue--text text--darken-3 font-weight-bold" v-text="getPercent(item.pop)">
                        </span>
                        <span style="font-size: 15px;" class="mt-1 font-weight-bold blue-grey--text text--darken-3">{{item.temp}}&#176;</span>
                      </div>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>

                <v-btn
                  @click="overlay = true"
                  class="rounded-xl mt-4"
                  style="width: 100%"
                  color="deep-purple darken-2"
                  outlined
                >
                  Change Location
                </v-btn>
              </v-sheet>
            </div>

            <div class="d-flex justify-center align-center mt-5">
              <v-sheet
                color="white"
                height="auto"
                width="400"
                class="d-flex flex-column px-5 py-5 rounded-lg px-7"
                elevation="5"

              >
                <div style="height: auto; width: 100%;">
                  <div class="d-flex py-1" style="border-bottom: 1px solid #B39DDB;">
                    <v-icon
                      size="15"
                      class="deep-purple--text text--lighten-2"
                    >
                      mdi-calendar-range
                    </v-icon>
                    <span class="ml-1 deep-purple--text text--lighten-2" style="font-size: 15px;">7-DAY FORECAST</span>
                  </div>
                  <div v-for="day in largeData.daily" :key="day.id" class="weather-100p-width weather-bottom-outline">
                    <div style="height: 60px;" class="d-flex justify-space-between align-center">
                      <span style="width: 35px;" class="font-weight-bold blue-grey--text text--darken-3" v-text="getTodayOrDayName(day.dt)"></span>

                      <div class="d-flex flex-column align-center">
                        <v-img
                        max-height="40"
                        max-width="40"
                        :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                        />
                        <span style="font-size: 12px;" class="blue--text text--darken-3 font-weight-bold" v-text="getPercent(day.pop)"/>
                      </div>
                      
                      <div class="d-flex">
                        <v-icon
                          class="blue-grey--text text--darken-3"
                          size="16"
                          dense
                        >
                          mdi-weather-night
                        </v-icon>
                        <span class="blue-grey--text text--darken-3" style="width: 65px;">{{day.temp.night}} &#8451; </span>
                      </div>

                      <div class="d-flex">
                        <v-icon
                          class="blue-grey--text text--darken-3"
                          size="16"
                          dense
                        >
                          mdi-white-balance-sunny
                        </v-icon>
                        <span class="blue-grey--text text--darken-3" style="width: 65px;">{{day.temp.day}} &#8451; </span>
                      </div>
                    </div>
                  </div>
                </div>
              </v-sheet>
            </div>
          </div>

        </transition>

        <v-overlay
          :value="overlay"
        >
          <v-sheet
            color="transparent"
            height="900"
            width="400"
            class="d-flex justify-center align-start"
            rounded
            v-click-outside="turnOffOverlay"
          >
            <v-text-field
              label="Enter location such as city"
              prepend-inner-icon="mdi-magnify"
              solo
              class="ma-0 pa-0"
              height="30"
              hide-details
              v-model="searchLocation"
              @keydown.enter.prevent="performOperations"
              :style="{backgroundColor:'red'}"
              background-color="deep-purple lighten-2"
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
      getDate(time) {
        const fetchedDate = new Date(time * 1000).toLocaleDateString('en-us', { month: "short", day: "numeric", year: "numeric" })
        return fetchedDate
      },
      getDayName(time) {
        if (this.largeData) {
          const fetchedDate = new Date(time * 1000)
          const dayName = fetchedDate.toLocaleString('en-us', { weekday: 'long' })
          return dayName
        }
      },
      getTodayOrDayName(time) {
        if (this.largeData) {
          const today = new Date()
          const fetchedDate = new Date(time * 1000)
          var isToday = (today.toDateString() === fetchedDate.toDateString())
          const dayName = fetchedDate.toLocaleString('en-us', { weekday: 'short' })
          if (isToday) {
            return 'Today'
          } else {
            return dayName
          }
        }
      },
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
          const date = new Date(time * 1000)
          const hours = date.getHours()
          return hours
        }
      },
      turnOffOverlay() {
        this.overlay = false
      },
      getCurrentForecast() {
        return new Promise((resolve) => {
          this.$axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.searchLocation}&appid=${this.apiKey}&units=metric`)
          .then(res => {
            this.fetchedData = res.data
            // If search was done within modal
            // then turn off modal after search
            if (this.overlay) {
              this.overlay = false
              this.loading = true
            }
            resolve()
          })
        })
      },
      get7DayForecastDetailed() {
        return new Promise((resolve) => {
          this.$axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.fetchedData.coord.lat}&lon=${this.fetchedData.coord.lon}&exclude=current,minutely,alerts&appid=${this.apiKey}&units=metric`)
          .then(res => {
            this.largeData = res.data
            this.isLargeDataFetched = true
            resolve()
          })
        })
      },
      async performOperations() {
        this.isLargeDataFetched = false
        await this.getCurrentForecast()
        await this.get7DayForecastDetailed()
        this.showData = true
        this.loading = false
        this.getTimeOfDay()
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

.weather-100p-width-15px-mb {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.weather-100p-width {
  width: 100%;
  height: auto;
}

.weather-bottom-outline:not(:last-child) {
  border-bottom: 1px solid #B39DDB;
}



</style>
