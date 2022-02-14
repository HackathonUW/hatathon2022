import { useState, createContext, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const signin = newUser => {
        setUser(newUser);
    };

    const signout = () => {
        setUser(null);
    };

    const value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }) {
    const auth = useAuth();
    // console.log("REQUIRE AUTH", auth);

    if (!auth.user) {
        return <Navigate to='/' />;
    }

    return children;
}
