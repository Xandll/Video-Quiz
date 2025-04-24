import './main-menu.css';
import React, { useState } from 'react';
import logo from "/public/logo.png"

export default function MainMenu({ onStart }) {
    return(
        <>
            <header><img src="{logo}" alt="logo"/></header>
            <h1>VIDEO QUIZ</h1>
        </>
    )
}
