import '../css/Timer.css'
import { useState, useEffect, useRef } from "react"

function Timer ({sendNotification})
{
    const devMode = true
    const getDate = () => { return (Math.floor(Date.now() / 1000)) /* Displays in seconds*/}
    
    /* 
    Can't make this a state because...
    useRef uses a mutable value that persisits across renders, but doesn't retrigger them
    whatever that means...
    Clearling the latest interval preventing reticking
    */
    const clockInterval = useRef(null)

    //ChatGPT helped with this portion - fixed my timing inconsistency
    const [endTime, setEndTime] = useState(0)
    const [duration, setDuration] = useState( 5)
    const [playing, setPlaying] = useState(false)

    const [formattedTime, setFormattedTime] = useState("0:00")
    
    const [clockText, setClockText] = useState("Start") //Start Pause Button Text
    const [stageNum, setStageNum] = useState(0) //Stage we're currently on internally
    const [stage, setStage] = useState("Focus") //Visual rep of stage

    const [breakTime, setBreakTime] = useState((devMode && 5) || 60 * 5)
    const [focusTime, setFocusTime] = useState((devMode && 5) || 60 * 25)
    const [longBreakTime, setLongBreakTime] = useState((devMode && 5) || breakTime * 3)


    //Self explainatory
    const formatTime = (time) => {

        var min = Math.floor(time / 60)
        var sec = Math.floor(time % 60)

        sec = sec >= 10 ? ""+sec:"0"+sec
        // min = min >= 10 ? ""+min:"0"+min

        return(min + ":" + sec)
    }

    //Uses the local endTime we send
    const updateClock = (initEndTime) => {

        const currentTime = getDate()
        const newTimeLeft = Math.max(initEndTime  - currentTime , 0) //Instead of having old end time which could give an negative just have 0
        
        //We can't setEndTime NOW cause it doesn't update syncronously so we have to send it to update clock
        const formatted = formatTime(newTimeLeft)
        setFormattedTime(formatted) 

        document.title = `${formatted} • ${stage}` //Changes tabe text

        if (newTimeLeft <= 0) {
            setStageNum(prev => {
            const nextStage = prev + 1        
            changeStage(nextStage) //Now, we use the freshes one automatically when put into the change stage 
            return nextStage
            })
            
        }
    }


    //Control When the timer starts
    const startClock = (initDuration) => {
        
        setFormattedTime(formatTime(initDuration)) //Get the right time off the bat

        if (clockInterval.current) clearInterval(clockInterval.current)
        const currentTime = getDate()
        const newEndTime = currentTime + (initDuration)
        
        setEndTime(newEndTime)
        setDuration(initDuration)
                        
        //Weird react formatting for the functino of interval
        clockInterval.current = setInterval(() => updateClock(newEndTime), 1000) //New start updating the visual
        setClockText("Pause")
        setPlaying(true)
    }

    const stopClock = (e) => {

        if (clockInterval.current) clearInterval(clockInterval.current)
        
        const currentTime = getDate()
        setDuration(endTime - currentTime)    

        setClockText("Resume")
        setPlaying(false)
    }

    const toggleClock = (e) => {
        // if (e) {e.preventDefault()} /Don't misuese e.default - It's for things like forms where their default refresh the page
        if (playing) {
            stopClock()
        } else {
            startClock(duration)
        }
    }

    const changeStage = (customStage, unatural) => {
        //Even==focus, odd==break, 5*k == Long break
        var newStage = stageNum + 1
        var newStageText = "Focus"
        var initDuration = focusTime
        // console.log("Now at stage:", newStage)

        stopClock()

        if (Number.isInteger(customStage)) {newStage = customStage}  //Uses local first - Needs the iff or it's an infinite loop

        if ((newStage === 0) || (newStage % 2 === 0)) {
            // console.log("Focus", newStage)
            setStage("Focus")
            newStageText = "Focus"
            initDuration = focusTime
            
        } else if (newStage === 5) {
            // console.log("Long break", newStage)
            setStage("Long")
            newStageText = "Long Break"
            initDuration = longBreakTime
            
            setStageNum(0) //To restart the loop
        } else {
            // console.log("Normal break", newStage)
            setStage("Break")
            newStageText = "Break"
            initDuration = breakTime
        }

        if (!unatural) {sendNotification({"stage": newStageText, "time": formatTime(initDuration)})}
        
        startClock(initDuration)
    }

    return <> 
    <div>
        {/* You can have conditional classnames*/}
        {/* !NOTICE we use ` it's not quotes */}
        <h2>{stage}</h2>
        <h1 className={`timer-${stage}`}>{formattedTime}</h1>
        <button onClick={toggleClock}>{clockText}</button>

         <button onClick={() => {
            setStageNum(prev => {
            const nextStage = prev + 1        
            changeStage(nextStage, true) 
            return nextStage
            })}}>Skip</button>

         {/* Reset Button */}
         <button onClick={() => {
            stopClock()
            console.log(stageNum)
            changeStage(0, true)
         }}>Reset</button>

    </div>
    
    </>
}


export default Timer