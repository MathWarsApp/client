// import { Link } from 'react-router-dom';
// import { useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { observer } from 'mobx-react-lite';
// import { Context } from '../../..';

import './formButton.scss'

const FormButton = (props) => {
    // const {store} = useContext(Context)
    // onClick={store.test}
    return(
        <>
            {/* <Link to='/main' className='auth-form__button-link'> */}
                <button type='submit' className={`auth-form__button ${props.textSize}`}>
                    {props.text}
                </button>
            {/* </Link> */}
        </>
    )
}

export default FormButton;