


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'simplebar/src/simplebar.css';
import { Provider as ReduxProvider } from 'react-redux';
import 'assets/third-party/apex-chart.css';
import {store } from 'store';
import reportWebVitals from './reportWebVitals';
import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js'; // Import Keycloak
import App from './App';

// Keycloak configuration
const keycloakConfig = {
  url: 'http://45.151.122.41:8080',
  realm: 'inventoryGas',
  clientId: 'megaGas',
};
const keycloak = new Keycloak(keycloakConfig);
console.log(keycloak)

// Main page render
const container = document.getElementById('root');
const root = createRoot(container);

function Main() {
  const [authenticated, setAuthenticated] = useState(false);
  console.log(authenticated)

  useEffect(() => {
    keycloak
      .init({ onLoad: 'login-required' })
      .then((authenticated) => {
        setAuthenticated(authenticated);
      })
      .catch((error) => {
        console.error('Keycloak initialization error:', error);
      });
  }, []);

  if (!authenticated) {

    return (
      <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="/myapp">
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
    );
  }
}
root.render(<Main />);
reportWebVitals();




