import { useEffect } from 'react';
import { ReactComponent as MathWars } from '../../../img/MathWars.svg';

import './modalForm.scss'

const ModalForm = ({isOpen, onClose, children, title}) => {

    useEffect(() => {
        const modalKeyClose = (e) => {
            if(e.keyCode === 27){
                onClose()
            }
        }
        window.addEventListener('keydown', modalKeyClose);

        return () => window.removeEventListener('keydown', modalKeyClose);
    }, []);

    return(
        <>
            {isOpen ? 
                <div className="modal">
                    <div className="modal__overlay" onClick={onClose}></div>
                    <div className="modal__content">
                        <MathWars className='modal__logo'/>
                        <h2 className="modal__title">{title}</h2>
                        {children}
                    </div>
                </div> : null}
        </>
    )
}

export default ModalForm;