import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet"
import { BsGeo } from "react-icons/bs";
import "./Map.css"
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import { LoaderIcon } from "react-hot-toast";
import useUrlPosition from "../../hooks/useUrlPosition";
function Map({ locations }) {
    const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
    const { geoLoading, geoPosition, getGeoLocation } = useGeoLocation();
    const [lat, lng] = useUrlPosition();
    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng])

    useEffect(() => {
        if (geoPosition?.lat && geoPosition?.lng) setMapPosition([geoPosition.lat, geoPosition.lng]);
    }, [geoPosition])

    return (
        <div className="map">
            <MapContainer className="map__leaflet" center={mapPosition} zoom={13}>
                <button className="geo-location" onClick={() => { getGeoLocation() }}>{geoLoading ? <LoaderIcon /> : <BsGeo className="geo-location__icon" />}</button>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
                {
                    locations.map(location => {
                        return (
                            <Marker key={location.id} position={[location.latitude, location.longitude]}>
                                <Popup>
                                    <strong>{location.smart_location}</strong>
                                </Popup>
                            </Marker>
                        )
                    })
                }
                <DetectClick />
                <ChangeCenter position={mapPosition} />
            </MapContainer>
        </div>
    )
}

export default Map

const ChangeCenter = ({ position }) => {
    const map = useMap();
    map.setView(position, map.getZoom())
    return null;
}

const DetectClick = () => {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => {
            navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        },
    })
    return null
}