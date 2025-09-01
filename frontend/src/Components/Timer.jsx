import '../css/Timer.css'
import { useState, useEffect } from "react"

function Timer ()
{
    const devMode = false
    const getDate = () => {
        return (Math.floor(Date.now() / 1000))
    }
    const [timeLeft, setTimeLeft] = useState(10)
    const [formattedTime, setFormattedTime] = useState("00:00")
    const [duration, setDuration] = useState(60)
    const [startTime, setStartTime] = useState(getDate() + 60)
    const [playing, setPlaying] = useState(false)
    const [clockInterval, setClockInterval] = useState(null)
    const [clockText, setClockText] = useState("Start")
    const [stageNum, setStageNum] = useState(0)
    const [stage, setStage] = useState("Focus")

    const [breakTime, setBreakTime] = useState(60 * 5)
    const [focusTime, setFocusTime] = useState(60 * 25)
    const [longBreakTime, setLongBreakTime] = useState(breakTime*3)


    //Self explainatory
    const formatTime = (time) => {

        var min = Math.floor(time / 60)
        var sec = Math.floor(time % 60)

        sec = sec >= 10 ? ""+sec:"0"+sec
        min = min >= 10 ? ""+min:"0"+min

        return(min + ":" + sec)
    }

    //Change the new duration
    const newTime = (time) => {
        setDuration(time / ((devMode && 60) || 1))
        setTimeLeft(time / ((devMode && 60) || 1))
        // setStartTime(getDate())
    }

    //Control When the timer starts
    const startClock = (e) => {
        setClockInterval(setInterval(updateTime, (devMode && 100) || 1000))
        setClockText("Pause")
        setPlaying(true)
    }
    const stopClock = (e) => {
        clearInterval(clockInterval)
        setClockText("Resume")
        setPlaying(false)
    }
    const toggleClock = (e) => {
        // if (e) {e.preventDefault()} /Don't misuese e.default - It's for things like forms where their default refresh the page
        if (playing) {
            stopClock()
        } else {
            startClock()
        }
    }

    const changeStage = (customStage) => {
        //Even==focus, odd==break, 5*k == Long break
        var newStage = stageNum
        console.log(newStage)
        if (Number.isInteger(customStage)) {newStage = customStage}  //Uses local first - Needs the iff or it's an infinite loop

        if ((newStage === 0) || (newStage % 2 === 0)) {
            console.log("Focus", newStage)
            setStage("Focus")
            newTime(focusTime)
            
        } else if (newStage === 5) {
            console.log("Long break", newStage)
            setStage("Long")
            setStageNum(0)
            newTime(longBreakTime)
            
            return
        } else {
            console.log("Normal break", newStage)
            setStage("Break")
            newTime(breakTime)
        }

        setStageNum(newStage+1)


    }

    //Catches when the time changes and things need to be done
    useEffect(() => {
        setFormattedTime(formatTime(timeLeft))

        //Check if there is no time left
        if (timeLeft <= 0) {
            console.log("Should Change")
            changeStage()

        }
    },[timeLeft])


    const updateTime = () =>{
        //The Prev allows us to use the newer instance of the timeLeft variable
        setTimeLeft(prev => {
        // console.log("Updated time to", prev - 1);
        //Hello
        return prev - 1;
        });
    }
    


    return <> 
    <div>
        {/* You can have conditional classnames*/}
        {/* !NOTICE we use ` it's not quotes */}
        <h1 className={`timer-${stage}`}>{formattedTime}</h1>
        <button onClick={toggleClock}>{clockText}</button>
         <button onClick={changeStage}>Skip</button>
         {/* Reset Button */}
         <button onClick={() => {
            stopClock()
            console.log(stageNum)
            //Start at stage 1 again
            changeStage(0)
         }}>Reset</button>

    </div>
    
    </>
}


export default Timer