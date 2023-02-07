import { useState, useEffect } from 'react'
import axios from 'axios' 
import services from './Services/services'

// TODO extract the search filter
const Filter = (props) => {
  return(
    <div>
      Filter shown with: <input value={props.filter} onChange={props.onChange} type="text" />
    </div>
  )
} 
// TODO extract the form for adding new people to the phonebook
const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          name: <input value={props.newName} onChange={props.changeName} type="text" />
        </div>
        <div>
          phone number: <input value = {props.newPhoneNumber} onChange={props.changePhoneNumber} type="text"/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

// TODO extract a component that renders all people from the phonebook
const Persons = (props) => {
  const deleteSubmit = (id) => {
    const resourceURL = `http://localhost:3001/persons/${id}`
    const resourceToDelete = props.showPerson.find((x)=>x.id==id)
    if (window.confirm(`Delete ${resourceToDelete.name} ?`)) {  
      axios
        .delete(resourceURL)
    }
  }
  
  return (
    <div>
        {props.showPerson.map((x) =>  {
          return (  
            <div key={x.id}> 
              <p>{x.name} {x.number} <button type='submit' onClick={()=>deleteSubmit(x.id)}> Delete </button></p> 
            </div>
          )
        })}  
    </div>
  )
}
 
const SinglePerson = (props) => {
  return(
    <div>
      <p> {props.name} {props.number} <button type='submit' onClick={props.onclick}>DELETE</button> </p>
    </div>
  )
}

const App = () => {
  
  // STATE VARIABLES
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')


  // Getting initial data of persons state variable from the server
  useEffect(() => {
    services
      .getAll('http://localhost:3001/persons')
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])


  // EVENT HANDLERS
  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changePhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const changeFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const personNames = persons.map(x=> x.name)
    if (!(personNames.includes(newName))) {
      const newPerson = {id:persons.length+1 ,name:newName, number: newPhoneNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhoneNumber('')  
      // Add the phone numbers submitted by the users to the server
      services
        .insert(newPerson)
        .then(newContact => {
          setPersons(persons.concat(newContact))
        })        
    }
    else {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewPhoneNumber('') 
    }
  }

  const showPerson = persons.filter(x => x.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  const deleteSubmit = (id) => {
    const resourceURL = `http://localhost:3001/persons/${id}`
    const resourceToDelete = showPerson.find((x)=>x.id==id)
    if (window.confirm(`Delete ${resourceToDelete.name} ?`)) {  
      axios
        .delete(resourceURL)
        .then(()=>setPersons(persons.filter((x)=>x.id !== id)))
    }
  }

  
  // RENDERING
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={changeFilter}/> 
      
      <h2>Add a new person</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} changeName={changeName} newPhoneNumber={newPhoneNumber} changePhoneNumber={changePhoneNumber} />
      
      <h2>Phone Numbers</h2>
      {showPerson.map( x=> 
        <SinglePerson key={x.id} name={x.name} number={x.number} onclick={()=>deleteSubmit(x.id)} />
      
      )}
    </div>
    
  )
}

export default App