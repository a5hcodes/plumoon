import React, { useEffect, useState } from 'react'

// Main Timer component
const Timer = () => {
    // Timer countdown in seconds (initially 25 mins)
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    // Controls whether the timer is running or paused
    const [isRunning, setIsRunning] = useState(false);
    // Current mode - either 'focus' or 'break'
    const [mode, setMode] = useState("focus");
    // Tracks how much total time has passed during this Pomodoro session
    const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);

    // Dynamic background based on current mode
    const backgroundClass = mode === "focus"
        ? "bg-gradient-to-r from-pink-50 to-pink-200"
        : "bg-gradient-to-r from-blue-100 to-blue-300";

    // Effect to run the countdown when the timer is active
    useEffect(() => {
        let timer;

        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    // If the timer reaches 0, switch modes and play sound
                    if (prev === 0) {
                        const audio = new Audio("audio/065433_indian-bell-chimewav-87163.mp3");
                        audio.play();

                        // Stop the session after 2 hours
                        if (totalTimeElapsed >= 2 * 60 * 60) {
                            clearInterval(timer);
                            setIsRunning(false);
                            alert("Two hours Pomodoro session completed! 🎉");
                            return 0;
                        }

                        // Toggle between 'focus' and 'break'
                        setMode((prevMode) => prevMode === "focus" ? "break" : "focus");
                        setIsRunning(true); // Automatically start next session
                        return 0;
                    }

                    // Increase elapsed time and continue countdown
                    setTotalTimeElapsed((elapsed) => elapsed + 1);
                    return prev - 1;
                });
            }, 1000); // Runs every second
        }

        // Clean up interval when component unmounts or dependencies change
        return () => clearInterval(timer);
    }, [isRunning]);

    // Effect to reset timeLeft whenever the mode changes
    useEffect(() => {
        // Only switch mode if total time is within 2 hours
        if (totalTimeElapsed < 2 * 60 * 60) {
            setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60); // Set duration

            const audio = new Audio("audio/076741_chimes-40066.mp3");
            audio.play(); // Chime sound on mode change
        } else {
            setIsRunning(false); // End entire session after 2 hours
        }
    }, [mode]);

    // Helper function to format seconds into MM:SS
    const formatTimer = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${min}:${sec}`;
    };

    // Resets the entire timer session
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(25 * 60);
        setMode("focus");
        setTotalTimeElapsed(0);
    };

    // UI JSX returned
    return (
        <div className={`animated-gradient flex items-center min-h-screen justify-center ${backgroundClass} transition-all duration-700 `}>
            <div className='flex flex-col gap-6'>
                <h2 className=' text-3xl font-bold text-pink-800 text-center'>Plumoon</h2>
                <h1 className='sm:text-4xl md: text-5xl font-bold text-pink-800 tracking-wider text-center'>Pomodoro Timer</h1>
                <p className='items-center justify-center sm:text-7xl md:text-9xl font-extrabold tracking-widest m-2 p-2 text-center'>
                    {formatTimer(timeLeft)} {/* Displays formatted timer */}
                </p>

                <p className='text-center text-xl justify-center hover:shadow-2xl'>
                    {mode === "focus" ? "Focus Mode" : "Break Mode"}
                </p>

                {/* Control Buttons */}
                <div className='flex gap-4 mt-4'>
                    <button
                        className='font-medium bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md'
                        onClick={() => setIsRunning(!isRunning)}
                    >
                        {isRunning ? "Pause" : "Start"}
                    </button>

                    <button
                        className='font-medium bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md'
                        onClick={resetTimer}
                    >
                        Reset
                    </button>

                    <button
                        className=' font-medium bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md'
                        onClick={() => { setMode("focus") }}
                    >
                        Focus
                    </button>

                    <button
                        className='font-medium bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md'
                        onClick={() => { setMode("break") }}
                    >
                        Break
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Timer;
