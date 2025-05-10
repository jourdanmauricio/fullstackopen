import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetail from './components/CountryDetail'
import Weather from './components/Weather'

function App() {
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleFiteredCountries = (text) => {
    setFilter(text)
    const countries = allCountries.filter(country => country.name.common.toLowerCase().includes(text))
    setFilteredCountries(countries)
    setCurrentCountry(null)
  } 

  const handleShowDetail = (country) => {
    setCurrentCountry(country)
  }

  return (
    <>
      <div>
        find countries: <input value={filter} onChange={(e) => handleFiteredCountries(e.target.value.toLowerCase())} />
      </div>

      {currentCountry ? ( 
      <>
        <CountryDetail country={currentCountry} />
        <Weather capital={currentCountry?.capital[0]} />
      </>
      ) : (
        filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) :  
        filteredCountries.map(country => 
          <div key={country.name.common}>{country.name.common} <button onClick={() => handleShowDetail(country)}>Show</button></div>
        )
      )} 
    </>
  )
}

export default App
