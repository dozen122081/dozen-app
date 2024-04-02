"use client"
import React, { useState } from 'react'
import Pomodoro from './_components/pomodoro/Pomodor'
import Settings from './_components/pomodoro/Settings'
import SettingsContext from './_components/pomodoro/SettingsContext'

const page = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  return (
    <div className='w-full rounded-2xl border flex flex-col gap-10 items-center p-10 justify-center'>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <Pomodoro />}
      </SettingsContext.Provider>
    </div>
  )
}

export default page