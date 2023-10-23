import { useEffect, useState } from "react";
import axios from "axios";
import personService from "./services/persons";
import appStyle from "./App.css";

const Notification = ({ message }) => {
  if (message === null) return null;
  return <div className="notification">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Add a new name...");
  const [newPhone, setNewPhone] = useState("Add a new phone...");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  //handle delete
  const handleDelete = (person) => {
    const { id } = person;
    const updatedPersons = persons.filter((person) => person.id !== id);
    let result = window.confirm(`Delete ${person.name}?`);

    if (result == true) {
      personService.deleteReq(id);
      setPersons(updatedPersons);
    }
  };

  //new name
  const addNewName = (event) => {
    event.preventDefault();

    const newPersonObj = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    };

    const displayNotification = () => {
      setSuccessMessage(`${newPersonObj.name} successfully added.`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    };

    const isDuplicate = persons.some((person) => {
      return person.name === newPersonObj.name;
    });

    isDuplicate
      ? alert(`${newPersonObj.name} is already added to the phonebook!`)
      : setPersons(persons.concat(newPersonObj), displayNotification());
  };

  const handleNewNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneInput = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);

    let keyword = event.target.value.toLowerCase();

    let filteredPerson = persons.filter((person) => {
      return person.name.toLowerCase().indexOf(keyword) > -1;
    });

    setFilteredPersons(filteredPerson);
    console.log(filteredPerson);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <p>
        Filter shown with a <input onChange={handleFilter} value={filter} />
      </p>
      <form onSubmit={addNewName}>
        <div>
          name: <input onChange={handleNewNameInput} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNewPhoneInput} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {filter.length > 0 ? (
        <div>
          {filteredPersons.map((person) => {
            return (
              <p>
                Name: {person.name} | Phone: {person.number}
                <button onClick={() => handleDelete(person)}>Delete</button>
              </p>
            );
          })}
        </div>
      ) : (
        <div>
          {persons.map((person) => {
            return (
              <p>
                Name: {person.name} | Phone: {person.number}
                <button onClick={() => handleDelete(person)}>Delete</button>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
