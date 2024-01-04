import "./App.css"
import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import LocationList from "./components/LocationList/LocationList"
import HotelLayout from "./Layout/Hotels/HotelLayout"
import Hotels from "./components/Hotels/List/List"
import Details from "./components/Hotels/Details/Details"
import HotelsProvider from "./context/HotelsProvider"
import BookmarkLayout from "./Layout/Bookmarks/BookmarkLayout"
import Bookmarks from "./components/Bookmarks/Bookmarks"
import BookmarkDetails from "./components/Bookmarks/BookmarkDetails/BookmarkDetails"
import CreateBookmark from "./components/Bookmarks/CreateBookmark/CreateBookmark"
import BookmarksProvider from "./context/BookmarksProvider"
import Login from "./components/Login/Login"
import Auth from "./Layout/Auth/Auth"
import AuthProvider from "./context/AuthProvider"
import ProtectRoute from "./components/ProtectRoute/ProtectRoute"


function App() {

  return (
    <AuthProvider>
      <BookmarksProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route index path="/" element={<LocationList />} />
            <Route path="/hotels" element={<HotelLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<Details />} />
            </Route>
            <Route path="/bookmarks" element={<ProtectRoute><BookmarkLayout /></ProtectRoute>}>
              <Route index element={<Bookmarks />} />
              <Route path=":id" element={<BookmarkDetails />} />
              <Route path="add" element={<CreateBookmark />} />
            </Route>
            <Route path="/login" element={<Auth />}>
              <Route index element={<Login />} />
            </Route>
          </Routes>
        </HotelsProvider>
      </BookmarksProvider>
    </AuthProvider>
  )
}

export default App
