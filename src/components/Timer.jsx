import React, { useEffect, useState } from 'react'

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev == 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                })
            }, 1000)
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const formatTimer = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${min}:${sec}`;
    }


    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(25 * 60);

    }
    return (

        <div className='bg-pink-100'>
            <div className='items-center justify-center '>
                <h1 className='items-center font-bold text-pink-900 flex-col'>Plumoon - Pomodoro Timer</h1>
                <p className='time'>{formatTimer(timeLeft)}</p>
                <div className='flex flex-col'>
                    <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Pause" : "Start"}</button>
                    <button onClick={resetTimer}>Reset</button>
                </div>
            </div>
        </div>

    )
}

export default Timer;