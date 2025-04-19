import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { easeOut } from 'motion';


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
    const MotionButton = motion.button;
    const MotionDiv = motion.div;
    const MotionP = motion.p;

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
        <MotionDiv initial = {{opacity:0}} animate = {{opacity: 1}} transition={{duration: 0.9}}
         className={`animated-gradient flex items-center min-h-screen justify-center ${backgroundClass} transition-all duration-700 `}>
            <div className='flex flex-col sm:gap-4 md:gap-6'>
                <h2 className=' text-3xl font-bold text-pink-800 text-center pixelify-sans'>Plumoon</h2>
                <h1 className='sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-800 tracking-wider text-center pixelify-sans'>Pomodoro Timer</h1>
                <p className='text-center tracking-wider pixelify-sans text-pink-950 backdrop-blur-2xl'>2 hours long pomodoro timer</p>
                <MotionP key={timeLeft} initial = {{opacity: 0.5}} animate = {{opacity: 0.9}} transition={{duration: 0.4, ease: easeOut}}
                className='items-center justify-center sm:text-7xl md:text-9xl font-extrabold tracking-widest m-2 p-2 text-center pixelify-sans text-pink-950 hover:text-shadow-9xl'>
                    {formatTimer(timeLeft)} {/* Displays formatted timer */}
                </MotionP>

                <p className='text-center  text-xl sm:text-lg justify-center pixelify-sans'>
                    {mode === "focus" ? "FOCUS MODE" : "BREAK MODE"}
                </p>

                {/* Control Buttons */}
                <div className='flex flex-col sm:flex-row gap sm:justify-center sm:items-center gap-4 mt-4 pixelify-sans'>
                    <MotionButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='font-medium bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md pixel-border cursor-pointer'
                        onClick={() => setIsRunning(!isRunning)}
                    >
                        {isRunning ? "Pause" : "Start"}
                    </MotionButton>

                    <MotionButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='font-medium bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md pixel-border cursor-pointer'
                        onClick={resetTimer}
                    >
                        Reset
                    </MotionButton>

                    <MotionButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className=' font-medium bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md pixel-border cursor-pointer'
                        onClick={() => { setMode("focus") }}
                    >
                        Focus
                    </MotionButton>

                    <MotionButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='font-medium bg-pink-300 py-2 px-4 rounded-xl w-32 hover:bg-pink-900 hover:text-white transition duration-500 shadow-md pixel-border cursor-pointer'
                        onClick={() => { setMode("break") }}
                    >
                        Break
                    </MotionButton>
                </div>
            </div>
        </MotionDiv>
    );
};

export default Timer;