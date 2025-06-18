import React from 'react';
import './loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <img src="/public/" style={{ width: '50px', height: '50px', marginRight: '10px' }} alt="Logo" className="loading-logo" />
        <h1 className='keyflix-title' id='keyflix-title' style={{ fontSize: '2rem' }}>AutSuporte</h1>
      </div>

      <div className="spinner"></div>
      <p className="loading-text">Carregando...</p>
    </div>
  );
}

export default Loading;