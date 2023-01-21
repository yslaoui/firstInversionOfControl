import { useState } from 'react'


const ShowAnecdote = (props) => {
  return (
    <>
      <h1> {props.title}</h1>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes </p>
    </>
  )
}

const Button = (props) => <button onClick = {props.onclick}>{props.text}</button>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
    
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const handleNextAnecdote = () => {
    // Update first state
    const randomIndex = Math.floor(Math.random()*anecdotes.length) 
    setSelected(Math.floor(randomIndex))
  } 

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const maxAnecdoteIndex = votes.indexOf(Math.max(...votes))
 
  return (
    <div>
    <></>
      <ShowAnecdote title="Anecdote of the Day"  anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="Vote" onclick= {handleVote}></Button>
      <Button text="Next Anecdote" onclick= {handleNextAnecdote}></Button>

      <ShowAnecdote title="Anecdote with most votes"  anecdote={anecdotes[maxAnecdoteIndex]} votes={votes[maxAnecdoteIndex]} />
    </div>
    
  )
}

export default App


