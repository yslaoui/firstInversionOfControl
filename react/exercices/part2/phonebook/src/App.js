import { useState } from 'react' 

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
  return (
    <div>
        {props.showPerson.map((x) => <p key={x.id}>{x.name} {x.phoneNumber}</p> )}  
    </div>
  )
}
 



const App = () => {
  
  // STATE VARIABLES
  const [persons, setPersons] = useState([
    {id: 1, name: 'Arto Hellas', phoneNumber: '0634463671'},
    {id: 2, name: 'Yassine Slaoui', phoneNumber: '0701112659'},
    {id: 3, name: 'Sophia Slaoui', phoneNumber: '0789548756'},
    {id: 4, name: 'Hiba Bennis', phoneNumber: '0658745895'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      const newPerson = {id:persons.length+1 ,name:newName, phoneNumber: newPhoneNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhoneNumber('')         
    }
    else {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewPhoneNumber('') 
    }
  }

  const showPerson = persons.filter(x => x.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  
  // RENDERING
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={changeFilter}/> 
      
      <h2>Add a new person</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} changeName={changeName} newPhoneNumber={newPhoneNumber} changePhoneNumber={changePhoneNumber} />
      
      <h2>Phone Numbers</h2>
      <Persons showPerson={showPerson} />
    </div>
    
  )
}

export default App