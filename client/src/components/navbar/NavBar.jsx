import React from 'react';
import './navbar.css'
import Logo from '../../assets/img/logo-cloud.png'
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from '../../utils/consts';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../store/userReducer';
const NavBar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)
    return (
        <div className='navbar'>
            <div className='container'>
                <img src={Logo} alt='logo' className='navbar_logo'/>
                <div className='navbar_header'>BLUE CLOUD</div>
                {!isAuth && <div className="navbar_login">
                    <NavLink to={LOGIN_ROUTE}
                             style={{textDecoration: 'none'}}>
                        Sign In
                    </NavLink>
                </div>}
                {!isAuth && <div className="navbar_registration">
                    <NavLink to={REGISTRATION_ROUTE}
                             style={{textDecoration: 'none'}}>
                        Sign Up
                    </NavLink>
                </div>}
                {isAuth && <div className="navbar_login" style={{cursor: 'pointer'}}
                                onClick={()=>dispatch(logout())}
                >
                    Log Out
                </div>}
            </div>


        </div>
    );
};

export default NavBar;
