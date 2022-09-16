import qs from 'qs';
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatContact } from '../assets/utils/FormatContacts';
import { axiosPrivetInstance, axiosPublicInstance } from "../config/Axios";

export const AuthContext = createContext();
const userFromLocal = JSON.parse(localStorage.getItem('user'));
const tokenFromLocal = JSON.parse(localStorage.getItem('token'));


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(userFromLocal ? userFromLocal : null);
    const [profileId, setProfileId] = useState(null);
    const [token, setToken] = useState(tokenFromLocal ? tokenFromLocal : null);
    const [userContacts, setUserContacts] = useState(null);
    const [triggerDelete, setTriggerdelete ] = useState(false)
    const [loaded, setLoaded]= useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const registerUser = async (data) => {
        try {
            const response = await axiosPublicInstance.post('/auth/local/register', data);

            const { user, jwt } = response.data;
           
            setUser(user);
            setToken(jwt);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(jwt));
            toast.success('Registration Successfull')
            navigate(location?.state?.from? location?.state?.from : '/contacts')
        } catch (err) {
            toast.error(err?.response?.data?.error?.message)
            console.log(err.response.data.error.message);
       }
       
    }
    useEffect(() => {
       
        if (token && loaded) {
            ( async() => {
               await loadUserProfile()
            })()
        }
    }, [token,loaded])



    useEffect(() => {
        if (token) {
            ( async() => {
               await loadUserContact()
            })()
        }
    }, [token, triggerDelete])

    const loadUserProfile = async () => {
       
        const query = qs.stringify(
            {
                populate: ['profilePicture', 'user', 'user.contacts'],
            },
            {
                encodeValuesOnly : true
            }
            
        )
        try {
            const response = await axiosPrivetInstance(token).get(`/profiles/${profileId}?${query}`);
            
            const mappedContacts = response.data.data.attributes.user.data.attributes.contacts.data.map(contact => formatContact(contact))
            console.log(mappedContacts)
            setUserContacts(mappedContacts)
            // setUserContacts(response.data.contacts)
   
            setLoaded(true)
        } catch (error) {
            console.log(error); 
            setLoaded(true)
        }
        
    }

    
    const loadUserContact = async () => {
        const query = qs.stringify(
            {
                populate: ['profile', 'profile.profilePicture', 'contacts'],
            },
            {
                encodeValuesOnly : true,
            }
        )
        try {
            const response = await axiosPrivetInstance(token).get(`/users/me?${query}`);
           
            // setUserContacts(response.data.contacts)
            const newProfileID = response.data.profile.id
            console.log(newProfileID);
            setProfileId(newProfileID)
            console.log('this is profile id=>>', newProfileID)
            setLoaded(true)

        } catch (error) {
            setLoaded(true)
        }
        
    }

    const login = async (data) => {
        try {
            const response = await axiosPublicInstance.post('/auth/local', data);

            const { user, jwt } = response.data;
           
            setUser(user);
            setToken(jwt);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(jwt));
            toast.success('Login Successfull')

            navigate(location?.state?.from? location?.state?.from : '/contacts')
        } catch (err) {
            toast.error(err?.response?.data?.error?.message)
            console.log(err.response.data.error.message);
       }
    }


    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
        toast.success('Logout Successfull')
        navigate('/login')
    }

    const value = {
        userContacts,
        user,
        token,
        registerUser,
        login,
        logout,
        loaded,
        setTriggerdelete,
        profileId,
    }
    return <AuthContext.Provider value={value}> { children} </AuthContext.Provider>
}

export default AuthProvider;