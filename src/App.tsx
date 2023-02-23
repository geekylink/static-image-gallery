import { useState } from 'react'
//import reactLogo from './assets/react.svg'
import './App.css'

import { Albums } from "./components";

import {getAlbumPath, getAlbumData} from "./components/Albums/Albums.functions";

const GALLERY_TITLE = "Travel Pictures";

function App() {

  const [imagePath, setImagePath] = useState("");
  const [albumList, setAlbumList] = useState([]);
  const [albumData, setAlbumData] = useState({});

  const album = albumList[albumList.length-1];
  const albumPath = getAlbumPath(albumList);

  if (albumData[albumPath] === undefined) {
    getAlbumData(albumList, (data: any) => {      
      albumData[albumPath] = data;
      setAlbumData(structuredClone(albumData));
    });
  }

  return (
    <div className="App">
      <div>
        <div>{}
          {(album != null) /* Album Name */
                  ? <>
                      <h2>
                        {(album.type == "dir") 
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

        {(imagePath === "") // Display the album viewer
          ? <Albums OnImageClick={(albumList) => {
                setImagePath(getAlbumPath(albumList));
                setAlbumList(albumList);
              }} 
              albumList={albumList} albumData={albumData[albumPath]}
              OnAlbumClick={(file) => {
                setAlbumList(albumList.concat(file));
              }}
            />
          : // Display the image instead of the album viewer
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
