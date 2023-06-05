
import { ReactComponent as DeleteBtn } from '../../../img/delete.svg';
import './deleteButton.scss'

const DeleteButton = ({onDeleteClick}) => {
    return(
        <div className='delete-button__container' onClick={onDeleteClick}>
            <button className='delete-button'>
                <DeleteBtn className='delete-button__img'/>
            </button>
            <p className='delete-button__label'>Видалити акаунт</p>
        </div>
    )
}

export default DeleteButton;