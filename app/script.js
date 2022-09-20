import React, {useState} from 'react';
import { render } from 'react-dom';

const App = () => {
    const [status, setStatus] = useState('off');
    const [time, setTime] = useState(1200);
    const [timer, setTimer] = useState(null);
    const formatTime = (time) => {
        const minutes = String(Math.floor(time/60)).padStart(2,'0')
        const seconds = String(time%60).padStart(2,'0')
        return `${minutes}:${seconds}`
    }
    const startTimer = () => {
        setTime(5)
        setStatus('work')
        setTimer(setInterval(() => {
            setTime((prevValue) => {
                let currentStatus;
                if (prevValue <= 0){
                    setStatus((status)=>{
                        currentStatus = status
                        if (status==='work'){
                            return 'rest'
                        }else if (status==='rest'){
                            return 'work'
                        }
                    })
                    if (currentStatus==='work'){return 20 }
                    else {return 1200}
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
        <button className="btn btn-close">X</button>
      </div>

)
};

render(<App />, document.querySelector('#app'));
