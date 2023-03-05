import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

type MapMarkerData = {
  lat: number,
  lon: number,
  description: string,
}

type MapViewProps = {
    latlon?: [number, number],
    zoom?: number,
    markers?: Array<MapMarkerData>,
};

export const MapView = ({
    latlon = [39, -97], // ~Center of the USA
    zoom = 3,
    markers = new Array(),
}: MapViewProps) => {

  let lat = latlon[0];
  let lon = latlon[1];

    return (
        <div className="myMapDiv" style={{"width": "100%"}}>
          <MapContainer center={[lat, lon]} zoom={zoom} scrollWheelZoom={false} 
                      style={{height: "33vh", "width": "33vw", "margin": "auto"}} >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markers.map((marker) => {
                <Marker position={[marker.lat, marker.lon]}>
                  <Popup>
                   {marker.description}
                 </Popup>
                </Marker>
              })}
              
          </MapContainer><br />
        </div>
    );
}
