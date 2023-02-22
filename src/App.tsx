import { useState } from 'react'
//import reactLogo from './assets/react.svg'
import './App.css'

import { Albums } from "./components";

function App() {

  return (
    <div className="App">
      <div>
        <Albums OnImageClick={(imagePath) => {
          //alert(imagePath);
        }}/>
      </div>
    
    </div>
  )
}

export default App
