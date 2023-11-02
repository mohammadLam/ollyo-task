import React from 'react'
import { animated, useSpring } from '@react-spring/web'
import Grid from './components/Grid'
import ActionHeader from './components/ActionHeader'

const App: React.FC = () => {
  const spring = useSpring({ from: { x: -500, opacity: 0 }, to: { x: 0, opacity: 1 } })
  return (
    <div className=''>
      <div className='w-max mx-auto rounded-xl bg-white p-5 my-8 overflow-hidden'>
        <animated.h1 style={spring} className='font-bold 2xl:text-5xl mb-5 md:text-4xl text-3xl'>
          My Photo Gallery
        </animated.h1>
        <ActionHeader />
        <Grid />
      </div>
    </div>
  )
}

export default App
