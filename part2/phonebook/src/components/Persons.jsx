const Persons = ({personsToShow, removePerson}) => {
  return (
    <div>
      {personsToShow.map(person => 
        <div key={person.id}>{person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button></div>
      )}
    </div>
  )
}

export default Persons
