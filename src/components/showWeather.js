import { Stack, Typography } from '@mui/material'
import React from 'react'
import { GetUserLocation } from './locationHook'

export default function ShowWeather() {
    const {location , weatherData} = GetUserLocation()
    console.log(location);
    console.log(weatherData)
  return (
    <Stack> 
        <Typography>mostly sunny</Typography>
    </Stack>
  )
}