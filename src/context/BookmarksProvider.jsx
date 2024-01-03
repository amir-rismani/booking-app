import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarksContext = createContext();

const initialState = {
    isLoading: false,
    bookmarks: [],
    currentBookmark: null,
    error: null
}

const bookmarkReducer = (state, { type, payload }) => {
    switch (type) {
        case "loading":
            return { ...state, isLoading: true }
        case "bookmarks/loaded":
            return { ...state, isLoading: false, bookmarks: payload }
        case "bookmark/loaded":
            return { ...state, isLoading: false, currentBookmark: payload }
        case "bookmark/created":
            return { ...state, isLoading: false, bookmarks: [...state.bookmarks, payload], currentBookmark: payload }
        case "bookmark/deleted":
            return { ...state, isLoading: false, bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== payload), currentBookmark: null }
        case "rejected":
            return { ...state, isLoading: false, error: payload }
        default:
            throw new Error("Unlnown action: " + type)
    }
}

const BASE_URL = 'http://localhost:5000'
const BookmarksProvider = ({ children }) => {

    const [{ isLoading, bookmarks, currentBookmark }, dispatch] = useReducer(bookmarkReducer, initialState)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookmarks = async () => {
            dispatch({ type: 'loading' });
            try {
                const { data } = await axios.get(`http://localhost:5000/bookmarks`);
                dispatch({ type: 'bookmarks/loaded', payload: data })
            } catch (error) {
                toast.error(error.message)
                dispatch({ type: 'rejected', payload: error.message })
            }
        }

        fetchBookmarks();
    }, []);

    const getBookmark = async (id) => {
        dispatch({ type: 'loading' });
        try {
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
            dispatch({ type: 'bookmark/loaded', payload: data })
        } catch (error) {
            toast.error(error.message)
            dispatch({ type: 'rejected', payload: error.message })
        }
    }

    const createBookmark = async (location) => {
        dispatch({ type: 'loading' });
        try {
            await axios.post(`${BASE_URL}/bookmarks`, location);
            dispatch({ type: 'bookmark/created', payload: location })
            navigate('/bookmarks');
        } catch (error) {
            toast.error(error.message)
            dispatch({ type: 'rejected', payload: error.message })
        }
    }

    const deleteBookmark = async (id) => {
        dispatch({ type: 'loading' });
        try {
            await axios.delete(`${BASE_URL}/bookmarks/${id}`);
            dispatch({ type: 'bookmark/deleted', payload: id })

        } catch (error) {
            toast.error(error.message)
            dispatch({ type: 'rejected', payload: error.message })
        }
    }

    return (
        <BookmarksContext.Provider value={{ isLoading, bookmarks, currentBookmark, getBookmark, createBookmark, deleteBookmark }}>
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

// two way in async actions
// 1. pass actions ✅
// 2. pass dispatch ⚠ 