import { Outlet } from 'react-router-dom'
import "./HotelLayout.css"
import Map from '../../components/Map/Map'
function HotelLayout() {
  return (
    <div className='hotel-layout'>
      <div className="slidebar">
        <Outlet />
      </div>
      <Map />
    </div>
  )
}

export default HotelLayout