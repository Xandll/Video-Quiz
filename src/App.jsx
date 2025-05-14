import './App.css';
import VideoPlayer from './components/video-player.jsx';
import MainMenu from './components/main-menu.jsx';
import { useState } from 'react';

export default function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleBack = () => {
    setSelectedDifficulty(null);
  };

  return (
    <div className="App">
      {selectedDifficulty ? (
        <VideoPlayer difficulty={selectedDifficulty} onBack={handleBack} />
      ) : (
        <MainMenu onStart={handleDifficultySelect} />
      )}
    </div>
  );
}