import axios from 'axios'
import {setUser} from '../store/userReducer';

export const registration = async (email, password) =>{
    try{
        const response = await axios.post('http://localhost:7000/api/auth/registration',
            {email, password})
        console.log(response.data)
        alert(response.data.message)
    } catch (e) {
        console.log(e)
        alert(e)
    }
}

export const login = (email, password) =>{
    return async dispatch =>{
        try{
            const response = await axios.post('http://localhost:7000/api/auth/login',
                {email, password})
            console.log(response.data)
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }
}

export const auth = () =>{
    return async dispatch =>{
        try{
            const response = await axios.get('http://localhost:7000/api/auth/auth',
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
                )
            console.log(response.data)
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e)
            localStorage.removeItem('token')
        }
    }
}
