import { useState } from 'react'
//import reactLogo from './assets/react.svg'
import './App.css'

import { Albums } from "./components";

import {getAlbumPath} from "./components/Albums/Albums.functions";


const GALLERY_TITLE = "Travel Pictures";


function App() {

  const [imagePath, setImagePath] = useState("");
  const [albumList, setAlbumList] = useState([]);

  const album = albumList[albumList.length-1]; // Current level of album

  return (
    <div className="App">
      <div>
        <div>
          {(album != null) /* Album Name */
                  ? <>
                      <h2>{(album.type == "dir") 
                          ? <>Album: {album.file}</>
                          : <>{album.file}</>
                        }
                      </h2><br />
                      <button onClick={() => {
                          setImagePath("");

                          let newAlbumList = albumList.concat();
                          newAlbumList.pop();
                          console.log(newAlbumList);
                          setAlbumList(newAlbumList);
                        }}
                      >
                        Back
                      </button>
                      <button onClick={() => {
                        setImagePath("");
                        setAlbumList([]);
                        }}
                      >
                        Home
                      </button>
                    </>
                  : <h2>{GALLERY_TITLE}</h2>
          }
        </div>

        {(imagePath === "")
          ? <Albums OnImageClick={(albumList) => {
                setImagePath(getAlbumPath(albumList));
                setAlbumList(albumList);
              }} 
              albumList={albumList} 
              OnAlbumClick={(file) => {
                setAlbumList(albumList.concat(file));
              }}
            />
          :
          <>
            <br />
            <a href={`${imagePath}`} target="_blank" rel="noopener noreferrer"><img src={`${imagePath}`} width={"100%"} /></a>
          </>
        }
      </div>
    
    </div>
  )
}

export default App
