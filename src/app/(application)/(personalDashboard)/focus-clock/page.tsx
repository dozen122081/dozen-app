"use client"
import React, { useState } from 'react'
import Pomodoro from './_components/pomodoro/Pomodor'
import Settings from './_components/pomodoro/Settings'
import SettingsContext from './_components/pomodoro/SettingsContext'
import Clock from './_components/Clock'

const page = () => {
  return (
    <div>
      <Clock />
    </div>
  )
}

export default page