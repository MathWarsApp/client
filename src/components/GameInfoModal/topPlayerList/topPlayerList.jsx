import { useEffect, useState } from 'react';
import TopPlayerItem from '../topPlayerItem/topPlayerItem';
import UsersService from '../../../services/UsersService'
import BounceLoader from "react-spinners/BounceLoader";

import './topPlayerList.scss'

const TopPlayerList = ({onLoading}) => {
    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const getUsers = async () => {
            const response = await UsersService.getUsers();
            if(response.data){
                setUsersData(response.data)
                setLoading(false)
            }
        } 
        getUsers()
    }, [])
    return(
        <>
            {loading ? 
                <div className='game-modal__top-players-loading'>
                    <BounceLoader color="#5C469C" size={100}/>
                </div>
                :
                <ul className="top-player__list">
                    {usersData.map((user, i) => {
                        return <TopPlayerItem key={user.id} username={user.username} total={user.total} percent={user.percent} place={i + 1}/>
                    })}
                </ul>}
        </>
    )
}

export default TopPlayerList;