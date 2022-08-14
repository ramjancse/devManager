
import { Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import About from './assets/components/About';
import Home from './assets/components/Home';
import AddContact from './assets/contacts/AddContact';
import Contacts from './assets/contacts/Contacts';

function App() {
  // const [contacts, setContacts] = useState(initialContacts);

 

  const addContact = (contact) => {
    let contactToAdd = {
      id: uuidv4(),
      ...contact,
    }
    setContacts([contactToAdd, ...contacts]);
  }

  return (
    <>
      
      {/* <Header /> */}
     
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/home' element={ <Home />} />
        <Route path='/about' element={ <About />} />
        <Route path='/contact' element={ <Contacts />} />
        <Route path='/addcontact' element={ <AddContact />} />
      </Routes>
        {/* <AddContact addContact={ addContact} />
        <Contacts contacts={contacts} deleteContact={ deleteContact}  /> */}
    
      </>
     
   
  )
}

export default App
