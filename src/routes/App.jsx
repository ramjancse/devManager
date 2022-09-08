
import { createContext, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import { ToastContainer } from 'react-toastify';
import '../App.css';
import { ContactContext } from '../context/Contact.context';
import About from '../pages/About';
import AddContact from '../pages/AddContact';
import ContactDetails from '../pages/ContactDetails';
import Contacts from '../pages/Contacts';
import Dashboard from '../pages/Dashboard';
import EditContact from '../pages/EditContact';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import PrivetRoute from './PrivetRoute';
import PublicRoute from './PublicRoute';

export const ThemeContext = createContext(null);



function App() {
  
  const [theme, setTheme] = useState('dark');
  const context = useContext(ContactContext);
 

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
            <Route path='/contacts'
              element={
                <PrivetRoute> 
                  <Contacts />
                </PrivetRoute>
              }
            />
            <Route path='/addcontact'
              element={
                <PrivetRoute> 
                  <AddContact />
                </PrivetRoute>
              }
            />
            <Route path='/edit-contact/:id'
              element={
                <PrivetRoute>
                  <EditContact />
                </PrivetRoute>
              }
            />
            <Route path='/contacts/:id'
              element={
                <PrivetRoute>
                  <ContactDetails />
                </PrivetRoute>
              }
            />
            <Route path='/dashboard'
              element={
                <PrivetRoute>
                  <Dashboard />
                </PrivetRoute>
              }
            />
            <Route path='/register'
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute> 
              }
            />
            <Route path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path='*' element={ <NotFound/>} />
          </Routes>
         
         
        </div>
      </ThemeContext.Provider>
    </>
  )
}

export default App
