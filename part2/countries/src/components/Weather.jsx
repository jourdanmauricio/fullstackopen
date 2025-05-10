import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_OPENWEATHERMAP_KEY

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null)

  
  useEffect(() => {
    if (capital)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
        .then(response => setWeather(response.data))
        .catch(error => {
          console.log('Error', error)
        })
        

  }, [capital])

  if (!weather) return

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {weather?.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
      <p>Wind {weather?.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
