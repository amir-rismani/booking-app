import { useParams } from "react-router-dom"
import "./Details.css"
import useFetch from "../../../hooks/useFetch";
import Loader from "../../Loader/Loader";
function Details() {
    const params = useParams();
    const { data: hotel, isLoading } = useFetch("http://localhost:5000/hotels", `id=${params.id}`)
    if (isLoading) return <Loader />
    if (!hotel.length) return <div>Data not found...</div>
    console.log(hotel)
    return (
        <div className="details">
            <img src={hotel[0].picture_url.url} alt={hotel[0].name} />
            <div className="description">
                <h1>{hotel[0].smart_location}</h1>
                <p className="muted">{hotel[0].name}</p>
                <p><strong>€&nbsp;{hotel[0].price}</strong>&nbsp;<span className="muted">Night</span></p>
            </div>
        </div>
    )
}

export default Details