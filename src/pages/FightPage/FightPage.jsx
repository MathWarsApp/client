
import { ReactComponent as MathWars } from '../../img/MathWars.svg';
import { ReactComponent as ProfileImg } from '../../img/profile.svg';
import { ReactComponent as SwordImg } from '../../img/sword.svg';
import { ReactComponent as ShieldImg } from '../../img/shield.svg';
import './FightPage.scss'
import { useEffect, useContext, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../..';
import GameServices from '../../services/GameServices';

const FightPage = () => {

    const socket = useRef(null);
    const {store} = useContext(Context)
    const navigate = useNavigate();
    const [you, setYou] = useState({})
    const [enemy, setEnemy] = useState({})
    const [expression, setExpression] = useState('')
    const [answer, setAnswer] = useState('')
    const [winner, setWinner] = useState(false)
    const [winnerName, setWinnerName] = useState('');
    const { id } = useParams();


    useEffect(() => {
        let timeoutID
        socket.current = new WebSocket(`ws://localhost:8000/ws/match/${id}/`);
        localStorage.setItem("roomID", id)

        socket.current.onopen = () => {
            socket.current.send(JSON.stringify({game_status: 'starting'}));
        };

        socket.current.onmessage = (event) => {
            try {
                const userData = JSON.parse(event.data)
                console.log(userData);
                if(userData.game_info.win){
                    setWinner(true)
                    setWinnerName(userData.game_info.win)
                    timeoutID = setTimeout(() => {
                        navigate('/main', { replace: true })
                        localStorage.removeItem('roomID')
                        localStorage.removeItem('userName')
                        store.setUserFight({})
                        store.setSerch(false)
                    }, 5000)
                }
                if(userData.game_info.user_1.username === localStorage.getItem("userName")){
                    setYou(userData.game_info.user_1)
                    setEnemy(userData.game_info.user_2)
                }else{
                    setYou(userData.game_info.user_2)
                    setEnemy(userData.game_info.user_1)
                }

            } catch (e) {
                console.log(e);
            }
        };

        return () => {
            socket.current.close();
            clearTimeout(timeoutID)
        }
    }, [])

    const getGenerationExpression = async () => {
        const response = await GameServices.getExpression();
        setExpression(response.data.expression)
    }

    const fightWebscoket = (data) => {
        socket.current.send(JSON.stringify(data))
    }

    const handleInputChange = (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/[^-0-9]|(?<=-.*?)-/g, '');
        setAnswer(inputValue);
    };

    return(
        <div className='fight-page'>
            <div className='fight-page__header'>
                <MathWars className='fight-page__logo'/>
            </div>
            <div className='fight-page__body'>
                <div className='fight-page__body-upper'>
                    {winner ? null : <div className='fight-page__hp-bar hp-bar__yellow'>{`${enemy.remain_hp}/${enemy.total_hp}`}</div>}
                    <div className='fight-page__name-wrapper'>
                        <div className='fight-page__name-decoration'>
                            <ProfileImg className='fight-page__name-inner-decoration'/>
                        </div>
                        <h2 className='fight-page__name'>{enemy.username}</h2>
                        {enemy.has_armor ? 
                        <div className='fight-page__has-armor-block'>
                            <p className='fight-page__has-armor'>A</p>
                        </div> : null}
                    </div>
                </div>
                <div className='fight-page__body-middle'>
                    <div className='middle-top'>
                        {winner ? null :
                        <>
                            <div className='fight-page__hint-container'>
                                <p className='fight-page__hint'>Вирішіть приклад</p>
                                <p className='fight-page__hint'>Приклади округляються в менший бік</p>
                            </div>
                            <button className='fight-page__timer-decoration' onClick={(e) => {
                                e.preventDefault()
                                const data = {game_status: 'surrender', 
                                                current:{...you}, 
                                                enemy:{...enemy},}
                                fightWebscoket(data)
                            }}>
                                <p className='fight-page__timer-text'>В</p>
                            </button>
                        </>}
                    </div>
                    <div className='middle-bottom'>
                        {winner ? 
                        <div className='middle-bottom__winner-container'>
                            <h3 className='middle-bottom__winner-title'>Переможець</h3>
                            <p className='middle-bottom__winner-text'>{winnerName}</p>
                        </div>:
                        you.state === 'sleep' && !winner ? 
                        <p className="fight-page__body-middle-second-text">Оберіть дію для початку гри</p> :
                        you.state === 'active' ? 
                        <form className='fight-page__form'>
                            <label className='fight-page__form-label' htmlFor='expression'>{expression}</label>
                            <input type="text" name='expression' className="fight-page__form-input" value={answer} onChange={handleInputChange}/>
                            <div className='fight-page__form-button-wrapper'>
                                <button className="fight-page__form-button" onClick={(e) => {
                                    e.preventDefault()
                                    const data = {game_status: 'started', 
                                                    current:{...you}, 
                                                    enemy:{...enemy}, 
                                                    expression: expression, 
                                                    userAnswer: answer}
                                    fightWebscoket(data)
                                    setAnswer('')
                                }}>Відправити</button>
                            </div>
                        </form> :
                        <p className="fight-page__body-middle-second-text">Супротивник робить хід<br/>Будь ласка, зачекайте</p>}
                    </div>
                </div>
                <div className='fight-page__body-footer'>
                    <div className='fight-page__name-wrapper'>
                        <div className='fight-page__name-decoration'>
                            <ProfileImg className='fight-page__name-inner-decoration'/>
                        </div>
                        <h2 className='fight-page__name'>{you.username}</h2>
                        {you.has_armor ? 
                        <div className='fight-page__has-armor-block'>
                            <p className='fight-page__has-armor'>A</p>
                        </div> : null}
                    </div>
                    {winner ? null : <div className='fight-page__hp-bar hp-bar__green'>{`${you.remain_hp}/${you.total_hp}`}</div>}
                    {winner ? null :
                    you.state === 'sleep' && !winner ? 
                    <div className='fight-page__button-block'>
                        <button className="fight-page__button" onClick={() => {
                            setYou(prevYou => ({ ...prevYou, action: 'attack', state: 'active' }))
                            getGenerationExpression()
                        }}>
                            <SwordImg className='fight-page__button-img'/>
                        </button>
                        <button className="fight-page__button" onClick={() => {
                            setYou(prevYou => ({ ...prevYou, action: 'defense', state: 'active' }))
                            getGenerationExpression()
                        }}>
                            <ShieldImg className='fight-page__button-img'/>
                        </button>
                    </div> : null}
                </div>
            </div>
        </div>
    )
}

export default FightPage;