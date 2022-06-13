
import './App.css';
import Cities from './components/Cities';
import Countries from './components/Countries';
import { useEffect , useState } from 'react';

function App() {

  const [countries, setcountries] = useState([]);
  const [name, setname] = useState("");

  const getcountries = () => {
    fetch(`https://62a6c393bedc4ca6d7b992eb.mockapi.io/countries`)
    .then((res) => res.json())
    .then((data) => {
      setcountries(data);
    })
  }

  useEffect(() => {
    getcountries();
  }, [])

  const addcountry = () => {
    fetch(`https://62a6c393bedc4ca6d7b992eb.mockapi.io/countries`,{
      method : "POST",
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify({
        data : countries,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
    setname([...countries,data])
    setname("");
    });
  }

//  console.log(countries);
  return (
    <div className="App">
     
     <Countries />
     <select>
     {countries.map((country) => (
      <option value={country.name} key={country.id}>{country.name}</option> 
     ))}
     </select>

     <div>
      <input placeholder='enter a city name to add' value={name} onChange={(e) => {
        console.log(e.target.value);
        setname(e.target.value)}} />
      <button onClick={addcountry}>ADD</button>

      <Cities /> 
      <input placeholder='Enter the city name'/>
      <input placeholder='Enter population'/>
      <div>
      <select>
      {countries.map((country) => (
      <option value={country.name} key={country.id}>{country.name}</option> 
     ))}
     </select>
     </div>

     </div>
    </div>
    
  );
}

export default App;
