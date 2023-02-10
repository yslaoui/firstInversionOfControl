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

 
const SinglePerson = (props) => {
  return(
    <div>
      <p> {props.name} {props.number} <button type='submit' onClick={props.onclick}>DELETE</button> </p>
    </div>
  )
}

/*
 TODO 
 conditional rendering 
 if showNotification props is true
  return:  
    For 5 seconds, display message
*/ 

const Notification = (props) => {

  const greenBox = {
    borderStyle: 'solid',
    color: 'green',
    background: 'lightGrey', 
    fontSize: 20
  }
  if (props.showNotification) {
    return(
      <div style={greenBox}>
        <p> Added {props.name}</p>
      </div>
    )      
  }
}

const App = () => {
  
  // STATE VARIABLES
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [cumulativeId, setCumulativeId] = useState(0)
  const [notification, setNotification] = useState('')
  const [showNotification, setshowNotification] = useState(false)


  // Getting initial data of persons state variable from the server
  useEffect(() => {
    services
      .getAll('http://localhost:3001/persons')
      .then(initialContacts => {
        setPersons(initialContacts)
        // TODO setShowNotification to false  
          setCumulativeId(initialContacts.length)
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

/* OLD 
  if name not included
      post to server
  else if phone number is the same as included person 
      put to server new phone number
  else
     error message
*/

/*  TODO
  if name and phone number are included
    error message
    set ShowNotification to false
  else
    set showNotification to true
    if name not included
      post to server
    else if phone number is the same as included person
      put to server new phone number
*/ 

  // Handler for the "Add a new person" for submission
  const handleSubmit = (event) => {
    event.preventDefault()
    const personNames = persons.map(x=> x.name)
    const phoneNumbers = persons.map(x=>x.number)
    const chosenPerson = persons.find(x=> x.name==newName)

    if ((personNames.includes(newName)) && (newPhoneNumber == chosenPerson.number)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewPhoneNumber('') 
      setshowNotification(false)
    }

    else {
      if (!(personNames.includes(newName))) {
        const newPerson = {id:cumulativeId+1 ,name:newName, number: newPhoneNumber}
        setPersons(persons.concat(newPerson))
        setCumulativeId(cumulativeId+1)
        // Add the phone numbers submitted by the users to the server
        services
          .insert(newPerson)
          .then(newContact => {
            setPersons(persons.concat(newContact))
          })                       
      }
      // else if newPhoneNumber == chosenPerson.number
      else if (!(newPhoneNumber == chosenPerson.number)) {
        console.log(`The name is the same, but the phone number different!`)
        if (window.confirm(`${newName} is already on the phone book, replace the old number with new one `)) {
          const resourceURL = `http://localhost:3001/persons/${chosenPerson.id}`
          const changedResource = {...chosenPerson, number:newPhoneNumber}
          services
            .update(resourceURL, changedResource) 
            .then(response=>{
              setPersons(persons.map((x)=>x.id==chosenPerson.id ? response: x))})  
            } 
      }
      setshowNotification(true)
      setTimeout(()=> {
        setshowNotification(false)
        setNewName('')
        setNewPhoneNumber('') 
      } , 5000)

    }
}
/*    
    if (!(personNames.includes(newName))) {
      const newPerson = {id:cumulativeId+1 ,name:newName, number: newPhoneNumber}
      setPersons(persons.concat(newPerson))
      setCumulativeId(cumulativeId+1)
      // Add the phone numbers submitted by the users to the server
      services
        .insert(newPerson)
        .then(newContact => {
          setPersons(persons.concat(newContact))
        })        
    }
    // else if newPhoneNumber == chosenPerson.number
    else if (!(newPhoneNumber == chosenPerson.number)) {
      console.log(`The name is the same, but the phone number different!`)
      if (window.confirm(`${newName} is already on the phone book, replace the old number with new one `)) {
        const resourceURL = `http://localhost:3001/persons/${chosenPerson.id}`
        const changedResource = {...chosenPerson, number:newPhoneNumber}
        services
          .update(resourceURL, changedResource) 
          .then(response=>{
            setPersons(persons.map((x)=>x.id==chosenPerson.id ? response: x))})  
          }  
      }

    else {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewPhoneNumber('') 
    }
    setNewName('')
    setNewPhoneNumber('')  
  }
*/
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
      <Notification showNotification = {showNotification} name={newName}/>
      
      <PersonForm handleSubmit={handleSubmit} newName={newName} changeName={changeName} newPhoneNumber={newPhoneNumber} changePhoneNumber={changePhoneNumber} />
      
      <h2>Phone Numbers</h2>
      {showPerson.map( x=> 
        <SinglePerson key={x.id} name={x.name} number={x.number} onclick={()=>deleteSubmit(x.id)} /> 
      )}
      <p>{cumulativeId}</p>
    </div>
    
  )
}

export default App