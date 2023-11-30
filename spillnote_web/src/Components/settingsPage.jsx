import React from "react";
// import Sun from "./images/Sun.svg?react";
// import Moon  from "./images/Moon.svg?react";
import "./styles/DarkMode.css";
// import Header from "../Common/Header.jsx";

export default function SettingsPage()
{
    
        const setDarkMode = () => 
        {
            document.querySelector("body").setAttribute('data-theme', 'dark')
        }
        const setLightMode = () => 
        {
            document.querySelector("body").setAttribute('data-theme', 'light')
        }
        const toggleTheme = e =>
        {
            if(e.target.checked) setDarkMode();
            else setLightMode();
        }
    return (
        <div className='dark_mode'>
            {/* <Header /> */}
            <h1>Settings</h1>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <img src='/settingsIcons/Sun.svg' alt="Sun"/>
                <img src='/settingsIcons/Moon.svg' alt="Moon"/>
            </label>

            {/*
             <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
             */}
        </div>
    );
};
   
