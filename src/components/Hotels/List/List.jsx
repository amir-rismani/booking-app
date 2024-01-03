import { Link } from "react-router-dom"
import "./List.css"
import Loader from "../../Loader/Loader";
import { useHotels } from "../../../context/HotelsProvider";
function Hotels() {
    const { hotels, isLoading } = useHotels();

    if (isLoading) return <Loader />
    if (!hotels.length) return <div>Data not found...</div>
    return (
        <div>
            <h1>Sreach result ({hotels.length})</h1>
            <div className="hotel-results">
                {hotels.map(hotel => <Link key={hotel.id} to={`/hotels/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}><HotelItem location={hotel} /></Link>)}
            </div>

        </div>
    )
}

export default Hotels

function HotelItem({ location }) {
    const { currentHotel } = useHotels()
    return (
        <div className={`List-item ${currentHotel?.id === location.id ? 'current' : ''}`}>
            <img src={location.picture_url.url} alt={location.name} />
            <div className="List-item__desc">
                <strong>{location.smart_location}</strong>
                <p className="muted">{location.name}</p>
                <p><strong>€&nbsp;{location.price}</strong>&nbsp;<span className="muted">Night</span></p>
            </div>
        </div>
    )
}
