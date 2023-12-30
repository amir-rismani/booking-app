import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

import "./Map.css"
import { useHotels } from "../../context/HotelsProvider";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
function Map() {
    const navigate = useNavigate();
    const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
    const { hotels, isLoading } = useHotels();

    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('long');

    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng])

    console.log(mapPosition)

    if (isLoading) return <Loader />

    return (
        <div className="map">
            <MapContainer className="map__leaflet" center={mapPosition} zoom={11} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    hotels.map(hotel => {
                        return (
                            <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
                                <Popup>
                                    <strong>{hotel.smart_location}</strong>
                                </Popup>
                            </Marker>
                        )
                    })
                }
                <ChangeCenter position={mapPosition} />
            </MapContainer>
        </div>
    )
}

export default Map


const ChangeCenter = ({ position }) => {
    const map = useMap();
    map.setView(position)
    return null;
}