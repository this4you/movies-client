import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './redux/store'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ProvideAuth, AxiosInterceptorProvider } from './providers';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <SnackbarProvider maxSnack={2}>
    <Router>
      <AxiosInterceptorProvider>
        <Provider store={store}>
          <ProvideAuth>
            <App />
          </ProvideAuth>
        </Provider>
      </AxiosInterceptorProvider>
    </Router>
  </SnackbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
