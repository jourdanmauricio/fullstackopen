import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'


function App() {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initalPersons => {
      setPersons(initalPersons)
    })
  }, [])
 
  const handleNotification = ({message, type}) => {
    if (type === 'success') {
      setNewName('')
      setNewNumber('')
    }
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
    const newFilter = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredPersons(newFilter)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const found = persons.find(person => person.name === newName)
    if (found !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        personService
          .update(found.id, {...personObject, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            handleNotification({message: 'Phone modified successfully', type: 'success'})
          })
          .catch(error => {
            console.log("Error", error)
            handleNotification({message: error.response.data.error, type: 'error'})
            // handleNotification({message: 'An error happened while editing the contact', type: 'error'})
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          handleNotification({message: `Added ${returnedPerson.name}`, type: 'success'})
        })
        .catch(error => {
          console.log("Error", error)
          handleNotification({message: error.response.data.error, type: 'error'})
        })
    }
  }

  const removePerson = (person) => {

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(response => {
          console.log("Response", response)
          const newPersons = persons.filter(el => el.id !== person.id)
          setPersons(newPersons)
          handleNotification({message: 'Contact deleted successfully', type: 'success'})
        })
        .catch(error => {
          console.log("Error", error)
          handleNotification({message: error.response.data.error, type: 'error'})
          //handleNotification({message: 'An error occurred while deleting the contact', type: 'error'})
        })
    
    }
  }

  const personsToShow = filter.length > 0 ? filteredPersons : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
       <h3>Add a new</h3>

      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} removePerson={removePerson} />

    </div>
  )
}

export default App
