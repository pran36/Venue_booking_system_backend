import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  useEffect (()=>{
    fetch("http://localhost:3000/api/users")
    .then(res =>res.json)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  })
  return (
    <>
      
    </>
  )
}

export default App
