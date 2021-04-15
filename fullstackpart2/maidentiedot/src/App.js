import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const CountryInfo = ({ countries, filter, setFilter }) => {
  const taulu = filter === ''
    ? []
    : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  console.log(taulu)
  if (taulu.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (taulu.length < 10 && taulu.length > 1) {
    return (
      taulu.map(country =>
        <p key={country.alpha3Code}>{country.name} <button onClick={() => setFilter(country.name.toLowerCase())}>show</button></p>)
    )
  } else if (taulu.length === 1) {
    return (
      ShowCountryInfo(taulu[0])
    )
  }

  return (
    <p></p>
  )
}

const ShowCountryInfo = (country, ) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([{}]);

  const hook = () => {
    Axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      });
  }
  useEffect(hook, []);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p> population {country.population}</p>

      <h2>languages</h2>
      <ul>{country.languages.map(language => <li key={language.iso639_2}> {language.name} </li>)}</ul>
      <img src={country.flag} width="10%" height="10%"></img>

      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b> {weather.temperature} Celcius</p>
      <img src={weather.weather_icons}></img>
      <p><b>wind: </b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([{}]);
  const [filter, setFilter] = useState('');

  const hook = () => {
    Axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      });
  }
  useEffect(hook, []);



  const inputChangeHandler = (event) => {
    setFilter(event.target.value);
  }




  return (
    <div>
      find countries <input onChange={inputChangeHandler} />
      <CountryInfo countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App;
