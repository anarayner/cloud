import React, {useState} from 'react';
import './navbar.css'
import Logo from '../../assets/img/logo-cloud.png'
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from '../../utils/consts';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../store/userReducer';
import {getFiles, searchFile} from '../../actions/file';
import {showLoader} from '../../store/appReducer';
const NavBar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.file.currentDir)

    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    function searchHandler(e) {
        setSearchName(e.target.value)
        if(searchTimeout !== false){
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== ''){
            setSearchTimeout(setTimeout((value)=>{
                dispatch(searchFile(value))
            }, 500, e.target.value))
        } else{
            dispatch(getFiles(currentDir))

        }

    }

    return (
        <div className='navbar'>
            <div className='container'>
                <img src={Logo} alt='logo' className='navbar_logo'/>
                <div className='navbar_header'>BLUE CLOUD</div>
                {isAuth &&
                    <input
                        value={searchName}
                        onChange={(e) => searchHandler(e)}
                        type='text'
                        className='navbar_search'
                        placeholder='Search..'/>}
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
