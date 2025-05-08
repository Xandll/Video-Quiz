import "./video-player.css";
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import PopUp from "./pop-up";

export default function VideoPlayer() {
  const playerRef = useRef(null);
  const [data, setData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/prototype.test.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);


  if (!data)
    return <div>Loading...</div>;
  

  const handleAnswer = (selectedAnswer) => {
    setAnswer(selectedAnswer);
    if (selectedAnswer === currentQuestion.rightAnswer) {
      setShowPopUp(false);
      setIsPlaying(true);
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswer(null);
      return true;
    } else {
      console.log("Antwort ist falsch");
      return false;
    }
  };

  return (
    <>
      <div className={`react-player-wrapper ${showPopUp ? "video-hidden" : ""}`}>
        <ReactPlayer
          ref={playerRef}
          url={data.Python.easy[0].URL}
          light={true}
          playing={isPlaying}
          width="90%"
          height="90vh"
          onProgress={(state) => {
            const questions = data.Python.easy[0].questions;
            const question = questions[currentQuestionIndex];
            if (question && state.playedSeconds > question.time) {
              playerRef.current?.seekTo(question.time);
              setIsPlaying(false);
              setShowPopUp(true);
              setCurrentQuestion(question);
            }
          }}
        />
      </div>
      {showPopUp && currentQuestion && (
        <PopUp
          question={currentQuestion.question}
          answer1={currentQuestion.answer1}
          answer2={currentQuestion.answer2}
          answer3={currentQuestion.answer3}
          answer4={currentQuestion.answer4}
          onAnswer={handleAnswer}
        />
      )}
    </>
  );
}
