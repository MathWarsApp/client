
import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import ModalForm from '../../components/ModalWithForm/modalForm/modalForm';
import UserForm from '../../components/ModalWithForm/userForm/userForm';

import './WelcomePage.scss'
import { ReactComponent as ArrowToRight } from '../../img/arrow-to-right.svg';
import { ReactComponent as ArrowToBottom } from '../../img/arrow-to-bottom.svg';
import { ReactComponent as PlayButton } from '../../img/play-button.svg';
import { ReactComponent as ArrowToLeft } from '../../img/arrow-to-left.svg';


const WelcomePage = () => {

    const {store} = useContext(Context)
    const [logOpen, setLogOpen] = useState(false)
    const [regOpen, setRegOpen] = useState(false)

    const onClickReg = () => {
        setLogOpen(false)
        setRegOpen(true)
    }

    const onLogClose = () => {
        setLogOpen(false)
        store.setCheckLogin(false)
    }

    const onRegClose = () => {
        setRegOpen(false)
        store.setCheckReg(false)
    }

    return(
        <>

            <div className='container'>
                <div className='title-container'>
                    <h1 className='first-title'>MathWars</h1>
                    <h2 className='second-title'>Battle of Equations</h2>
                    <div className='decoration-container'>
                        <ArrowToRight alt='arrow-to-right'></ArrowToRight>
                        <p className='deceration-text'>2</p>
                        <ArrowToBottom alt='arrow-to-bottom'></ArrowToBottom>
                    </div>
                    <div className='decoration-container'>
                        <p className='deceration-text'>4</p>
                        <button className='button-play' onClick={() => setLogOpen(true)}>
                            <PlayButton alt="play-button" className='play-button' />
                        </button>
                        <p className='deceration-text'>1</p>
                    </div>
                    <div className='decoration-container'>
                        <ArrowToLeft alt="arrow-to-left" />
                    </div>
                </div>
            </div>

            <ModalForm title='Авторизація' isOpen={logOpen} onClose={onLogClose}>
                <div className="modal__body-auth">
                    <UserForm auth={true} onClickReg={onClickReg}/>
                </div>
            </ModalForm>  

            <ModalForm title='Реєстрація' isOpen={regOpen} onClose={onRegClose}>
                <div className="modal__body-reg">
                    <UserForm auth={false}/>
                </div>
            </ModalForm>
        </>
    )
}

export default observer(WelcomePage);