// function ModeSettings()
// {
//     let mode = document.getElementById("darksetting");

//     mode.classList.toggle("lightsetting");

//     //document.getElementById('darksetting') = mode;
// }
import DarkMode from './scripts/DarkMode.jsx'
import { useState, useRef } from 'react';

export default function SettingsPage()
{
    const theme = useRef(null);
    const [show, setShow] = useState(true);

    return (
        <div className="settings">
            <DarkMode />
            {/* <form id="settingsform">
                <label htmlFor="dmselect">Theme</label>
                <select name="themeselect" id="dmselect">
                    <option value={0}>Dark</option>
                    <option value={1}>Light</option>
                </select>
                <label htmlFor="fontselect">Font</label>
                <select name="fontselect" id="fontselect">
                    <option value={0}>Times New Roman</option>
                    <option value={1}>Cursive</option>
                </select>
                <button>Apply</button>
            </form> */}
        </div>
    );
}
