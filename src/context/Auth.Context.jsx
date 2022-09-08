import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPublicInstance } from "../config/Axios";

export const AuthContext = createContext();
const userFromLocal = JSON.parse(localStorage.getItem('user'));
const tokenFromLocal = JSON.parse(localStorage.getItem('token'));


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(userFromLocal? userFromLocal : null);
    const [token, setToken] = useState(tokenFromLocal? tokenFromLocal: null);
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
        user,
        token,
        registerUser,
        login,
        logout
    }
    return <AuthContext.Provider value={value}> { children} </AuthContext.Provider>
}

export default AuthProvider;