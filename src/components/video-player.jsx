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

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleAnswer = (selectedAnswer) => {
    setAnswer(selectedAnswer);
    setShowPopUp(false);
    setIsPlaying(true);
  };

  return (
    <div className="react-player-wrapper">
      <ReactPlayer
        ref={playerRef}
        url={data.Python.easy[0].URL}
        light={true}
        playing={isPlaying}
        width="90%"
        height="90vh"
        onProgress={(state) => {
          data.Python.easy[0].questions.forEach((question) => {
            if (state.playedSeconds > question.time) {
              playerRef.current?.seekTo(question.time);
              setIsPlaying(false);
              setShowPopUp(true);
              setCurrentQuestion(question);
            }
            else{
              setShowPopUp(true);
            }
          });
        }}
      />
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
    </div>
  );
}
