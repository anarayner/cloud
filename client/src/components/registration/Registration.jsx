import React, {useState} from 'react';
import {LOGIN_ROUTE} from '../../utils/consts';

import Input from '../UI/input/Input';
import './registration.css'
import {login, registration} from '../../actions/users';
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

const Auth = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const register = (email, password) =>{
        if(!isLogin){
            registration(email,password).then(()=>{
                setEmail('')
                setPassword('')
                navigate(LOGIN_ROUTE)
            })
        }else{
            dispatch(login(email, password))
        }

    }
    return (
        <div className='registration'>
            <div className='registration_header'>
                {isLogin? 'Login' :'Registration' }
                </div>
            <Input value ={email}
                   setValue={setEmail}
                   type={'text'}
                   placeholder={'Email Address'}/>
            <Input value ={password}
                   setValue={setPassword}
                   type={'password'}
                   placeholder={'Password'}/>
            <button className='registration_btn'
                    onClick={() => register(email, password)}
            >
                {isLogin? 'Sing in' :'Sing up' }
            </button>
        </div>
    );
};

export default Auth;
