import { useState, useEffect } from "react"

function Timer ()
{
    const getDate = () => {
        return (Math.floor(Date.now() / 1000))
    }
    const [timeLeft, setTimeLeft] = useState(60)
    const [formattedTime, setFormattedTime] = useState("00:00")
    const [duration, setDuration] = useState(60)
    const [startTime, setStartTime] = useState(getDate() + 60)
    const [playing, setPlaying] = useState(false)
    const [clockInterval, setClockInterval] = useState(null)

    const temp = 15

    //Self explainatory
    const formatTime = (time) => {

        var min = Math.floor(time / 60)
        var sec = Math.floor(time % 60)

        sec = sec >= 10 ? ""+sec:"0"+sec
        min = min >= 10 ? ""+min:"0"+min

        return(min + ":" + sec)
    }

    useEffect(() => {
        //Update the visual time every time 'timeLeft' changes
        setFormattedTime(formatTime(timeLeft))
    },[timeLeft])

    const updateTime = () =>{
        //The Prev allows us to use the newer instance of the timeLeft variable
        setTimeLeft(prev => {
        console.log("Updated time to", prev - 1);
        return prev - 1;
        });

    }
    
    //Change the new duration
    const newTime = () => {
        setDuration(temp)
        setTimeLeft(temp)
        // setStartTime(getDate())
    }

    //Control When the timer starts
    const startClock = (e) => {
        e.preventDefault()
        playing ? clearInterval(clockInterval):setClockInterval(setInterval(updateTime, 1000))
        setPlaying(!playing)

    }

    return <> 
    <div>
        <h1>{formattedTime}</h1>
        <button onClick={startClock}>Start</button>
         <button onClick={newTime}>New Time</button>

    </div>
    
    </>
}


export default Timer