const axios = require('axios')
const handler = async (event) => {
  const { searchTerm } = event.queryStringParameters

  const API_SECRET = process.env.VUE_APP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_SECRET}&units=metric`
  try {
    const { data } = await axios.get(url)
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    const { statusCode, statusText, headers, data } = error.response
    return {
      statusCode: 404,
      body: JSON.stringify({statusCode, statusText, headers, data})
    }
  }
}

module.exports = { handler }
