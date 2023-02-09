// API https://open.er-api.com/v6/latest/eur

import { useEffect, useState } from "react";
import axios from 'axios'

function App() {
  
  // State variables
  const [value, setValue] = useState('')
  const [currency, setCurrency] = useState('')
  const [rates, setRates] = useState({})
  // Event handlers
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValue('')
    setCurrency(value)
  }


  useEffect(()=> {
    if (currency) {
      axios
      .get( `https://open.er-api.com/v6/latest/${currency}`)
      .then((response)=> {
         setRates(response.data.rates)
      })
    }
  }, [currency])


  return (
    <div>
      <form action="" >
          <input type="text" value = {value} onChange={onChange} /> 
          <button type='submit' onClick={handleSubmit}   >exchange rate </button>
      </form>
      <pre>
        {JSON.stringify(rates, null,2)}
      </pre>

    </div>
  );
}

export default App;
