import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Services from './components/Services';
import Displayscreenmessage from './components/Displayscreenmessage';
import './index.css';
import Errorscreenmessage from './components/Errormessagescreen';
const App = () => {
  const [cricketer, setCricketer] = useState([]);
  const [newName, setNewName] = useState('');
  const [position, setPosition] = useState('');
  const [search, setSearch] = useState('');
  const [displayscreen, setDisplayscreen] = useState(null);
  const [errormessage, setErrormessage] = useState(null);
  const onType = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }
  const onTypenumber = (event) => {
    console.log(event.target.value);
    setPosition(event.target.value);
  }
  const onSave = (event) => {
    event.preventDefault();
    console.log(event.target);
    if (checkname) {
      if (window.confirm(`do you really want to replace ${newName} batting position`)) {
        const samecricketer = cricketer.find(cricketer => cricketer.name === newName);
        const newbattingposncricketer = { name: newName, battingposition: position };

        Services.changebattingposn(samecricketer.id, newbattingposncricketer)
          .then(
            changecricketer => {
              setCricketer(
                cricketer.map(
                  cricketer => cricketer.id === samecricketer.id ? changecricketer : cricketer
                )
              )
              setDisplayscreen(`Changed ${samecricketer.name}`);
              setTimeout(() => setDisplayscreen(null)
                , 5000)

            }

          )
          .catch(
            error => {
              setErrormessage(`${samecricketer.name} is already deleted from the server and does not exist `);
              setTimeout(() => setErrormessage(null)
                , 5000)
              setCricketer(cricketer.filter(cricketer => cricketer.id !== samecricketer.id));
            }
          )


      }
      return;
    }
    else {
      const newcricketer = { name: newName, battingposition: position };
      Services.addtolist(newcricketer)
        .then(
          addedlist => {
            console.log(addedlist);
            setCricketer(cricketer.concat(addedlist));
            setNewName("");
            setPosition("");
            setDisplayscreen(`Added ${newcricketer.name}`);
            setTimeout(() => setDisplayscreen(null)
              , 5000)
          }
        )

    }
  }
  const onSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setSearch(event.target.value);
  }
  const searchedcricketer = cricketer.filter(cricketer => cricketer.name.toLowerCase().includes(search.toLowerCase()))
  const checkname = cricketer.some(cricketer => cricketer.name === newName);

  const hook = () => {
    Services.getlist()
      .then(
        gottenlist => {
          console.log('effect');
          setCricketer(gottenlist);
        }
      )

  }

  useEffect(hook, []);


  const DeleteCricketer = (id) => {
    const cricketername = cricketer.find(cricketer => cricketer.id === id);
    if (confirm(`Do u relly want to delete ${cricketername.name}`))
      Services.deletefromlist(id)
        .then(
          deletedcricketer => {
            console.log(deletedcricketer);
            setCricketer(cricketer.filter(cricketer => cricketer.id !== id))
          }
        )

  }
  console.log("render", cricketer.length, "values");
  return (
    <div>
      <h1>Search</h1>
      <Displayscreenmessage message={displayscreen}></Displayscreenmessage>
      <Errorscreenmessage message={errormessage}></Errorscreenmessage>
      <input value={search} onChange={onSearch} ></input>
      <h2>Cricketbook</h2>
      <form onSubmit={onSave}>
        <div>
          name: <input value={newName} onChange={onType}></input>
        </div>
        <div>
          battingpostion: <input value={position} onChange={onTypenumber}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Position</h2>
      {searchedcricketer.map(cricket => {
        return <>
          <h1 key={cricket.name}> {cricket.name}    {cricket.battingposition}</h1>
          <button onClick={() => DeleteCricketer(cricket.id)}>Delete Cricketer</button >
        </>
      })}
    </div >
  )
}

export default App;