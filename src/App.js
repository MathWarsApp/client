
import { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '.';
import { observer } from 'mobx-react-lite';

import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';
import FightPage from './pages/FightPage/FightPage';


import './App.scss';



function App() {
  const {store} = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('token') !== undefined){
      store.checkAuth()
      navigate('/main', { replace: true })
    }
    if(localStorage.getItem('token') 
      && localStorage.getItem('token') !== undefined 
      && localStorage.getItem("roomID")
      && localStorage.getItem("roomID") !== undefined){
      navigate(`/game/${localStorage.getItem("roomID")}`, { replace: true })
    }
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path='/main' element ={ <MainPage/> }/>
        <Route path='/' element ={ <WelcomePage/> }/>
        <Route path='/game/:id' element ={<FightPage/>}/>
      </Routes>
    </div>
  );
}

export default observer(App);
