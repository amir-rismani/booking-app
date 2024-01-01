import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const HotelsContext = createContext();

const HotelsProvider = ({ children }) => {
    const [currentHotel, setCurrentHotel] = useState(null);
    const [isLoadingcurrentHotel, setIsLoadingCurrentHotel] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const destination = searchParams.get('destination');
    const room = JSON.parse(searchParams.get('options'))?.room;

    const { data: hotels, isLoading } = useFetch("http://localhost:5000/hotels", `q=${destination || ""}&accommodates_gte=${room || 1}`)

    const getHotel = async (id) => {
        try {
            setIsLoadingCurrentHotel(true)
            const { data } = await axios.get(`http://localhost:5000/hotels/${id}`);
            setCurrentHotel(data);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoadingCurrentHotel(false)
        }
    }

    return (
        <HotelsContext.Provider value={{ hotels, isLoading, getHotel, currentHotel, isLoadingcurrentHotel }}>
            {children}
        </HotelsContext.Provider>
    );
}

export default HotelsProvider;

export const useHotels = () => {
    const context = useContext(HotelsContext);
    if (!context) throw new Error('HotelsContext was used outside of HotelsProvider.');
    return context
}