
import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import { ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import About from './pages/About';
import AddContact from './pages/AddContact';
import ContactDetails from './pages/ContactDetails';
import Contacts from './pages/Contacts';
import EditContact from './pages/EditContact';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

export const ThemeContext = createContext(null);

const initialContacts = [
  {
    id: '1',
    firstName: 'Barbette',
    lastName: 'Pfertner',
    email: 'bpfertner0@drupal.org',
    profession: 'developer',
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/75.jpg',
    dateOfBirth: 'Tue Aug 16 2022 11:02:03 GMT+0600 (Bangladesh Standard Time)',
    bio: 'All About me',
  },
  {
    id: '2',
    firstName: 'Ignatius',
    lastName: 'McPhilip',
    email: 'imcphilip1@toplist.cz',
    profession: 'developer',

    gender: 'male',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    dateOfBirth: '04/04/2022',
    bio: 'All About me',
  },
  {
    id: '3',
    firstName: 'Fletch',
    lastName: 'Veel',
    email: 'fveel2@yellowbook.com',
    profession: 'designer',

    gender: 'male',
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
    dateOfBirth: '17/05/2022',
    bio: 'All About me',
  },
  {
    id: '4',
    firstName: 'Shawn',
    lastName: 'Lawrenz',
    email: 'slawrenz3@independent.co.uk',
    profession: 'marketer',
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/80.jpg',
    dateOfBirth: '30/07/2022',
    bio: 'All About me',
  },
  {
    id: '5',
    firstName: 'Bucky',
    lastName: 'Casaccio',
    email: 'bcasaccio4@netlog.com',
    gender: 'male',
    profession: 'marketer',
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    dateOfBirth: '21/03/2022',
    bio: 'All About me',
  },
  {
    id: '6',
    firstName: 'Regan',
    lastName: 'Lodford',
    email: 'rlodford5@nbcnews.com',
    profession: 'developer',
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/81.jpg',
    dateOfBirth: '16/01/2022',
    bio: 'All About me',
  },
  {
    id: '7',
    firstName: 'Hubert',
    lastName: 'Langhorne',
    email: 'hlanghorne6@thetimes.co.uk',
    gender: 'male',
    profession: 'marketer',
    image: 'https://randomuser.me/api/portraits/men/80.jpg',
    dateOfBirth: '05/02/2022',
    bio: 'All About me',
  },
]

function App() {
  const [contacts, setContacts] = useState(initialContacts)
  const [theme, setTheme] = useState('dark');

  const updateContact = (contactToUpdate, id) => {
    const contactWithUpdate = contacts.map((contact) => {
      if (contact.id === id) {
        return {
          id,
          ...contactToUpdate,
        }
      } else {
        return contact;
      }
    });
    setContacts(contactWithUpdate);
  }
  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
}

  const addContact = (contact) => {
    let contactToAdd = {
      id: uuidv4(),
      ...contact,
    }
    setContacts([contactToAdd, ...contacts]);
  }
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light'? 'dark': 'light') )
  }

  return (
    <>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div id={theme} >
         
          <ReactSwitch onChange={toggleTheme} checked={theme == 'light'} className='marginSwitch' />
         
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/home' element={ <Home />} />
            <Route path='/about' element={ <About />} />
            <Route path='/contacts' element={ <Contacts contacts={ contacts} deleteContact={deleteContact}/> } />
            <Route path='/addcontact' element={<AddContact addContact={ addContact} />} />
            <Route path='/edit-contact/:id' element={<EditContact contacts={contacts} updateContact={updateContact} />} />
            <Route path='/contacts/:id' element={<ContactDetails contacts={contacts} deleteContact={deleteContact}/>} />
            <Route path='/register' element={ <Register/>} />
            <Route path='/login' element={ <Login/>} />
            <Route path='*' element={ <NotFound/>} />
          </Routes>
         
         
        </div>
      </ThemeContext.Provider>
    </>
  )
}

export default App
