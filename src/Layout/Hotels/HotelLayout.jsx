import { Outlet } from 'react-router-dom'
import "./HotelLayout.css"
import { useHotels } from '../../context/HotelsProvider';
import Map from '../../components/Map/Map';
import Loader from '../../components/Loader/Loader';
function HotelLayout() {
  const { hotels, isLoading } = useHotels();
  if (isLoading) return <Loader />
  return (
    <div className='hotel-layout'>
      <div className="slidebar">
        <Outlet />
      </div>
      <Map locations={hotels} />
    </div>
  )
}

export default HotelLayout