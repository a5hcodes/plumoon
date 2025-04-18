import React, { useEffect, useState } from 'react'

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("focus");
    const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
    const backgroundClass = mode === "focus" ? "bg-gradient-to-r from-pink-50 to-pink-200" : "bg-gradient-to-r from-blue-100 to-blue-300";


    useEffect(() => {
        let timer;


        // If running, start countdown
        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev == 0) {
                        const audio = new Audio("audio/campana-40773.mp3");
                        audio.play();

                        if (totalTimeElapsed >= 2 * 60 * 60) {
                            clearInterval(timer)
                            setIsRunning(false)
                            alert("Two hours Pomodoro session completed! 🎉");
                            return 0;
                        }

                        setMode((prevMode) => prevMode === "focus" ? "break" : "focus");
                        setIsRunning(true);
                        return 0;
                    }
                    setTotalTimeElapsed((elapsed) => elapsed + 1);
                    return prev - 1;
                })
            }, 1000)
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    useEffect(() => {
        if (totalTimeElapsed < 2 * 60 * 60) {
            setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
            setIsRunning(true); // also stop timer when switching modes

            const audio = new Audio("audio/065433_indian-bell-chimewav-87163.mp3")
            audio.play();
        } else {
            setIsRunning(false);
        }

    }, [mode]);

    const formatTimer = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${min}:${sec}`;
    }


    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(25 * 60);
        setMode("focus");
        setTotalTimeElapsed(0);
    }
    return (
        <div className={`flex items-center min-h-screen justify-center ${backgroundClass} transition-all duration-700`}>
            <div className='flex flex-col gap-6'>
                <h1 className='text-4xl font-bold text-pink-800 tracking-wider'>Plumoon - Pomodoro Timer</h1>
                <p className='text-9xl font-extrabold tracking-widest m-2 p-3'>{formatTimer(timeLeft)}</p>
                <p className='flex felx-col text-xl  justify-center'>{mode === "focus" ? "Focus Mode" : "Break Mode"}</p>
                <div className='flex gap-4 mt-4'>
                    <button className='bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md' onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Pause" : "Start"}</button>
                    <button className='bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md' onClick={resetTimer}>Reset</button>
                    <button className='bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md' onClick={() => { setMode("focus") }}> Focus</button>
                    <button className='bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md' onClick={() => { setMode("break") }}>Break</button>
                </div>
            </div>
        </div>
    )
}

export default Timer;