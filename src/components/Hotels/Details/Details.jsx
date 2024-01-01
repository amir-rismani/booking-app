import "./Details.css"

import Loader from "../../Loader/Loader";
import { useHotels } from "../../../context/HotelsProvider";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
function Details() {
    const { id } = useParams();
    const { getHotel, currentHotel, isLoadingcurrentHotel } = useHotels();

    useEffect(() => {
        getHotel(id);
    }, [id])

    if (isLoadingcurrentHotel) return <Loader />
    if (!currentHotel) return <div>Data not found...</div>
    return (
        <div className="details">
            <img src={currentHotel.picture_url.url} alt={currentHotel.name} />
            <div className="description">
                <h1>{currentHotel.smart_location}</h1>
                <p className="muted">{currentHotel.name}</p>
                <p><strong>€&nbsp;{currentHotel.price}</strong>&nbsp;<span className="muted">Night</span></p>
            </div>
        </div>
    )
}

export default Details