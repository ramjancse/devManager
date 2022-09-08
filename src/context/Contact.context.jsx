import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatContact } from '../assets/utils/FormatContacts';
import { axiosPrivetInstance } from '../config/Axios';
import { AuthContext } from './Auth.Context';
import contactsReducer from './Refucer';
import { ADD_CONTACT, DELETE_CONTACT, LOAD_CONTACTS, UPDATE_CONTACT } from './Types';

export const ContactContext = createContext();


const initialContacts = [
    {
      id: '1',
      firstName: 'Barbette',
      lastName: 'Pfertner',
      email: 'bpfertner0@drupal.org',
      profession: 'developer',
      gender: 'female',
      image: 'https://randomuser.me/api/portraits/women/75.jpg',
      dateOfBirth: '',
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
      dateOfBirth: '',
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
      dateOfBirth: '',
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
      dateOfBirth: '',
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
      dateOfBirth: '',
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
      dateOfBirth: '',
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
      dateOfBirth: '',
      bio: 'All About me',
    },
]

//create provider
export const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactsReducer, initialContacts);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    ( async() => {
      await loadContacts();
    })();
  }, []);
  
  const loadContacts = async () => {
    try {
      const response = await axiosPrivetInstance.get('/contacts?populate=*');
      
      const loadedContacts = response.data.data.map(contact =>formatContact(contact))
      dispatch({
        type: LOAD_CONTACTS,
        payload : loadedContacts,
      });
      setLoaded(true)
      }
    catch (err) {
      toast.error(err.response?.data?.error?.message);
    }
  }
  
    
  const deleteContact = async (id) => {
    try {
      const response = await axiosPrivetInstance.delete(`/contacts/${id}`)
      dispatch({ type: DELETE_CONTACT, payload: response.data.data.id, });  
      toast.success('Data is deletred successfully');
    } catch(err) {
      toast.error(err.response?.data?.error?.message);
      }
      
    }
    
  const updateContact = async (contactToUpdate, id) => {
    try {
      const response = await axiosPrivetInstance.put(`/contacts/${id}?populate=*`, {
        data: contactToUpdate,
      })
      const contact = formatContact(response.data.data);
      console.log(contact)
      dispatch({
        type: UPDATE_CONTACT,
        payload: {id: contact.id, contact}
      });
      toast.success('Updated Successfully');
      navigate(`/contacts/${contact.id}`)
    } catch (err) {
      toast.error(err.response?.data?.error?.message);
      navigate(`/contacts`)
    }
    
  }

  const addContact = async (contactData) => {
    try {
      const response = await axiosPrivetInstance.post('/contacts', {
        data: contactData,
      })
      const contact = formatContact(response.data.data)
      dispatch({
        type: ADD_CONTACT,
        payload : contact,
      })
      toast.success('Contact Added ......');
      navigate('/contacts')
    } catch (err) {
      toast.error(err.response?.data?.error?.message);
      navigate('/addcontact')
    }
  }

  const value = {
        loaded,
        contacts,
        deleteContact,
        addContact,
        updateContact
    }
    return <ContactContext.Provider value={value}>
            { children}
          </ContactContext.Provider>
}
