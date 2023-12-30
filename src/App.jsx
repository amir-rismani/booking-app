import "./App.css"
import { Toaster } from "react-hot-toast"
import Header from "./components/Header/Header"
import LocationList from "./components/LocationList/LocationList"
import { Route, Routes } from "react-router-dom"
import HotelLayout from "./Layout/Hotels/HotelLayout"
import Hotels from "./components/Hotels/Search/Search"
import Details from "./components/Hotels/Details/Details"
import HotelsProvider from "./context/HotelsProvider"


function App() {

  return (
    <HotelsProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route index path="/" element={<LocationList />} />
        <Route path="/hotels" element={<HotelLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<Details />} />
        </Route>
      </Routes>
    </HotelsProvider>
  )
}

export default App
