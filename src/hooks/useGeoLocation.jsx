import { useState } from "react";

const useGeoLocation = () => {
    const [geoLoading, setGeoLoading] = useState(false)
    const [geoPosition, setGeoPosition] = useState({})
    const [geoError, setGeoError] = useState(null)

    const getGeoLocation = () => {
        if (!navigator.geolocation) return setGeoError("Your browser does not support geo location.")
        setGeoLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setGeoPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
                setGeoLoading(false);
            },
            (err) => {
                setGeoError(err.message)
                setGeoLoading(false);
            }
        )
    }

    return { geoLoading, geoPosition, geoError, getGeoLocation };
}

export default useGeoLocation;