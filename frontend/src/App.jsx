import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Timer from './Components/Timer'

function App() {

  const notify = (text) => {

    alert(text)

    // if (localStorage.notify == 'true') {
    //   if ( Notification.permission == 'granted') {

    //   }else if  (Notification.permission !== 'granted') {}
    // } 

    // var noti = new Notification('Example Text', {
    //   body:'Greetings'
    // })


  }

  return (
    <>

      {/* <button className='notify-button' onClick={() => {localStorage.setItem('notify', 'true')}}> Recienve notifications</button> */}

      <Timer sendNotification={notify} />
    </>
  )
}

export default App
