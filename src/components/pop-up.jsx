import { useState } from "react"

export default function PopUp({ question, answer1, answer2, answer3, answer4 }) {
    const [yourawnser, setyourawnser] = useState(5)
    const handleAnswer = (answer) => {
        setyourawnser(answer);
        onAnswer(answer);
    }
    
    return (
        <div>
        <h3>{question}</h3>
        <button onClick={() => handleAnswer(1)}>{answer1}</button><br/>
        <button onClick={() => handleAnswer(2)}>{answer2}</button><br/>
        <button onClick={() => handleAnswer(3)}>{answer3}</button><br/>
        <button onClick={() => handleAnswer(4)}>{answer4}</button><br/>
    </div>
    )
}