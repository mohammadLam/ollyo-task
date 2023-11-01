import React from 'react'
import Grid from './components/Grid'
import ActionHeader from './components/ActionHeader'

const App: React.FC = () => {
  return (
    <div className=''>
      <div className='w-max mx-auto rounded-xl bg-white p-5 mt-8'>
        <h1 className='font-bold 2xl:text-5xl mb-5 md:text-4xl text-3xl'>My Photo Gallery</h1>
        <ActionHeader />
        <Grid />
      </div>
    </div>
  )
}

export default App
