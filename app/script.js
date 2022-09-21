import React, {useEffect, useState} from 'react';
import { render } from 'react-dom';

const App = () => {
    const [status, setStatus] = useState('off');
    const [time, setTime] = useState(1200);
    const [timer, setTimer] = useState(null);
    const bellAudio = new Audio('./sounds/bell.wav');
    const formatTime = (time) => {
        const minutes = String(Math.floor(time/60)).padStart(2,'0')
        const seconds = String(time%60).padStart(2,'0')
        return `${minutes}:${seconds}`
    }
    useEffect(()=>{
        if(time===0){
            bellAudio.play()
            if(status==='work'){setStatus('rest'); setTime(20)}
            else if(status==='rest'){setStatus('work'); setTime(1200)}
        }
    })
    const startTimer = () => {
        setTime(1200)
        setStatus('work')
        setTimer(setInterval(() => {
            setTime((prevValue) => {
                if (prevValue <= 0){
                    return 0
                } else {
                    return prevValue - 1
                }
        })}, 1000))}

    const stopTimer = () => {
        clearInterval(timer)
        setTimer(null)
        setTime(1200)
        setStatus('off')
    }
    const closeApp = () => {window.close()}

    return (
      <div>
        <h1>Protect your eyes</h1>
          {status === 'off' && <div><p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
              <p>This app will help you track your time and inform you when it's time to rest.</p></div>}
          {status === 'work' && <img src="./images/work.png" />}
          {status === 'rest' && <img src="./images/rest.png" />}
          {status !== 'off' && <div className="timer">
              {formatTime(time)}
        </div>}
          {status === 'off' && <button className="btn" onClick={startTimer}>Start</button>}
          {status !== 'off' && <button className="btn" onClick={stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={closeApp}>X</button>
      </div>

)
};

render(<App />, document.querySelector('#app'));
