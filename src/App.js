import { Home, Projects, Login } from './routes';
import { ChakraProvider } from '@chakra-ui/react';
import { Navigation } from './components/Navigation';
import { LoggedInContext } from './LoggedInContext';
import { useState, useContext } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
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
                    <Switch>
                        <Route path="/">
                            <Redirect to="/login" />
                        </Route>
                        <Route path = "/login">
                            <Login />
                        </Route>
                        <Route path="/projects">
                            <Projects />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </LoggedInContext.Provider>
        </ChakraProvider>
    );
}

export default App;
