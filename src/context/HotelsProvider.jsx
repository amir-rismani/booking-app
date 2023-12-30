import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

const HotelsContext = createContext();

const HotelsProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get('destination');
    const room = JSON.parse(searchParams.get('options'))?.room;

    const { data:hotels, isLoading } = useFetch("http://localhost:5000/hotels", `q=${destination || ""}&accommodates_gte=${room || 1}`)

    return (
        <HotelsContext.Provider value={{ hotels, isLoading }}>
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