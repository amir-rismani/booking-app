import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch(url, query = "") {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`${url}?${query}`);
                setData(data);
            } catch (error) {
                setData([])
                toast.error(error?.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData()
    }, [url, query]);

    return { isLoading, data }
}