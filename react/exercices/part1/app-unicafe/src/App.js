import { useState } from 'react'

const StatisticLine = (props) => {
  return( 
    <tr>
      <td> {props.text} </td>
      <td> {props.value} </td> 
    </tr>
  )
}

  

const Statistics = (props) => {
  if (props.feedback.value[3] == 0) return (<p>No feedback given</p>)
  return(
    <>
      <table>
        <tbody>
           <StatisticLine text={props.feedback.text[0]} value={props.feedback.value[0]}/> 
           <StatisticLine text={props.feedback.text[1]} value={props.feedback.value[1]}/> 
           <StatisticLine text={props.feedback.text[2]} value={props.feedback.value[2]}/> 
           <StatisticLine text={props.feedback.text[3]} value={props.feedback.value[3]}/> 
           <StatisticLine text={props.feedback.text[4]} value={props.feedback.value[4]}/> 
           <StatisticLine text={props.feedback.text[5]} value={props.feedback.value[5]}/> 
        </tbody>
      </table>
    </>
  )
}

const Button = (props) =>  <button onClick={props.handleClick}> {props.text} </button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral =   () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

 const all = good+neutral+bad
 const average = Math.round(all*100/3)/100
 const positive = Math.round((good/all)*10000)/100 + "%"

  const feedback = {
    text: ["good", "neutral", "bad", "all", "average", "positive"],
    value: [good, neutral, bad, all, average, positive]
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="Good" handleClick={handleGood}/>
      <Button text="Neutral" handleClick={handleNeutral}/>
      <Button text="Bad" handleClick={handleBad}/>
      <h1>statistics</h1>
      <Statistics feedback={feedback} ></Statistics>
    </div>
  )
}

export default App