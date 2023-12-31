import { useHotels } from "../../context/HotelsProvider";
import Loader from "../Loader/Loader";
import "./LocationList.css"
function LocationList() {
    const { hotels: locations, isLoading } = useHotels();
    if (isLoading) return <Loader />
    if (!locations.length) return <p>Location not fond...</p>
    return (
        <div className="location-list">
            <h1>Nearby Locations</h1>
            <div className="locations">
                {locations.map(location => <LocationItem location={location} key={location.id} />)}
            </div>
        </div>
    )
}

export default LocationList

function LocationItem({ location }) {
    return (
        <div className="location-item">
            <img src={location.picture_url.url} alt={location.name} />
            <div className="location-item__desc">
                <strong>{location.smart_location}</strong>
                <p className="muted">{location.name}</p>
                <p><strong>€&nbsp;{location.price}</strong>&nbsp;<span className="muted">Night</span></p>
            </div>
        </div>
    )
}
