import { useState, useRef, useEffect } from "react";
import ResultModal from "./resultModal";

export default function TimerChallenge({ title, targetTime }) {
 
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }
    // useEffect(() => {
    //     if (timeExpired) {
    //         dialog.current.open(); // Accessing showModal after component mounts
    //     }
    // },);
    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaing => prevTimeRemaing - 10);

        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }
    return (
        <>
            {<ResultModal ref={dialog} result={'Lost'} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />}
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}

                </p>
                <p>
                    <button onClick={timeIsActive ? handleStop : handleStart}>
                        {timeIsActive ? 'Stop' : 'Start'} challenge
                    </button>
                </p>
                <p className={timeIsActive ? 'active' : undefined}>
                    {timeIsActive ? 'Time is running... ' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}