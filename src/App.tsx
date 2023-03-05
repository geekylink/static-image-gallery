import { useState } from 'react'

import './App.css'
import "leaflet/dist/leaflet.css";

import { File, AlbumData } from "./types";
import { Albums, MapView } from "./components";
import { getAlbumPath, getAlbumData } from "./components/Albums/Albums.functions";

const GALLERY_TITLE = "Travel Photos";

function App() {

  const [imagePath, setImagePath] = useState("");
  const [albumList, setAlbumList] = useState<Array<File>>([]);
  const [albumDataMap, setAlbumData] = useState<Map<string, AlbumData>>(new Map());

  const [latlon, setLatlon] = useState<[number, number] | undefined>(undefined);

  const album: File = albumList[albumList.length-1];
  const albumPath: string = getAlbumPath(albumList);

  if (!albumDataMap.has(albumPath)) {
    getAlbumData(albumList, (data: AlbumData) => {      
      albumDataMap.set(albumPath, data);
      setAlbumData(structuredClone(albumDataMap));
      let lat = (albumDataMap.has(albumPath)) ? albumDataMap.get(albumPath)?.lat : undefined;
      let lon = (albumDataMap.has(albumPath)) ? albumDataMap.get(albumPath)?.lon : undefined;
      
      if (lat && lon) {
        setLatlon([lat, lon]);
      }
    });
  }

    console.log(latlon);

  return (
    <div className="App">
      <div>
        <div>
          
          {(album != null) /* Album Name */
                  ? <>
                      <h2>
                        {(album.type == "dir") 
                          ? <>Album: {album.file}</>
                          : <>{album.file}</>
                        }
                      </h2>

                      <button onClick={() => {
                          setImagePath("");

                          let newAlbumList = albumList.concat();
                          newAlbumList.pop();
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
                      </button><br /><br />
                    </>
                  : <h2>{GALLERY_TITLE}</h2>
          }
        </div>

        {(latlon != undefined)
        ?
          <MapView latlon={latlon} zoom={albumDataMap?.get(albumPath)?.zoom} />
        : null
        }
        

        {(imagePath === "") // Display the album viewer
          ? <Albums OnImageClick={(albumList) => {
                setImagePath(getAlbumPath(albumList));
                setAlbumList(albumList);
              }} 
              albumList={albumList} albumData={albumDataMap?.get(albumPath)}
              OnAlbumClick={(file: File) => {
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
