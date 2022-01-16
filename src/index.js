import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import Map from './components/Map';
import Footer from './components/Footer';

const App = () => (
  <>
    <div className="container mt-2">
      <Map/>
    </div>
    <Footer/>
  </>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
