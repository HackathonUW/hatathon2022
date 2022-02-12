import { Home, Projects, Login } from './routes';
import { ChakraProvider } from '@chakra-ui/react';
import { Navigation } from './components/Navigation';
import { LoggedInContext } from './LoggedInContext';
import { useState, useContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link as RouteLink
} from "react-router-dom";

import './App.css';

function App() {
    return (
        <ChakraProvider>
            <LoggedInContext.Provider value={false}>
                <Router>
                    <Navigation />
                    <Routes>
                        <Route path = "/login" element={<Login />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </Router>
            </LoggedInContext.Provider>
        </ChakraProvider>
    );
}

export default App;
