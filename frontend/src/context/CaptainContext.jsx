import { createContext, useState, useContext } from 'react';

export const CaptainContext = createContext();

export const CaptainProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginCaptain = async (credentials) => {
        setIsLoading(true);
        try {
            // TODO: Implement actual login logic here
            setCaptain(credentials);
            setError(null);
        } catch (err) {
            setError(err.message);
            setCaptain(null);
        } finally {
            setIsLoading(false);
        }
    };

    const logoutCaptain = () => {
        setCaptain(null);
        setError(null);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        error,
        loginCaptain,
        logoutCaptain
    };

    return (
        <CaptainContext.Provider value={value}>
            {children}
        </CaptainContext.Provider>
    );
};

// export const useCaptain = () => {
//     const context = useContext(CaptainContext);
//     if (context === undefined) {
//         throw new Error('useCaptain must be used within a CaptainProvider');
//     }
//     return context;
// };

export default CaptainContext;