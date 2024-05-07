import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";
import { Button } from '@/components/ui/button';
import { Pause, Play, Settings } from 'lucide-react';

const red = '#f54e4e';
const green = '#4aec8c';

interface SettingsInfo {
  workMinutes: number;
  breakMinutes: number;
  setShowSettings: (newValue: boolean) => void;
}

function Pomodoro() {
  const settingsInfo = useContext(SettingsContext) as SettingsInfo;

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {

    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = mode === 'work'
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds: string | number = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;
  

  return (
    <div className=' flex flex-col gap-10'>
      <div className='h-40 w-40'>
        <CircularProgressbar
          value={percentage}
          text={minutes + ':' + seconds}
          styles={buildStyles({
            textColor: '#0f0000',
            pathColor: mode === 'work' ? red : green,
            trailColor: 'rgba(255,255,255,.2)', // Changed tailColor to trailColor
          })} />
      </div>
      <div className='flex gap-10 items-center justify-center'>
        <div>
          {isPaused
            ? (
              <>
                <Button
                  onClick={() => { setIsPaused(false); isPausedRef.current = false; }}
                  variant="ghost"
                  className='p-0 hover:bg-transparent'
                >
                  <Play className='h-7 w-7' />
                </Button>
              </>
            )
            : (
              <>
                <Button
                  onClick={() => { setIsPaused(true); isPausedRef.current = true; }}
                  variant="ghost"
                  className='p-0 hover:bg-transparent'
                >
                  <Pause className='h-7 w-7' />
                </Button>
              </>
            )
          }
        </div>
        <div>
          <Button
            onClick={() => settingsInfo.setShowSettings(true)}
            variant="ghost"
            className='p-0 hover:bg-transparent'
          >
            <Settings className='h-7 w-7' />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
