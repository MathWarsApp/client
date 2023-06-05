import { useState, useContext, useEffect, useRef } from 'react';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import ModalBlock from '../../components/GameInfoModal/modalBlock/modalBlock';
import ModalBody from '../../components/GameInfoModal/modalBody/modalBody';
import PlayerStats from '../../components/GameInfoModal/playerStats/playerStats';
import TopPlayerList from '../../components/GameInfoModal/topPlayerList/topPlayerList';
import SettingsModalBlock from '../../components/SettingsModal/settingsModalBlock/settingsModalBlock';
import GameServices from '../../services/GameServices';
import BounceLoader from "react-spinners/BounceLoader";

import { ReactComponent as MathWars } from '../../img/MathWars.svg';
import { ReactComponent as ProfileImg } from '../../img/profile.svg';
import { ReactComponent as ArrowDown } from '../../img/arrow-down.svg';
import { ReactComponent as TrophieImg } from '../../img/trophie.svg';
import { ReactComponent as SettingsImg } from '../../img/settings.svg';
import { ReactComponent as LogOutImg } from '../../img/log-out.svg';
import './MainPage.scss'
import UsersService from '../../services/UsersService';

const MainPage = () => {
    const socket = useRef(null);
    const {store} = useContext(Context)
    const navigate = useNavigate()
    const [openPlayerStat, setOpenPlayerStat] = useState(false);
    const [openTopPlayers, setOpenTopPlayers] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [openInfo, setOpenInfo] = useState(false)
    const [openMenu, setOpenMenu] = useState(false);


    useEffect(() => {
        store.checkAuth()

        if(!store.isAuth){
            navigate('/', { replace: true })
        }

        if(localStorage.getItem('userName')){
            websockeConnectionStart(localStorage.getItem('inSearch'))
            store.setSerch(true)
        }

        return () => {
            if(socket.current){
                socket.current.close();
            }
        }
    }, [store.isAuth])

    const onDeleteClick = () => {
        setOpenInfo(true);
        setOpenSettings(false);
    };
    
    const onClose = () => {
        setOpenPlayerStat(false);
    };

    const onClose_2 = () => {
        setOpenTopPlayers(false);
    };

    const onClose_3 = () => {
        setOpenSettings(false);
    };

    const onClose_4 = () => {
        setOpenInfo(false);
    };

    const handleStartGame = async (username) => {
        const response = await GameServices.gameStart(username);
        console.log(response);
        websockeConnectionStart(response.data.config_data.room_id)
        localStorage.setItem("userName", store.user.username)
        localStorage.setItem('inSearch', response.data.config_data.room_id)
        store.setUserFight(response.data.user_state)
        store.setSerch(true)
    }

    const handleEndGame = async (username) => {
        const response = await GameServices.gameEnd(username);
        localStorage.removeItem("userName")
        localStorage.removeItem("inSearch")
        store.setUserFight({})
        store.setSerch(false)
        socket.current.close()
    }

    const deleteUser = async (id) => {
        const response = await UsersService.deleteUser(id)
        localStorage.removeItem('token')
        store.setUser({})
        store.setAuth(false)
        navigate(`/`, { replace: true })
    }

    const websockeConnectionStart = (roomID) => {

        socket.current = new WebSocket(`ws://localhost:8000/ws/room/${roomID}/`);

        socket.current.onopen = () => {
            socket.current.send(JSON.stringify({roomID: roomID, username: store.user.username}));
        };

        socket.current.onmessage = (event) => {
            try {
                const status = JSON.parse(event.data)
                console.log(status);
                if(status.start_game === 'start'){
                    navigate(`/game/${roomID}`, { replace: true })
                    localStorage.removeItem("inSearch")
                    socket.onclose()
                }
            } catch (e) {
                console.log(e);
            }
        };

        socket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    return(
        <>
            {store.isLoading ? 
                <div className='spinner-align'>
                    <BounceLoader color="#5C469C" size={150}/>
                </div>
                :
                <div className='main-page'>
                    <div className='main-page__header'>
                        <MathWars className='main-page__logo'/>
                    </div>
                    <div className='main-page__body'>
                        <div className='main-page__upper-block'>
                            <div className='main-page__name-wrapper' onClick={() => setOpenPlayerStat(true)}>
                                <div className='main-page__name-decoration'>
                                    <ProfileImg className='main-page__name-inner-decoration'/>
                                </div>
                                <h2 className='main-page__name'>{store.user.username}</h2>
                            </div>
                            <div className='main-page__menu-decoration' onClick={() => {setOpenMenu(!openMenu)}}>
                                <ArrowDown className='main-page__inner-menu-decoration'/>
                            </div>
                        </div>
                        {store.inSerch ? 
                        <button className='main-page__button' onClick={() => handleEndGame(store.user.username)}>Вийти з пошуку</button>
                        : 
                        <button className='main-page__button' onClick={() => handleStartGame(store.user.username)}>Почати гру</button>}
                        <div className='main-page__menu-container' style={openMenu ? {'display' : 'block'} : {'display' : 'none'}}>
                            <ul className="main-page__menu-list">
                                <li className="main-page__menu-item" onClick={() => {
                                    setOpenTopPlayers(true)
                                }}>
                                    <TrophieImg className='main-page__menu-img'/>
                                </li>
                                <li className="main-page__menu-item" onClick={() => setOpenSettings(true)}>
                                    <SettingsImg className='main-page__menu-img'/>
                                </li>
                                <li className="main-page__menu-item" onClick={() => store.logout()}>
                                    <LogOutImg className='main-page__menu-img'/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>}

            <ModalBlock isOpen={openPlayerStat} onClose={onClose} isInfo={false}>
                <div className='game-modal__header'>
                    <div className='game-modal__wrapper'>
                        <div className='game-modal__header-decoration'>
                            <ProfileImg className='game-modal__header-inner-decoration'/>
                        </div>
                        <h2 className='game-modal__title'>{store.user.username}</h2>
                    </div>
                </div>
                <div className="game-modal__body game-modal__player-stats">
                <ModalBody>
                    <PlayerStats/>
                </ModalBody>
                </div>
            </ModalBlock> 

            <ModalBlock isOpen={openTopPlayers} onClose={onClose_2} isInfo={false}>
                <div className='game-modal__header'>
                    <div className='game-modal__wrapper'>
                        <div className='game-modal__header-decoration'>
                            <TrophieImg className='game-modal__header-inner-decoration'/>
                        </div>
                        <h2 className='game-modal__title'>10 кращіх гравців</h2>
                    </div>
                </div>
                <div className="game-modal__body game-modal__top-players">
                    <TopPlayerList/>
                </div>
            </ModalBlock>

            <ModalBlock isOpen={openSettings} onClose={onClose_3} isInfo={false}>
                <div className='game-modal__header'>
                    <div className='game-modal__wrapper'>
                        <div className='game-modal__header-decoration'>
                            <SettingsImg className='game-modal__header-inner-decoration'/>
                        </div>
                        <h2 className='game-modal__title'>Налаштування</h2>
                    </div>
                </div>
                <div className="game-modal__body game-modal__top-players">
                <ModalBody>
                    <SettingsModalBlock onDeleteClick={onDeleteClick}/>
                </ModalBody>
                </div>
            </ModalBlock>

            <ModalBlock isOpen={openInfo} onClose={onClose_4} isInfo={true}>
                <div className='info-modal__wrapper'>
                    <div className='info-modal__body'>
                        <h3 className="info-modal__title">
                            Ви впевнені що бажаєте <br/>видалити акаунт?
                        </h3>
                        <h4 className="info-modal__text">
                            Після видалення акаунт буде не можливо відновити
                        </h4>
                    </div>
                    <div className='info-modal__footer'>
                        <button className="info-modal__button" onClick={() => deleteUser(store.user.id)}>Так</button>
                        <button className="info-modal__button" onClick={onClose_4}>Ні</button>
                    </div>
                </div>
            </ModalBlock>
        </>
    )
}

export default observer(MainPage);