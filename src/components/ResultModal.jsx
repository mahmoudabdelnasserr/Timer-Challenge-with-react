import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref){
    const score =  Math.round(( 1 - remainingTime / (targetTime * 1000)) * 100 );
    const userLost = remainingTime <= 0;
    const formattedTimeRemaining = (remainingTime / 1000).toFixed(2);
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        }
    });
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            { userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime}</strong></p>
            <p>You stopped the timer with <strong>{formattedTimeRemaining} seconds left</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>

        </dialog>,
        document.getElementById('modal')

    );
})

export default ResultModal;