import './main-menu.css';
import React, { useState } from 'react';

export default function MainMenu({ onStart }) {
    return (
        <main>
            <div className='difficulty-selection'>
                <h1>Choose Difficulty</h1>
                <div className='difficulty-buttons'>
                    <button className='easy' onClick={() => onStart('easy')}>Easy</button>
                    <button className='medium' onClick={() => onStart('medium')}>Medium</button>
                    <button className='hard' onClick={() => onStart('hard')}>Hard</button>
                </div>
                <div className='difficulty-description'>
                    <p>Easy: 5 questions, 30 seconds each</p>
                    <p>Medium: 10 questions, 20 seconds each</p>
                    <p>Hard: 15 questions, 15 seconds each</p>
                </div>
            </div>
        </main>
    )
}
