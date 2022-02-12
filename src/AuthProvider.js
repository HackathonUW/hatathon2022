import {useState, createContext, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    let [user, setUser] = useState(null);
  
    let signin = (newUser) => {
        setUser(newUser);
    };
  
    let signout = () => {
        setUser(null);
    };
  
    let value = { user, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }) {

    let auth = useAuth();
    // console.log("REQUIRE AUTH", auth);
  
    if (!auth.user) {
      return <Navigate to="/" />;
    }
    
    return children;
}