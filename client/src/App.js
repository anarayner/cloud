import './App.css';
import NavBar from './components/navbar/NavBar';
import {Routes, Route} from 'react-router-dom'
import Auth from './components/registration/Registration';
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from './utils/consts';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {auth} from './actions/users';

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(auth())
    })
  return (
      <div className="App">
          <NavBar/>
          {!isAuth &&

              <Routes>
                  <Route path="/" element={< Auth/>}/>
                  <Route path={REGISTRATION_ROUTE} element={< Auth/>}/>
                  <Route path={LOGIN_ROUTE} element={< Auth/>}/>

              </Routes>
          }
      </div>
  );
}

export default App;
