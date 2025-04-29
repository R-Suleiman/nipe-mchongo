import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem("USER")));
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [loading, setLoading] = useState(false);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setUser = (User) => {
        _setUser(User);
        if (User) {
            localStorage.setItem("USER", JSON.stringify(User));
        } else {
            localStorage.removeItem("USER");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                setUser,
                setToken,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
