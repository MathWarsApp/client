
import { ReactComponent as ProfileImg } from '../../../img/profile.svg';
import { ReactComponent as TrophieImg } from '../../../img/trophie.svg';
import { ReactComponent as PercentImg } from '../../../img/percent.svg';
import './topPlayerItem.scss'

const TopPlayerItem = ({id, username, total, percent, place}) => {
    return(
        <li className="top-player__item" key={id}>
            <div className='top-player__container'>
                <div className='top-player__column'>
                    <p className='top-player__place'>{place}</p>
                    <div className='top-player__decoration'>
                        <ProfileImg className='top-player__decoration-img'/>
                    </div>
                    <p className='top-player__name'>{username}</p>
                </div>
                <div className="top-player__column">
                <div className='top-player__decoration'>
                    <TrophieImg className='top-player__decoration-img'/>
                </div>
                    <p className='top-player__text'>{total}</p>
                    <div className='top-player__decoration'>
                        <PercentImg className='top-player__decoration-img'/>
                    </div>
                    <p className='top-player__text'>{percent}%</p>
                </div>
            </div>
        </li>
    )
} 

export default TopPlayerItem;