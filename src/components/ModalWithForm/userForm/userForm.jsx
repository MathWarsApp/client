import FormInput from '../formInput/formInput';
import FormButton from '../formButton/formButton';
import BounceLoader from "react-spinners/BounceLoader";

import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';

import './userForm.scss'


const UserForm = ({auth, onClickReg}) => {

    const {store} = useContext(Context)
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loginError, setLoginError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(store.checkLogin);
        if(store.isAuth){
            navigate('/main', { replace: true })
        }
    }, [store.isAuth, store.checkLogin])


    const onChangeName = (e) => {
        setUserName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setUserEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setUserPassword(e.target.value);
    }

    const validateLogin = (value) => {
        if (value.length < 4 || value.length > 12) {
            return 'Довжина логіна має бути від 4 до 12 символів.';
        }
    };

    const validateEmailFormat = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Некоректний формат пошти.';
        }
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(value)) {
            return 'Некоректний формат паролю.';
        }
    };


    return(
        <>
            {auth ? 
            <form className='modal__auth-form' onSubmit={(e) => {
                e.preventDefault()
                store.setCheckLogin(false)
                setLoading(true)
                store.login(userName, userPassword)
                setLoading(false)
            }}>

                <div className='auth-form__row'>
                    <FormInput label='Логін' htmlFor='login' name='login' value={userName} onChange={onChangeName} type="text"/>
                </div>
                <div className='auth-form__row'>
                    <FormInput label='Пароль' htmlFor='password' name='password' value={userPassword} onChange={onChangePassword} type="password"/>
                </div>
                {loading ? 
                <div style={{'paddingTop' : '1rem'}}>
                    <BounceLoader size={20} color='#5C469C'/>
                </div> : 
                <>
                    <FormButton text='Увійти'/>
                    <button onClick={() => {
                        onClickReg()
                        store.setCheckLogin(false)
                    }} className="auth-form__link-button">Зареєструватися</button>
                </>}
                {store.checkLogin ? <p className='error-text'>Не вірний логін чи пароль</p> : null}
            </form> 
            : 
            <form className='modal__auth-form' onSubmit={(e) => {
                    e.preventDefault()
                    store.setCheckReg(false)
                    setLoginError('');
                    setEmailError('');
                    setPasswordError('');
                    setLoading(true)

                    const loginValidationResult = validateLogin(userName);
                    const emailValidationResult = validateEmailFormat(userEmail);
                    const passwordValidationResult = validatePassword(userPassword);

                    if (loginValidationResult) {
                        setLoginError(loginValidationResult);
                        setLoading(false)
                        return;
                    }
                    if (emailValidationResult) {
                        setEmailError(emailValidationResult);
                        setLoading(false)
                        return;
                    }
                    if (passwordValidationResult) {
                        setPasswordError(passwordValidationResult);
                        setLoading(false)
                        return;
                    }


                    store.registration(userName, userEmail, userPassword)
                    setLoading(false)
                }}>
                <div className='auth-form__row'>
                    <FormInput label='Логін' htmlFor='login' name='login' value={userName} onChange={onChangeName} type="text"/>
                </div>
                <div className='auth-form__row'>
                    <FormInput label='Пошта' htmlFor='email' name='email' value={userEmail} onChange={onChangeEmail} type="text"/>
                </div>
                <div className='auth-form__row'>
                    <FormInput label='Пароль' htmlFor='password' name='password' value={userPassword} onChange={onChangePassword} type="password"/>
                </div>
                <FormButton text='Зареєструватися' textSize={'button-text__small'}/>
                {loading ? 
                    <div style={{'paddingTop' : '1rem'}}>
                        <BounceLoader size={20} color='#5C469C'/>
                    </div> : null}
                {store.checkReg ? <p className='error-text'>Користувач з таким логіном чи поштою вже існує</p> : null}
                {loginError ? <p className='error-text'>{loginError}</p> : null}
                {emailError ? <p className='error-text'>{emailError}</p> : null}
                {passwordError ? <p className='error-text'>{passwordError}</p> : null}
            </form>}
        </>
    )
}

export default observer(UserForm);