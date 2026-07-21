import React from 'react';

export default function Landing({ onEnter }) {
  return (
    <div className="landing" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Welcome to Product Cart Manager</h1>
      <p style={{ fontSize: '1.1rem', color: '#444', marginBottom: '1.5rem', maxWidth: '700px', textAlign: 'center' }}>
        Create and manage beautiful product cards. Click below to start adding products and organizing your catalog.
      </p>
      <div>
        <button className="btn" onClick={onEnter} style={{ padding: '0.75rem 1.25rem', fontSize: '1rem' }}>
          Get Started
        </button>
      </div>
    </div>
  );
}
