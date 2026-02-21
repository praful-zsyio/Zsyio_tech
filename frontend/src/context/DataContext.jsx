import { createContext, useContext, useEffect, useState } from "react";
import { getGlobalData } from "../services/api";

const DataContext = createContext({
    globalData: null,
    loading: true,
    error: null,
});

export function DataProvider({ children }) {
    const [globalData, setGlobalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGlobalData();
                setGlobalData(response.data);
            } catch (err) {
                console.error("Error fetching global data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ globalData, loading, error }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
