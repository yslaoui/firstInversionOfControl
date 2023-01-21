import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const changeInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setPersons(persons.concat({id:persons.length+1 ,name:newName}))
    setNewName('')
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={changeInput} type="text" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x) => <p key={x.id}>{x.name}</p> )}
    </div>
  )
}

export default App