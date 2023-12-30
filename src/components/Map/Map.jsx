import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { BsGeo } from "react-icons/bs";
import "./Map.css"
import { useHotels } from "../../context/HotelsProvider";
import Loader from "../Loader/Loader";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import { LoaderIcon } from "react-hot-toast";
function Map() {
    const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
    const { hotels, isLoading } = useHotels();

    const { geoLoading, geoPosition, geoError, getGeoLocation } = useGeoLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('long');

    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng])

    useEffect(() => {
        if (geoPosition?.lat && geoPosition?.lng) setMapPosition([geoPosition.lat, geoPosition.lng]);
    }, [geoPosition])

    if (isLoading) return <Loader />

    return (
        <div className="map">
            <MapContainer className="map__leaflet" center={mapPosition} zoom={13}>
                <button className="geo-location" onClick={() => { getGeoLocation() }}>{geoLoading ? <LoaderIcon /> : <BsGeo className="geo-location__icon" />}</button>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
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
    map.setView(position, map.getZoom())
    return null;
}