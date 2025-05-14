import './main-menu.css';
import React from 'react';

export default function MainMenu({ onStart }) {
    const handleDifficultySelect = (difficulty) => {
        if (onStart) {
            onStart(difficulty);
        }
    };

    return (
        <div className="main-menu">
            <header>
                <div></div>
                <h1>Video-Quiz</h1>
                <div><img src="/logo.png" alt="logo"/></div>
            </header>
            <div className="menu">
                <button className="easy" onClick={() => handleDifficultySelect('easy')}>Easy</button>
                <button className="medium" onClick={() => handleDifficultySelect('medium')}>Medium</button>
                <button className="hard" onClick={() => handleDifficultySelect('hard')}>Hard</button>
            </div>
        </div>
    );
}