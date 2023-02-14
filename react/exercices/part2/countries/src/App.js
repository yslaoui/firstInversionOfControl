import { useState, useEffect } from 'react'
import axios from 'axios'

// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ea72343d57bd286731330f7cf88bb473


const ShowDetail = (props) => {
  
  const [temperature, setTemperature] = useState(null)
  const [wind, setWind] = useState(null)
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  const flag = {
    fontSize: 100
  }
  if (props.index != null) {
    
    const country = props.country
    const languages = Object.values(country.languages)
    const name = country.name.common
    const capital = country.capital  
    axios   
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${name}&APPID=${api_key}`)
      .then (response=> {
        setTemperature(response.data.main.temp)
        setWind(response.data.wind.speed)
        setIcon(response.data.weather[0].icon)
      })
    const celsius =  Math.round((temperature - 273.15)*10)/10  
    

    return(
      <div>
          <h1> {name} </h1>
          <p> capital {capital} </p>
          <p> area {country.area} </p>
          <span style={{fontWeight:'bold'}} > languages</span>  
          <ul>
            {languages.map((x,i)=> <li key={i} > {x} </li>)}  
          </ul>          
          <span style={flag}> {country.flag}</span>
          <h1> Weather in {country.capital}</h1>
          <p> temperature {celsius} celsius</p>
          <img src= {`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      </div>
    )  
  
  }
  
}


const Display = (props) => {
  
  const [index, setIndex] = useState(null)
  
  const flag = {
    fontSize: 100
  }

  const onclick = (clickedIndex) => {
    console.log(`You clicked me`)
    setIndex(clickedIndex)
  }
  
  if (props.countries.length >=10) {
    return(
      <p> Too many matches, specify another filter </p>
    )
  }
  else if (props.countries.length<10 && props.countries.length>1) {
    return(
      <div>
        <ul>  
          {props.countries.map((x,i)=> <li key={i}> {x.name.common}  <button onClick={()=>onclick(i)}> Show</button> </li>)}
        </ul>
        <ShowDetail country={props.countries[index]} index={index}   />      
        
      </div>
    )    
  }

  else if (props.countries.length ==1) {
    return(
      <ShowDetail country={props.countries[0]} index = {0}  />      
    )
  }
}

function App() {
  
  const [inputValue, setInputValue] = useState('')
  const [countries, setCountries] = useState([])
  
  const onChange = (event) => {
    setInputValue(event.target.value)
  }

  useEffect(()=>{
    if (inputValue) {
      axios 
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const relevant = response.data.filter(x=>x.name.common.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()))
        setCountries(relevant)        
      })
    } 
  }, [inputValue])
  
  return (
    <div>
        <p> find countries <input type="text"  value={inputValue} onChange={onChange} /></p>
        <Display countries={countries}  /> 
    </div>
  );
}

export default App;
