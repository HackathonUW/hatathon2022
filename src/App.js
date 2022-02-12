import { Home, Project, Projects, Login, NoMatch } from './routes';
import { ChakraProvider } from '@chakra-ui/react';
import { Navigation } from './components/Navigation';
import { useState, useContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { AuthProvider, RequireAuth, useAuth } from './AuthProvider';

import './App.css';

function App() {
    return (
        <ChakraProvider>
        <AuthProvider>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/project">
                        <Route path=":id" element={<RequireAuth><Project /></RequireAuth>} />
                    </Route>
                    <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </Router>
        </AuthProvider>
        </ChakraProvider>
    );
}



export default App;
