import VolumeButton from '../volumeButton/volumeButton';
import DeleteButton from '../deleteButton/deleteButton';

import './settingsModalBlock.scss'

const SettingsModalBlock = ({onDeleteClick}) => {
    return(
        <div className='setting-container'>
            <VolumeButton/>
            <DeleteButton onDeleteClick={onDeleteClick}/>
        </div>
    )
}

export default SettingsModalBlock;