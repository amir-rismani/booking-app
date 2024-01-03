import { Outlet } from 'react-router-dom'
import "./BookmarkLayout.css"
import Map from '../../components/Map/Map'
import { useBookmarks } from '../../context/BookmarksProvider'
function BookmarkLayout() {
  const { bookmarks } = useBookmarks();
  return (
    <div className='bookmark-layout'>
      <div className="slidebar">
        <Outlet />
      </div>
      <Map locations={bookmarks} />
    </div>
  )
}

export default BookmarkLayout