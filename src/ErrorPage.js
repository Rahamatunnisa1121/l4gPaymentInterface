import React from 'react';
import './ErrorPage.css';
import logo from "./assets/hd-logo.png";

function ErrorPage({ errorMessage, onRetry }) {
    return (
        <div className="error-page">
            <img className="logo" src={logo} alt="L4G logo" width="100px" />
            <h2>ERROR</h2>
            <p>{errorMessage}</p>
            <button onClick={onRetry} className="retry-button">
                Try Again
            </button>
        </div>
    );
}

export default ErrorPage;
