import { Outlet } from 'react-router-dom'
import "./HotelLayout.css"
function HotelLayout() {
  return (
    <div className='hotel-layout'>
      <div className="slidebar">
        <Outlet />
      </div>
      <div className="map"></div>
    </div>
  )
}

export default HotelLayout