import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", phone: "040-123456", id: 1 },
    // { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    // { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    // { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("Add a new name...");
  const [newPhone, setNewPhone] = useState("Add a new phone...");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/db").then((res) => {
      console.log(res);
      setPersons(res.data.persons);
    });
  }, []);

  const addNewName = (event) => {
    event.preventDefault();

    const newPersonObj = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    };

    const isDuplicate = persons.some((person) => {
      return person.name === newPersonObj.name;
    });

    isDuplicate
      ? alert(`${newPersonObj.name} is already added to the phonebook!`)
      : setPersons(persons.concat(newPersonObj));
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

  console.log(`outside: ${filter}`);

  return (
    <div>
      <h2>Phonebook</h2>
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
                Name: {person.name} | Phone: {person.phone}
              </p>
            );
          })}
        </div>
      ) : (
        <div>
          {persons.map((person) => {
            return (
              <p>
                Name: {person.name} | Phone: {person.phone}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
