
import { ReactComponent as VolumeOn } from '../../../img/volume-on.svg';
import { ReactComponent as VolumeOff } from '../../../img/volume-off.svg';
import './volumeButton.scss'

const VolumeButton = () => {
    return(
        <div className='volume-button__block'>
            <div className='volume-button__decoration'>
                <VolumeOn className='volume-button__decoration-img'/>
            </div>
            <label className="toggle">
                <input type="checkbox" defaultChecked={true}/>
                <div className="slider"></div>
            </label>
        </div>
    )
}

export default VolumeButton;