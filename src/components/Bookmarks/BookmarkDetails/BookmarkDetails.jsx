import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useBookmarks } from "../../../context/BookmarksProvider";
import ReactCountryFlag from "react-country-flag";
import Loader from "../../Loader/Loader";
import "./BookmarkDetails.css"
function BookmarkDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBookmark, currentBookmark, isLoading } = useBookmarks();
    useEffect(() => {
        getBookmark(id)
    }, [id]);

    if (isLoading) return <Loader />
    if (!currentBookmark) return <p>Data not found...</p>
    return (
        <div className="details">
            <button type="button" className="button button--back" onClick={() => navigate(-1)}>&larr; Back</button>

            <div className="bookmark-details">
                <ReactCountryFlag className="country-flag" countryCode={currentBookmark.countryCode} />
                <strong>{currentBookmark.host_location}</strong>
                <span className="muted">{currentBookmark.country}</span>
            </div>
        </div>
    )
}

export default BookmarkDetails