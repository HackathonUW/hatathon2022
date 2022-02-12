import { Home, Login} from './routes'
import { ChakraProvider } from '@chakra-ui/react'
import { Navigation } from './components/Navigation';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouteLink
} from "react-router-dom";

import './App.css';

function App() {
  return (
      <ChakraProvider>
        <Router>
            <Navigation />
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
      </ChakraProvider>
  );
}

export default App;
