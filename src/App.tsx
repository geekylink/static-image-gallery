import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import './App.css'
import "leaflet/dist/leaflet.css";

import { File, AlbumData } from "./types";
import { Albums } from "./components";
import { getAlbumPath, getAlbumData } from "./components/Albums/Albums.functions";

const GALLERY_TITLE = "Travel Photos";

function App() {

  const [imagePath, setImagePath] = useState("");
  const [albumList, setAlbumList] = useState<Array<File>>([]);
  const [albumDataMap, setAlbumData] = useState<Map<string, AlbumData>>(new Map());

  const album: File = albumList[albumList.length-1];
  const albumPath: string = getAlbumPath(albumList);

  if (!albumDataMap.has(albumPath)) {
    getAlbumData(albumList, (data: AlbumData) => {      
      albumDataMap.set(albumPath, data);
      setAlbumData(structuredClone(albumDataMap));
    });
  }

  let lat = (albumDataMap?.has(albumPath)) ? albumDataMap.get(albumPath)?.lat : undefined;
  let lon = (albumDataMap?.has(albumPath)) ? albumDataMap.get(albumPath)?.lon : undefined;

  console.log(lat + "," + lon);

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
                      </button><br /><br />
                    </>
                  : <h2>{GALLERY_TITLE}</h2>
          }
        </div>

        {(lat != undefined && lon != undefined)
        ?
        <div className="myMapDiv" style={{"width": "100%"}}>
          <MapContainer center={[lat, lon]} zoom={10} scrollWheelZoom={false} 
                      style={{height: "33vh", "width": "33vw", "margin": "auto"}} >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, lon]}>
                <Popup>
                  {album.file}
                </Popup>
              </Marker>
          </MapContainer><br />
        </div>
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
