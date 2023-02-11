import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({countries}) => {
  
  const flag = {
    fontSize: 100
  }
  
  if (countries.length >=10) {
    return(
      <p> Too many matches, specify another filter </p>
    )
  }
  else if (countries.length<10 && countries.length>1) {
    console.log("Hi")
    return(
      <ul>  
        {countries.map((x,i)=> <li key={i}> {x.name.common} </li>)}
      </ul>
    )    
  }

  else if (countries.length ==1) {
    const country = countries[0]
    const languages = Object.values(country.languages)
    console.log(languages)
    return(
      <div>
          <h1> {country.name.common} </h1>
          <p> capital {country.capital} </p>
          <p> area {country.area} </p>
          <span style={{fontWeight:'bold'}} > languages</span>  
          <ul>
            {languages.map(x=> <li> {x} </li>)}  
          </ul>          
          <span style={flag}> {country.flag}</span>
      </div>
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
        <Display countries={countries}/> 
    </div>
  );
}

export default App;
