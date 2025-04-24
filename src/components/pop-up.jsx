import { useState } from "react"

export default function PopUp({ question, answer1, answer2, answer3, answer4, onAnswer }) {
    const [yourAnswer, setYourAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    
    const handleAnswer = (answer) => {
        setYourAnswer(answer);
        setShowFeedback(true);
        const result = onAnswer(answer);
        if (!result) {
            setIsWrong(true);
            // Reset after 1 second to allow new attempts
            setTimeout(() => {
                setShowFeedback(false);
                setIsWrong(false);
            }, 1000);
        }
    }
    
    return (
        <div className="popup-container">
            <h3>{question}</h3>
            <button 
                className={isWrong ? "wrong-answer" : ""} 
                disabled={showFeedback && !isWrong} 
                onClick={() => handleAnswer(1)}
            >
                {answer1}
            </button><br/>
            <button 
                className={isWrong ? "wrong-answer" : ""} 
                disabled={showFeedback && !isWrong} 
                onClick={() => handleAnswer(2)}
            >
                {answer2}
            </button><br/>
            <button 
                className={isWrong ? "wrong-answer" : ""} 
                disabled={showFeedback && !isWrong} 
                onClick={() => handleAnswer(3)}
            >
                {answer3}
            </button><br/>
            <button 
                className={isWrong ? "wrong-answer" : ""} 
                disabled={showFeedback && !isWrong} 
                onClick={() => handleAnswer(4)}
            >
                {answer4}
            </button><br/>
        </div>
    )
}