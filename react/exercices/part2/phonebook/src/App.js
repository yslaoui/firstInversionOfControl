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

const ErrorMessage = (props) =>  {
  const redBox = {
    borderStyle: 'solid',
    color: 'red',
    background: 'lightGrey', 
    fontSize: 20
  }
  if (props.showErrorMessage) {
    return (
      <div style={redBox}>
          <p> Information for {props.name} has already been removed from the server</p>
      </div>
    )
  }
}


const ValidationErrorMessage = (props) =>  {
  const redBox = {
    borderStyle: 'solid',
    color: 'red',
    background: 'lightGrey', 
    fontSize: 20
  }
  if (props.showValidationErrorMessage) {
    return (
      <div style={redBox}>
          <p> {props.validationErrorMessage}</p>
      </div>
    )
  }
}




const App = () => {
  
  // STATE VARIABLES
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') // name as it is written by user in input filed
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showNotification, setshowNotification] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showValidationErrorMessage, setshowValidationErrorMessage] = useState(false)
  const [validationErrorMessage, setValidationErrorMessage] = useState('')
 
  // Getting initial data of persons state variable from the server
  useEffect(() => {
    services
      .getAll()
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


  // Handler for the "Add a new person" for submission
  const handleSubmit = (event) => {
    event.preventDefault()
    const personNames = persons.map(x=> x.name)
    const phoneNumbers = persons.map(x=>x.number)
    const chosenPerson = persons.find(x=> x.name==newName)
    // Save the sumbmitted name and phone number, because you need to immedialtely clear the input fields  
    setNewName('')
    setNewPhoneNumber('') 
    console.log(`newName is ${newName}`)
    console.log(`personNames is ${personNames}`)
    console.log(`chosenPerson is ${chosenPerson}`)
    console.log(`newPhoneNumber ${newPhoneNumber}`)
    


    if ((personNames.includes(newName)) && (newPhoneNumber == chosenPerson.number)) {
      alert(`${chosenPerson.name} is already added to phonebook with phone number ${chosenPerson.number} `)
      setshowNotification(false)
      setshowValidationErrorMessage(false)
    }

    else {
      if (!(personNames.includes(newName))) {
        console.log(`new person ${newName} added`)
        const newPerson = {id:Math.floor(Math.random() * 1001) ,name:newName, number: newPhoneNumber}
        // Add the phone numbers submitted by the users to the server
        services
          .insert(newPerson)
          .then(newContact => {
            setPersons(persons.concat(newContact))
            setshowNotification(true)
            setPersons(persons.concat(newPerson))    
          })
          .catch(error => {
            console.log("There is a validation problem")
            console.log(error.response.data.error)
            setshowValidationErrorMessage(true)
            setValidationErrorMessage(error.response.data.error)
            setTimeout(() => {setshowValidationErrorMessage(false)}, 3000)
          })                       
      }
      else if (!(newPhoneNumber == chosenPerson.number)) {
        console.log(`The name is the same, but the phone number different!`)
        console.log(`chosenPerson.number ${chosenPerson.number}`)
        console.log(`chosenPerson.id ${chosenPerson.id}`)
        if (window.confirm(`${newName} is already on the phone book, replace the old number with new one ?`)) {
          const resourceURL = `/persons/${chosenPerson.id}`
          const changedResource = {...chosenPerson, number:newPhoneNumber}
          services
            .update(resourceURL, changedResource) 
            .then(response=>{
              setPersons(persons.map((x)=>x.id==chosenPerson.id ? response: x))
              setshowNotification(true)
            })    
            .catch((error) => {
               setShowErrorMessage(true)
               console.log(error)
               setTimeout(()=> {
                setShowErrorMessage(false)
                setNewName('')
                setNewPhoneNumber('') 
               }, 5000)
            })
            } 
      }
      setTimeout(()=> {
        setshowNotification(false)
      } , 5000)

    }
}

  const showPerson = persons.filter(x => x.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  const deleteSubmit = (id) => {
    const resourceURL = `/persons/${id}`
    const resourceToDelete = showPerson.find((x)=>x.id == id)
    console.log(` resourceToDelete.name is ${resourceToDelete.name}`)
    console.log(` resourceToDelete.id is ${resourceToDelete.id}`)
    console.log(` resourceURL is ${resourceURL}`)
    console.log(` id is ${id}`)
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
      <ErrorMessage name={newName} showErrorMessage={showErrorMessage}  />
      <ValidationErrorMessage showValidationErrorMessage={showValidationErrorMessage} validationErrorMessage={validationErrorMessage}/>

      <PersonForm handleSubmit={handleSubmit} newName={newName} changeName={changeName} newPhoneNumber={newPhoneNumber} changePhoneNumber={changePhoneNumber} />
      
      <h2>Phone Numbers</h2>
      {showPerson.map( x=> {
        return (
          <div key={x.id}>
            <SinglePerson name={x.name} number={x.number} onclick={()=>deleteSubmit(x.id)} /> 
            <p> id is {x.id}, name is {x.name} </p>
          </div>     
        )        
      }
      )}
    </div>
    
  )
}

export default App