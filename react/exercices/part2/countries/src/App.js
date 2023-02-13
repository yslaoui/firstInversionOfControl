import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowDetail = (props) => {
  
  const flag = {
    fontSize: 100
  }
  if (props.index != null) {
    const country = props.country
    const languages = Object.values(country.languages)
    console.log(languages)  
    console.log(`printing the message for the country...`)
    return(
      <div>
          <h1> {country.name.common} </h1>
          <p> capital {country.capital} </p>
          <p> area {country.area} </p>
          <span style={{fontWeight:'bold'}} > languages</span>  
          <ul>
            {languages.map((x,i)=> <li key={i} > {x} </li>)}  
          </ul>          
          <span style={flag}> {country.flag}</span>
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
