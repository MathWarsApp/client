

import './modalBody.scss'

const ModalBody = (props) => {
    return(
        <div className='game-modal__content-container'>
            {props.children}
        </div>
    )
}

export default ModalBody;