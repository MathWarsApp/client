import {  useContext } from 'react';
import { Context } from '../../..';

import './playerStats.scss'

const PlayerStats = () => {

    const {store} = useContext(Context)
    return(
        <div className='player-stats__container'>
            <div className='container__column'>
                <ul className="player-stats__list">
                    <li className="player-stats__item player-stats__decoration">Кількість ігор</li>
                    <li className="player-stats__item player-stats__decoration">Перемоги</li>
                    <li className="player-stats__item player-stats__decoration">Поразки</li>
                    <li className="player-stats__item player-stats__decoration">Відсоток перемог</li>
                </ul>
            </div>
            <div className='container__column'>
                <ul className="player-stats__list">
                    <li className="player-stats__item">{store.user.total}</li>
                    <li className="player-stats__item">{store.user.win}</li>
                    <li className="player-stats__item">{store.user.lose}</li>
                    <li className="player-stats__item">{`${store.user.percent}%`}</li>
                </ul>
            </div>
        </div>
    )
}

export default PlayerStats;