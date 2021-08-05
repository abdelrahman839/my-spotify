import React from 'react'
import Dashbord from './components/Dashbord/Dashbord'
import Login from './components/Login/Login'

function App() {
  const code =new URLSearchParams(window.location.search).get('code')
  return (
    <>
    
      {code ? <Dashbord code={code} /> : <Login />}
    </>
  )
}

export default App
