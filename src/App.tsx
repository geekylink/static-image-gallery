import { useState } from 'react'
//import reactLogo from './assets/react.svg'
import './App.css'

import { Albums } from "./components";

import {getAlbumPath} from "./components/Albums/Albums.functions";


function App() {

  const [imagePath, setImagePath] = useState("");
  const [pastAlbumList, setPastAlbumList] = useState(undefined);

  return (
    <div className="App">
      <div>
        {(imagePath === "")
          ? <Albums OnImageClick={(albumList) => {
              setImagePath(getAlbumPath(albumList));
              setPastAlbumList(albumList);
            }} startAlbumList={pastAlbumList} />
          :
          <>
            <button onClick={() => {
              setImagePath("");

              let newAlbumList = pastAlbumList.concat();
              newAlbumList.pop();
              console.log(newAlbumList);
              setPastAlbumList(newAlbumList);
            }}>
              Back
            </button>
            <button onClick={() => {
              setImagePath("");
              setPastAlbumList(undefined);
            }}>
              Home
            </button>
            <br />
            <a href={`${imagePath}`} target="_blank" rel="noopener noreferrer"><img src={`${imagePath}`} width={"100%"} /></a>
          </>
        }
      </div>
    
    </div>
  )
}

export default App
