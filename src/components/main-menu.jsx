import './main-menu.css';
import React, { useState } from 'react';

export default function MainMenu({ onStart }) {
    function redirect(){
        document.getElementsByClassName("easy").addEventListener("click", function(){
            window.location.href = "https://www.youtube.com/watch?v=2Vv-BfVoq4g&ab_channel=EdSheeran-Topic";
        });
    }
    return(
        <body>
            <header>
                <div></div>
                <h1>Video-Quiz</h1>
                <div><img src=".\logo.png" alt="logo"/></div>
            </header>
            <div className="menu">
                <button className="easy">Easy</button>
                <button className="medium">Medium</button>
                <button className="hard">Hard</button>
            </div>
        </body>
    )
}