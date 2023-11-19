


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'simplebar/src/simplebar.css';
import { Provider as ReduxProvider } from 'react-redux';
import 'assets/third-party/apex-chart.css';
import {store } from 'store';
import reportWebVitals from './reportWebVitals';
import App from './App';


// Main page render
const container = document.getElementById('root');
const root = createRoot(container);

function Main() {


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
root.render(<Main />);
reportWebVitals();




