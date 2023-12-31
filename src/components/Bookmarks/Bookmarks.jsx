import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../context/BookmarksProvider"
import Loader from "../Loader/Loader";
import "./Bookmarks.css"
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
function Bookmarks() {
    const { bookmarks, isLoading } = useBookmarks();
    if (isLoading) return <Loader />
    if (!bookmarks.length) return <p>bookmark not found...</p>
    return (
        <div className="bookmarks-list">
            {bookmarks.map(bookmark => <BookmarkItem bookmark={bookmark} key={bookmark.id} />)}
        </div>
    )
}

export default Bookmarks

const BookmarkItem = ({ bookmark }) => {
    const { currentBookmark, deleteBookmark } = useBookmarks();

    const handleDeleteBookmark = (ev, id) => {
        ev.preventDefault();
        deleteBookmark(id)
    }

    return (
        <Link to={`${bookmark.id}?lat=${bookmark.latitude}&lng=${bookmark.longitude}`}>
            <div className={`bookmark-item ${currentBookmark?.id === bookmark.id ? 'current' : ''}`}>
                <div className="bookmark-item__description">
                    <ReactCountryFlag className="country-flag" countryCode={bookmark.countryCode} />
                    <strong>{bookmark.cityName}</strong>
                    <span className="muted">{bookmark.country}</span>
                </div>
                <BsTrash className="trash-icon" onClick={(ev) => handleDeleteBookmark(ev, bookmark.id)} />
            </div>
        </Link>
    )
}