import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandPage from './Components/LandPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <LandPage/>
    </>
  )
}

export default App
