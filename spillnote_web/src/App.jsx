import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SettingsPage from './settingsPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  let action = 'settings_page';

  switch(action)
  {
    case 'settings_page':
        return (< SettingsPage />);
    default:
      return "something";
  }
}

export default App
