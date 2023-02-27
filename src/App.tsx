import { useState } from 'react'
//import reactLogo from './assets/react.svg'
import './App.css'
import "leaflet/dist/leaflet.css";

import { Albums } from "./components";

import {getAlbumPath, getAlbumData} from "./components/Albums/Albums.functions";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


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

  let lat = undefined;
  let lon = undefined;

  if (albumData[albumPath] != undefined && albumData[albumPath].lat != undefined && albumData[albumPath].lon != undefined) {
    lat = albumData[albumPath].lat;
    lon = albumData[albumPath].lon;
  }
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
          <MapContainer center={[lat, lon]} zoom={(albumData != undefined && albumData[albumPath] != undefined && albumData[albumPath].zoom != undefined) ? albumData[albumPath].zoom : 10} scrollWheelZoom={false} 
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
