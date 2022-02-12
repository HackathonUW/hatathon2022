import { fakeAuthProvider } from './auth';
import {useState, createContext, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    let [user, setUser] = useState(null);
  
    let signin = (newUser, callback) => {
      return fakeAuthProvider.signin(() => {
        setUser(newUser);
        callback();
      });
    };
  
    let signout = (callback) => {
      return fakeAuthProvider.signout(() => {
        setUser(null);
        callback();
      });
    };
  
    let value = { user, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return children;
}