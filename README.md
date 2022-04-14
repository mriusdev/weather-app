# Vue Material UI Weather Forecast Site
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D&style=flat)
![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=AEDDFF&style=flat)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white&style=flat)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=00C7B7&style=flat)

A website I've built using [OpenWeather API](https://openweathermap.org/api), [Vue.js](https://vuejs.org/) and [Vuetify](https://vuetifyjs.com/en/) that is hosted on [Netlify](https://www.netlify.com/)

<b>[See Live Site](https://amazing-cupcake-92945c.netlify.app/) </b>
<br />

## 🪞 The Look
A short video of how the site functions

![Weather site video](/git-assets/weather-site-video.mov)
<br />

## 📚 What I've Learned

The main goal with this project was to get more familiar with Vue, API handling and JavaScript based CSS frameworks such as Vuetify

<b>Vuetify - Material UI</b> <br />
I really enjoyed learning how to use Vuetify and applying said knowledge to the project itself. The hardest part was using props to make certain elements responsive, however it was definitely worth it in the end. I'll definitely try using grid instead of flex for my future projects.

<b>Vue.js</b> <br />
During development, I came across some bugs such as the view rendering before the data is fetched. I solved it by researching synchronous functions and implementing them so that the content would load up only once the data has been fully fetched.

<b>API</b> <br />
Getting the right data to show up from the API calls was a fantastic learning experience. In addition, I also learned about environmental variables and hiding API keys with Netlify functions for security purposes
<br />

## 💭 Potential Future Features
- A dark mode switch that changes the theme from light to dark mode
- An automatic theme switch based on the searched location of the weather forecast
<br />

## ⚙️ Project setup

The .env.example file should get renamed to .env and VUE_APP_API_KEY= should be replaced with your own API key from [OpenWeather API](https://openweathermap.org/api)

Then, the getCurrentForecast() get7DayForecastDetailed() functions and the data() function of Vue should be changed as per [this commit](https://github.com/mriusdev/weather-app/blob/e45d0a326804383eaf4e127e59e63a6e71916bb5/src/components/WeatherCards.vue#L337) <br />
<br />
Then proceed with the following steps below: <br />
<br />
### Installs project's dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
