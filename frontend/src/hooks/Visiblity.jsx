import { useEffect, useState, useRef } from "react";


export default function handleVisiblity() {
    const [isVisible, setIsVisible] = useState(true)
    const visbilityChecker = useRef(false)
    //THis use effect runs only ONCE when the component is loaded in
    useEffect(() => {
        const handleVisiblityChange = () => {
            setIsVisible(!document.hidden);
        }
        document.addEventListener('visibilitychange', handleVisiblityChange);

        //This return happens when the component unmounts (Not used again)
        return () => {
            document.removeEventListener('visibilitychange', handleVisiblityChange);
        };
    }, []) // <--- This empty array ensures this only runs once - You forgot that idiot

    // useEffect(() => {
    //     console.log(isVisible)
    // }, [isVisible])

    return isVisible;
}