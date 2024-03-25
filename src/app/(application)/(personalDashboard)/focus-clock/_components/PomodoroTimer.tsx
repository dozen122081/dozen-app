import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useDocumentTitle } from '@mantine/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
const PomodoroTimer: React.FC = () => {
    const [title, setTitle] = useState('');
    useDocumentTitle(title);
    const initialTime = Number(localStorage.getItem('pomodoroTime')) || 25 * 60; // Initial time: 25 minutes in seconds
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const [stopWatchTime, setStopwatchTime] = useState<number>(0);
    const [isStopwatchActive, setIsStopwatchActive] = useState<boolean>(false);

    const [favicon, setFavicon] = useState('');
    const setRocketFavicon = () => setFavicon('/rocket.ico');

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
                setTitle(`🚀 ${formatTime(time)} - Focus`)
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isStopwatchActive) {
            interval = setInterval(() => {
                setStopwatchTime((prevTime) => prevTime + 10);
            }, 10);
        }

        return () => clearInterval(interval);
    }, [isStopwatchActive]);

    useEffect(() => {
        // Save time to localStorage whenever it changes
        localStorage.setItem('pomodoroTime', String(time));
    }, [time]);

    const startTimer = () => {
        setIsActive(true);
        setRocketFavicon()
    };

    const pauseTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(25 * 60);
    };

    const formatTime = (timeInSeconds: number): string => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const startStopwatchTimer = () => {
        setIsStopwatchActive(true);
    };

    const stopStopwatchTimer = () => {
        setIsStopwatchActive(false);
    };

    const resetStopwatchTimer = () => {
        setIsStopwatchActive(false);
        setStopwatchTime(0);
    };

    const formatStopwatchTime = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className='w-full flex flex-col md:flex-row justify-between gap-20 px-5 py-10'>
            {/* Pomodoro Timer */}
            <div className='w-full rounded-2xl border flex flex-col gap-10 items-center p-10 justify-center'>
                <div className='flex flex-col w-full items-center gap-10'>
                    <motion.span className='text-7xl' layout layoutId='pomodoro'>
                        {formatTime(time )}
                    </motion.span>
                    {isActive && <Progress value={time / 60} className='w-full h-1' />}
                </div>
                <motion.div layout layoutId='motion-div-layout' className='flex gap-10 text-lg'>
                    {!isActive && <Button onClick={startTimer}>Start</Button>}
                    {isActive && (
                        <Button className='' variant={'outline'} onClick={pauseTimer}>
                            Pause
                        </Button>
                    )}
                    <Button variant={'outline'} onClick={resetTimer}>
                        Reset
                    </Button>
                </motion.div>
            </div>

            {/* Stopwatch Timer */}
            <div className='w-full rounded-2xl border flex flex-col gap-10 items-center justify-center p-10 h-[70vh]'>
                <div className='flex flex-col w-full items-center gap-10'>
                    <AnimatePresence>
                        <motion.div
                            style={{ position: 'relative', overflow: 'hidden' }}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            className='text-7xl'
                        >
                            {formatStopwatchTime(stopWatchTime)}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className='flex gap-10 text-lg'>
                    {!isStopwatchActive && <Button onClick={startStopwatchTimer}>Start</Button>}
                    {isStopwatchActive && (
                        <Button className='' variant={'outline'} onClick={stopStopwatchTimer}>
                            Pause
                        </Button>
                    )}
                    <Button variant={'outline'} onClick={resetStopwatchTimer}>
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
