import { useState } from "react"

export default function PopUp({ question, answer1, answer2, answer3, answer4, onAnswer }) {
    const [yourAnswer, setYourAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    
    const handleAnswer = (answer) => {
        setYourAnswer(answer);
        setShowFeedback(true);
        const result = onAnswer(answer);
        if (result) {
            setFeedbackMessage("Richtig! 🎉");
            setIsWrong(false);
        } else {
            setFeedbackMessage("Falsch! Versuche es noch einmal.");
            setIsWrong(true);
            // Reset after 2 seconds to allow new attempts
            setTimeout(() => {
                setShowFeedback(false);
                setIsWrong(false);
                setFeedbackMessage("");
            }, 2000);
        }
    }
    
    return (
        <div className="popup-container">
            <h3>{question}</h3>
            <div className="answers-grid">
                <button 
                    className={isWrong ? "wrong-answer" : ""} 
                    disabled={showFeedback && !isWrong} 
                    onClick={() => handleAnswer(1)}
                >
                    {answer1}
                </button>
                <button 
                    className={isWrong ? "wrong-answer" : ""} 
                    disabled={showFeedback && !isWrong} 
                    onClick={() => handleAnswer(2)}
                >
                    {answer2}
                </button>
                <button 
                    className={isWrong ? "wrong-answer" : ""} 
                    disabled={showFeedback && !isWrong} 
                    onClick={() => handleAnswer(3)}
                >
                    {answer3}
                </button>
                <button 
                    className={isWrong ? "wrong-answer" : ""} 
                    disabled={showFeedback && !isWrong} 
                    onClick={() => handleAnswer(4)}
                >
                    {answer4}
                </button>
            </div>
            {showFeedback && (
                <div className={`feedback-message ${isWrong ? 'wrong' : 'correct'}`}>
                    {feedbackMessage}
                </div>
            )}
        </div>
    )
}