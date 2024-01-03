import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarksContext = createContext();
const BASE_URL = 'http://localhost:5000'
const BookmarksProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentBookmark, setCurrentBookmark] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookmarks = async () => {
            setIsLoading(true)
            try {
                const { data } = await axios.get(`http://localhost:5000/bookmarks`);
                setBookmarks(data);
            } catch (error) {
                toast.error(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchBookmarks();
    }, []);

    const getBookmark = async (id) => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
            setCurrentBookmark(data);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const createBookmark = async (location) => {
        setIsLoading(true)
        try {
            await axios.post(`${BASE_URL}/bookmarks`, location);
            setBookmarks(prevBookmarks => ([...prevBookmarks, location]))
            setCurrentBookmark(location)
            navigate('/bookmarks');
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }

    }

    const deleteBookmark = async (id) => {
        setIsLoading(true)
        try {
            await axios.delete(`${BASE_URL}/bookmarks/${id}`);
            setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark.id !== id))
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <BookmarksContext.Provider value={{ isLoading, bookmarks, getBookmark, currentBookmark, createBookmark, deleteBookmark }}>
            {children}
        </BookmarksContext.Provider>
    );
}

export default BookmarksProvider;

export const useBookmarks = () => {
    const context = useContext(BookmarksContext);
    if (!context) throw new Error('BookmarksContext was used outside of BookmarksProvider.');
    return context
}