<template>
  <weather-cards />
</template>

<script>
  import WeatherCards from '../components/WeatherCards'

  export default {
    name: 'Home',

    components: {
      WeatherCards,
    },

    data () {
      return {
        apiKey: process.env.VUE_APP_API_KEY
      }
    }
  }
</script>
