
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
import ForgotPassword from '../pages/ForgotPassword';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ManagePassword from '../pages/ManagePassword';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import RestetPassword from '../pages/RestetPassword';
import UserContactList from '../pages/UserContactList';
import PrivetRoute from './PrivetRoute';
import PublicRoute from './PublicRoute';

export const ThemeContext = createContext(null);



function App() {
  
  const [theme, setTheme] = useState('dark');
  const context = useContext(ContactContext);
  const [searchInput, setSearchInput] = useState('');
 

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
            >
              <Route index element={<Profile />} />
              <Route path='profile' element={<Profile />} />
              <Route path='managae-password' element={<ManagePassword />} />
              <Route path='contacts' element={<UserContactList />} />
            </Route>
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
            <Route path='/forgot-password'
              element={
                <PublicRoute>
                  <ForgotPassword/>
                </PublicRoute>
              }
            />
            <Route path='/reset-password'
              element={
                <PublicRoute>
                 <RestetPassword />
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
