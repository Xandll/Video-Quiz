import "./video-player.css";
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import PopUp from "./pop-up";

export default function VideoPlayer({ difficulty, onBack }) {
  const playerRef = useRef(null);
  const [data, setData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/questions_python.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
        // Randomly select a video from the chosen difficulty
        const videosInDifficulty = jsonData.Python[difficulty];
        const randomIndex = Math.floor(Math.random() * videosInDifficulty.length);
        setSelectedVideoIndex(randomIndex);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [difficulty]);

  if (!data || selectedVideoIndex === null) return <div>Loading...</div>;

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

  const currentVideo = data.Python[difficulty][selectedVideoIndex];
  const questions = currentVideo.questions;

  return (
    <>
      <button className="back-button" onClick={onBack}>
        ← Back to Menu
      </button>
      <div className={`react-player-wrapper ${showPopUp ? "video-hidden" : ""}`}>
        <ReactPlayer
          ref={playerRef}
          url={currentVideo.URL}
          light={true}
          playing={isPlaying}
          width="90%"
          height="90vh"
          onProgress={(state) => {
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
