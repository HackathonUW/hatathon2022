import { Home, Project, Projects, Login, NoMatch, Submit } from './routes';
import { ChakraProvider } from '@chakra-ui/react';
import { Navigation } from './components/Navigation';
import { LoggedInContext } from './LoggedInContext';
import { useState, useContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { AuthProvider, RequireAuth } from './AuthProvider';

import './App.css';

function App() {
    return (
        <ChakraProvider>
            <LoggedInContext.Provider value={false}>
                <AuthProvider>
                    <Router>
                        <RequireAuth><Navigation /></RequireAuth>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/project">
                                <Route path=":id" element={<Project />} />
                            </Route>
                            <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
                            <Route path="/submit" element={<RequireAuth><Submit /></RequireAuth>} />
                            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
                            <Route path="*" element={<NoMatch />} />
                        </Routes>
                    </Router>
                </AuthProvider>
            </LoggedInContext.Provider>
        </ChakraProvider>
    );
}



export default App;
