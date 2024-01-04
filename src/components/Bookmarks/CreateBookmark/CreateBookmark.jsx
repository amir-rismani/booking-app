import { useEffect, useState } from "react";
import "./CreateBookmark.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader/Loader";
import useUrlPosition from "../../../hooks/useUrlPosition";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../../context/BookmarksProvider";
import { LoaderIcon } from "react-hot-toast";
function CreateBookmark() {
    const [location, setLocation] = useState({
        cityName: "",
        country: "",
        countryCode: "",
        latitude: "",
        longitude: "",
        host_location: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const [lat, lng] = useUrlPosition();
    const { createBookmark, isLoading: isLoadingCreate } = useBookmarks();
    const handleChange = (ev) => {
        setLocation(prevLocation => ({
            ...prevLocation,
            [ev.target.name]: ev.target.value
        }))
    }
    useEffect(() => {
        const fetchLocation = async () => {
            setIsLoading(true);
            setError("")
            try {
                const { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
                if (!data.countryName || !data.city) throw new Error("This location is not a country.")
                setLocation({
                    cityName: data.city,
                    country: data.countryName,
                    countryCode: data.countryCode,
                    latitude: lat,
                    longitude: lng,
                    host_location: data.city + " " + data.countryName,
                })
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchLocation()
    }, [lat, lng])

    const handleSubmit = async (e) => {
        e.preventDefault();
        createBookmark(location)
    };

    if (isLoading) return <Loader />
    if (error) return <p>{error}</p>
    return (
        <div className="create-bookmark">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" name="cityName" id="city" className="form-input" value={location.cityName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Country</label>
                    <input type="text" name="country" id="country" className="form-input" value={location.country} onChange={handleChange} />
                    <ReactCountryFlag countryCode={location.countryCode} className="input-flag" />
                </div>
                <div className="form-buttons">
                    <button type="button" className="button button--back" onClick={() => navigate(-1)}>&larr; Back</button>
                    <button type="submit" className="button button--primary" disabled={isLoadingCreate}>Add {isLoadingCreate && < LoaderIcon />}</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBookmark