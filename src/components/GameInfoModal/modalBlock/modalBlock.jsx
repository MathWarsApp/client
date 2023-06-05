

import { useEffect } from 'react';
import './modalBlock.scss'


const ModalBlock = ({isOpen, onClose, children, isInfo}) => {

    useEffect(() => {
        const modalKeyClose = (e) => {
            if(e.keyCode === 27){
                onClose()
            }
        }
        window.addEventListener('keydown', modalKeyClose);

        return () => window.removeEventListener('keydown', modalKeyClose);
    }, []);

    const clazz = isInfo ? 'info' : 'game';

    return (
        <>
            {isOpen ? <div className={`${clazz}-modal`}>
                <div className={`${clazz}-modal__overlay`} onClick={onClose}></div>
                <div className={`${clazz}-modal__content`}>
                    <button className={`${clazz}-modal__close-button`} onClick={onClose}>
                        <p className={`${clazz}-modal__close-decoration`}>&times;</p>
                    </button>
                    {children}
                </div>
            </div> : null}
        </>
    );
}

export default ModalBlock;