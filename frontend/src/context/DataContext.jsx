import { createContext, useContext, useEffect, useState } from "react";
import { getGlobalData } from "../services/api";
import { useInterval } from "../utils/hooks";

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

    // Auto-reloadทุก 3 วินาที
    useInterval(() => {
        const refreshData = async () => {
            try {
                const response = await getGlobalData();
                // Only update if data actually changed to keep it smooth
                if (JSON.stringify(response.data) !== JSON.stringify(globalData)) {
                    setGlobalData(response.data);
                }
            } catch (err) {
                console.error("Auto-reload failed:", err);
            }
        };
        refreshData();
    }, 3000);

    return (
        <DataContext.Provider value={{ globalData, loading, error }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
