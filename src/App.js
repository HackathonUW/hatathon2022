import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Project, Projects, NoMatch, Dashboard } from './routes';
import { Navigation } from './components/Navigation';
import { AuthProvider, RequireAuth } from './AuthProvider';

import './App.css';

function App() {
    return (
        <ChakraProvider>
            <AuthProvider>
                <Router>
                    <Navigation />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/project'>
                            <Route
                                path=':id'
                                element={
                                    <RequireAuth>
                                        <Project />
                                    </RequireAuth>
                                }
                            />
                        </Route>
                        <Route
                            path='/projects'
                            element={
                                <RequireAuth>
                                    <Projects />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='/dashboard'
                            element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            }
                        />
                        <Route path='*' element={<NoMatch />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default App;
